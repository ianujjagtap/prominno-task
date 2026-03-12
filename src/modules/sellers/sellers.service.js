import bcrypt from "bcryptjs";
import Seller from "./sellers.model.js";
import { ConflictError } from "@/utils/errors.js";
import { messages } from "@/constants/index.js";
import catchAsync from "@/utils/catchAsync.js";

export const createSeller = catchAsync(async (data) => {
  if (!data || !data.email || !data.password || !data.name) {
    throw new Error(messages.INVALID_SELLER_DATA);
  }

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
});

export const listSellers = catchAsync(async (page, limit) => {
  if (page < 1 || limit < 1) {
    throw new Error(messages.INVALID_PAGINATION);
  }

  const skip = (page - 1) * limit;

  const [sellers, total] = await Promise.all([
    Seller.find({}, { passwordHash: 0 }).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    Seller.countDocuments(),
  ]);

  return { sellers, total };
});
