import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "./admin.model.js";
import Seller from "@/modules/sellers/sellers.model.js";
import env from "@/config/env.js";
import { AuthenticationError } from "@/utils/errors.js";
import { messages } from "@/constants/index.js";
import catchAsync from "@/utils/catchAsync.js";

// generates a jwt with id and role
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, env.JWT_SECRET, { expiresIn: "24h" });
};

export const adminLogin = catchAsync(async (email, password) => {
  if (!email || !password) {
    throw new Error(messages.LOGIN_REQUIRED_FIELDS);
  }

  const admin = await Admin.findOne({ email: email.toLowerCase() });
  if (!admin) throw new AuthenticationError(messages.BAD_CREDENTIALS);

  const isMatch = await bcrypt.compare(password, admin.passwordHash);
  if (!isMatch) throw new AuthenticationError(messages.BAD_CREDENTIALS);

  const token = generateToken(admin._id.toString(), "admin");
  return {
    token,
    user: { id: admin._id, email: admin.email, role: admin.role },
  };
});

export const sellerLogin = catchAsync(async (email, password) => {
  if (!email || !password) {
    throw new Error(messages.LOGIN_REQUIRED_FIELDS);
  }

  const seller = await Seller.findOne({ email: email.toLowerCase() });
  if (!seller) throw new AuthenticationError(messages.BAD_CREDENTIALS);

  const isMatch = await bcrypt.compare(password, seller.passwordHash);
  if (!isMatch) throw new AuthenticationError(messages.BAD_CREDENTIALS);

  const token = generateToken(seller._id.toString(), "seller");
  return {
    token,
    user: { id: seller._id, name: seller.name, email: seller.email, role: seller.role },
  };
});
