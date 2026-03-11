import asyncHandler from "@/utils/asyncHandler.js";
import { successResponse, paginatedResponse } from "@/utils/response.js";
import * as productsService from "./products.service.js";
import { streamProductPdf } from "@/pdf/productPdf.js";
import { messages } from "@/constants/index.js";

export const createProductController = asyncHandler(async (req, res) => {
  const files = req.files || [];
  const product = await productsService.createProduct(req.valid.body, req.user.id, files);
  successResponse(res, messages.PRODUCT_CREATED, product, 201);
});

export const listProductsController = asyncHandler(async (req, res) => {
  const { page, limit } = req.valid.query;
  const baseUrl = `${req.protocol}://${req.get("host")}`;
  const { products, total } = await productsService.listProducts(req.user.id, page, limit, baseUrl);
  paginatedResponse(res, messages.PRODUCTS_FETCHED, products, total, page, limit);
});

export const deleteProductController = asyncHandler(async (req, res) => {
  const result = await productsService.deleteProduct(req.params.id, req.user.id);
  successResponse(res, messages.PRODUCT_DELETED, result);
});

export const getProductPdfController = asyncHandler(async (req, res) => {
  const product = await productsService.getProductById(req.params.id);
  streamProductPdf(product, res);
});
