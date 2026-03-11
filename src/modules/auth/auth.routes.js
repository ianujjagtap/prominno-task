import { Router } from "express";
import { adminLoginController, sellerLoginController } from "./auth.controller.js";
import validate from "@/middleware/validate.middleware.js";
import { LoginSchema } from "./auth.schema.js";

const router = Router();

/**
 * @swagger
 * /auth/admin/login:
 *   post:
 *     tags: [Auth]
 *     summary: admin login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@admin.com
 *               password:
 *                 type: string
 *                 example: admin12345678
 *     responses:
 *       200:
 *         description: login successful
 */
router.post("/admin/login", validate(LoginSchema), adminLoginController);

/**
 * @swagger
 * /auth/seller/login:
 *   post:
 *     tags: [Auth]
 *     summary: seller login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 example: seller@test.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: login successful
 */
router.post("/seller/login", validate(LoginSchema), sellerLoginController);

export default router;
