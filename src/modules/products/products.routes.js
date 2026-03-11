import { Router } from "express";
import {
  createProductController,
  listProductsController,
  deleteProductController,
  getProductPdfController,
} from "./products.controller.js";
import authenticate from "@/middleware/auth.middleware.js";
import requireRole from "@/middleware/role.middleware.js";
import validate from "@/middleware/validate.middleware.js";
import uploadBrandImages from "@/middleware/upload.middleware.js";
import { CreateProductSchema, PaginationSchema } from "./products.schema.js";

const router = Router();

/**
 * @swagger
 * /products/{id}/pdf:
 *   get:
 *     tags: [Products]
 *     summary: view product pdf (publicly accessible)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: pdf file stream
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 */
router.get("/:id/pdf", getProductPdfController);

router.use(authenticate, requireRole("seller"));

/**
 * @swagger
 * /products:
 *   post:
 *     tags: [Products]
 *     summary: add a new product (seller only)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [productName, productDescription, brands]
 *             properties:
 *               productName:
 *                 type: string
 *                 example: Mouse
 *               productDescription:
 *                 type: string
 *                 example: Wireless mouse
 *               brands:
 *                 type: string
 *                 description: JSON string of brands array
 *                 example: '[{"brandName":"Dell","detail":"Wireless","price":1000},{"brandName":"HP","detail":"Bluetooth","price":2000}]'
 *               brandImages:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       201:
 *         description: product created
 */
router.post("/", uploadBrandImages, validate(CreateProductSchema), createProductController);

/**
 * @swagger
 * /products:
 *   get:
 *     tags: [Products]
 *     summary: list own products with pagination (seller only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: products list with pdf links
 */
router.get("/", validate(PaginationSchema, "query"), listProductsController);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     tags: [Products]
 *     summary: delete own product (seller only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: product deleted
 */
router.delete("/:id", deleteProductController);

export default router;
