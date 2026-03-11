import express from "express";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import env from "@/config/env.js";
import swaggerSpec from "@/config/swagger.js";
import globalErrorHandler from "@/middleware/error.middleware.js";
import authRoutes from "@/modules/auth/auth.routes.js";
import sellersRoutes from "@/modules/sellers/sellers.routes.js";
import productsRoutes from "@/modules/products/products.routes.js";
import { messages } from "@/constants/index.js";

const app = express();

app.use(helmet());
app.use(cors({ origin: env.CORS_ORIGIN }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use("/uploads", express.static("uploads"));

// rate limit on auth
app.use("/api/v1/auth", rateLimit({ windowMs: 15 * 60 * 1000, max: 10 }));

// swagger docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/sellers", sellersRoutes);
app.use("/api/v1/products", productsRoutes);

app.get("/health", (_req, res) => res.json({ status: "ok" }));

app.use((_req, res) => {
  res.status(404).json({ success: false, error: messages.NOT_FOUND });
});

app.use(globalErrorHandler);

export default app;
