import { AuthenticationError, AuthorizationError } from "@/utils/errors.js";
import asyncHandler from "@/utils/asyncHandler.js";
import { messages } from "@/constants/index.js";

// blocks access if user role doesn't match
const requireRole = (...roles) =>
  asyncHandler((req, _res, next) => {
    if (!req.user) throw new AuthenticationError();
    if (!roles.includes(req.user.role)) {
      throw new AuthorizationError(messages.ACCESS_DENIED);
    }
    next();
  });

export default requireRole;
