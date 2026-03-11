import { ZodError } from "zod";
import { AppError } from "@/utils/errors.js";
import { messages, codes } from "@/constants/index.js";

const globalErrorHandler = (err, _req, res, _next) => {
  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      error: messages.VALIDATION_FAILED,
      fields: err.flatten().fieldErrors,
    });
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      error: err.message,
      code: err.code,
    });
  }

  if (err.code === 11000) {
    return res.status(409).json({
      success: false,
      error: messages.DUPLICATE_ENTRY,
      code: codes.CONFLICT,
    });
  }

  if (err.name === "MulterError") {
    return res.status(400).json({
      success: false,
      error: err.message,
      code: codes.FILE_UPLOAD_ERROR,
    });
  }

  console.error(err);
  res.status(500).json({
    success: false,
    error: messages.INTERNAL_ERROR,
  });
};

export default globalErrorHandler;
