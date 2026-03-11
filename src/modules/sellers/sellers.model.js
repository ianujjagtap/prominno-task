import mongoose from "mongoose";

const sellerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    mobile: { type: String, required: true },
    country: { type: String, required: true },
    state: { type: String, required: true },
    skills: [{ type: String }],
    passwordHash: { type: String, required: true },
    role: { type: String, default: "seller" },
  },
  { timestamps: true }
);

const Seller = mongoose.model("Seller", sellerSchema);
export default Seller;
