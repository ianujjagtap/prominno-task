import asyncHandler from "@/utils/asyncHandler.js";
import { successResponse, paginatedResponse } from "@/utils/response.js";
import * as sellersService from "./sellers.service.js";
import { messages } from "@/constants/index.js";

export const createSellerController = asyncHandler(async (req, res) => {
  const body = req.valid?.body || req.body;
  if (!body || !body.email || !body.password || !body.name) {
    return res.status(400).json({ success: false, error: "Name, email and password are required" });
  }

  const seller = await sellersService.createSeller(body);
  successResponse(res, messages.SELLER_CREATED, seller, 201);
});

export const listSellersController = asyncHandler(async (req, res) => {
  const query = req.valid?.query || req.query;
  const page = parseInt(query?.page) || 1;
  const limit = parseInt(query?.limit) || 10;

  const { sellers, total } = await sellersService.listSellers(page, limit);
  paginatedResponse(res, messages.SELLERS_FETCHED, sellers, total, page, limit);
});
