import Product from "./products.model.js";
import { NotFoundError, AuthorizationError } from "@/utils/errors.js";
import { messages } from "@/constants/index.js";
import fs from "fs";
import path from "path";

export const createProduct = async (data, sellerId, files) => {
  if (!data || !data.productName || !data.brands) {
    throw new Error("Product name and brands are required");
  }

  try {
    const brands = data.brands.map((brand, i) => ({
      brandName: brand.brandName,
      detail: brand.detail,
      price: brand.price,
      imageUrl: files[i] ? `/uploads/brands/${files[i].filename}` : "",
    }));

    const product = await Product.create({
      productName: data.productName,
      productDescription: data.productDescription,
      sellerId,
      brands,
    });

    return product;
  } catch (error) {
    throw error;
  }
};

export const listProducts = async (sellerId, page, limit, baseUrl) => {
  if (!sellerId) throw new Error("Seller ID is required");

  try {
    const skip = (page - 1) * limit;

    const [products, total] = await Promise.all([
      Product.find({ sellerId }).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Product.countDocuments({ sellerId }),
    ]);

    const productsWithPdf = products.map((p) => ({
      ...p,
      pdfUrl: `${baseUrl}/api/v1/products/${p._id}/pdf`,
    }));

    return { products: productsWithPdf, total };
  } catch (error) {
    throw error;
  }
};

export const getProductById = async (productId, sellerId = null) => {
  if (!productId) throw new Error("Product ID is required");

  try {
    const product = await Product.findById(productId).lean();
    if (!product) throw new NotFoundError(messages.PRODUCT_NOT_FOUND);

    if (sellerId && product.sellerId.toString() !== sellerId) {
      throw new AuthorizationError(messages.PRODUCT_ACCESS_DENIED);
    }

    return product;
  } catch (error) {
    throw error;
  }
};

export const deleteProduct = async (productId, sellerId) => {
  if (!productId || !sellerId) throw new Error("Product ID and Seller ID are required");

  try {
    const product = await Product.findById(productId);
    if (!product) throw new NotFoundError(messages.PRODUCT_NOT_FOUND);

    if (product.sellerId.toString() !== sellerId) {
      throw new AuthorizationError(messages.PRODUCT_DELETE_DENIED);
    }

    for (const brand of product.brands) {
      if (brand.imageUrl) {
        const imagePath = path.join(process.cwd(), brand.imageUrl);
        if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
      }
    }

    await Product.findByIdAndDelete(productId);
    return { message: messages.PRODUCT_DELETED };
  } catch (error) {
    throw error;
  }
};
