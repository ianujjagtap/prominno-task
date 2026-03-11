import { messages, codes } from "@/constants/index.js";

export class AppError extends Error {
  constructor(message, statusCode, code) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
  }
}

export class ValidationError extends AppError {
  constructor(msg = messages.VALIDATION_FAILED) {
    super(msg, 400, codes.VALIDATION_ERROR);
  }
}

export class AuthenticationError extends AppError {
  constructor(msg = messages.LOGIN_REQUIRED) {
    super(msg, 401, codes.UNAUTHORIZED);
  }
}

export class AuthorizationError extends AppError {
  constructor(msg = messages.FORBIDDEN) {
    super(msg, 403, codes.FORBIDDEN);
  }
}

export class NotFoundError extends AppError {
  constructor(resource) {
    super(resource, 404, codes.NOT_FOUND);
  }
}

export class ConflictError extends AppError {
  constructor(msg) {
    super(msg, 409, codes.CONFLICT);
  }
}
