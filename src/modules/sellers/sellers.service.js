import bcrypt from "bcryptjs";
import Seller from "./sellers.model.js";
import { ConflictError } from "@/utils/errors.js";
import { messages } from "@/constants/index.js";

export const createSeller = async (data) => {
  const existing = await Seller.findOne({ email: data.email.toLowerCase() });
  if (existing) throw new ConflictError(messages.EMAIL_TAKEN);

  const passwordHash = await bcrypt.hash(data.password, 12);

  const seller = await Seller.create({
    name: data.name,
    email: data.email.toLowerCase(),
    mobile: data.mobile,
    country: data.country,
    state: data.state,
    skills: data.skills,
    passwordHash,
  });

  return {
    id: seller._id,
    name: seller.name,
    email: seller.email,
    mobile: seller.mobile,
    country: seller.country,
    state: seller.state,
    skills: seller.skills,
    role: seller.role,
    createdAt: seller.createdAt,
  };
};

export const listSellers = async (page, limit) => {
  const skip = (page - 1) * limit;

  const [sellers, total] = await Promise.all([
    Seller.find({}, { passwordHash: 0 }).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    Seller.countDocuments(),
  ]);

  return { sellers, total };
};
