import { Router } from "express";
import { createSellerController, listSellersController } from "./sellers.controller.js";
import authenticate from "@/middleware/auth.middleware.js";
import requireRole from "@/middleware/role.middleware.js";
import validate from "@/middleware/validate.middleware.js";
import { CreateSellerSchema, PaginationSchema } from "./sellers.schema.js";

const router = Router();

router.use(authenticate, requireRole("admin"));

/**
 * @swagger
 * /sellers:
 *   post:
 *     tags: [Sellers]
 *     summary: create a new seller (admin only)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, mobile, country, state, skills, password]
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: john@test.com
 *               mobile:
 *                 type: string
 *                 example: "9876543210"
 *               country:
 *                 type: string
 *                 example: India
 *               state:
 *                 type: string
 *                 example: Maharashtra
 *               skills:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["React", "Node.js"]
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       201:
 *         description: seller created
 */
router.post("/", validate(CreateSellerSchema), createSellerController);

/**
 * @swagger
 * /sellers:
 *   get:
 *     tags: [Sellers]
 *     summary: list all sellers with pagination (admin only)
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
 *         description: sellers list
 */
router.get("/", validate(PaginationSchema, "query"), listSellersController);

export default router;
