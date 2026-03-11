import asyncHandler from "@/utils/asyncHandler.js";
import { successResponse } from "@/utils/response.js";
import { adminLogin, sellerLogin } from "./auth.service.js";
import { messages } from "@/constants/index.js";

export const adminLoginController = asyncHandler(async (req, res) => {
  const { email, password } = req.valid.body;
  const result = await adminLogin(email, password);
  successResponse(res, messages.LOGIN_OK, result);
});

export const sellerLoginController = asyncHandler(async (req, res) => {
  const { email, password } = req.valid.body;
  const result = await sellerLogin(email, password);
  successResponse(res, messages.LOGIN_OK, result);
});
