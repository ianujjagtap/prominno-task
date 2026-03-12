import asyncHandler from "@/utils/asyncHandler.js";
import { successResponse, paginatedResponse } from "@/utils/response.js";
import * as productsService from "./products.service.js";
import { streamProductPdf } from "@/pdf/productPdf.js";
import { messages } from "@/constants/index.js";

export const createProductController = asyncHandler(async (req, res) => {
  const body = req.valid?.body || req.body;
  if (!body || !body.productName || !body.brands) {
    return res.status(400).json({ success: false, error: messages.MISSING_PRODUCT_FIELDS });
  }

  const files = req.files || [];
  const product = await productsService.createProduct(body, req.user.id, files);
  successResponse(res, messages.PRODUCT_CREATED, product, 201);
});

export const listProductsController = asyncHandler(async (req, res) => {
  const query = req.valid?.query || req.query;
  const page = parseInt(query?.page) || 1;
  const limit = parseInt(query?.limit) || 10;

  const baseUrl = `${req.protocol}://${req.get("host")}`;
  const { products, total } = await productsService.listProducts(req.user.id, page, limit, baseUrl);
  paginatedResponse(res, messages.PRODUCTS_FETCHED, products, total, page, limit);
});

export const deleteProductController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ success: false, error: messages.MISSING_PRODUCT_ID });

  const result = await productsService.deleteProduct(id, req.user.id);
  successResponse(res, messages.PRODUCT_DELETED, result);
});

export const getProductPdfController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ success: false, error: messages.MISSING_PRODUCT_ID });

  const product = await productsService.getProductById(id);
  streamProductPdf(product, res);
});
