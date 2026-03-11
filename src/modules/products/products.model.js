import mongoose from "mongoose";

const brandSchema = new mongoose.Schema(
  {
    brandName: { type: String, required: true },
    detail: { type: String, required: true },
    imageUrl: { type: String, required: true },
    price: { type: Number, required: true },
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true, trim: true },
    productDescription: { type: String, required: true },
    sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "Seller", required: true, index: true },
    brands: [brandSchema],
  },
  { timestamps: true }
);

productSchema.index({ sellerId: 1, createdAt: -1 });

const Product = mongoose.model("Product", productSchema);
export default Product;
