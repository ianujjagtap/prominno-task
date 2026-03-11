import asyncHandler from "@/utils/asyncHandler.js";
import { successResponse, paginatedResponse } from "@/utils/response.js";
import * as sellersService from "./sellers.service.js";
import { messages } from "@/constants/index.js";

export const createSellerController = asyncHandler(async (req, res) => {
  const seller = await sellersService.createSeller(req.valid.body);
  successResponse(res, messages.SELLER_CREATED, seller, 201);
});

export const listSellersController = asyncHandler(async (req, res) => {
  const { page, limit } = req.valid.query;
  const { sellers, total } = await sellersService.listSellers(page, limit);
  paginatedResponse(res, messages.SELLERS_FETCHED, sellers, total, page, limit);
});
