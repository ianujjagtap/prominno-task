import jwt from "jsonwebtoken";
import env from "@/config/env.js";
import { AuthenticationError } from "@/utils/errors.js";
import asyncHandler from "@/utils/asyncHandler.js";
import { messages } from "@/constants/index.js";

// checks for bearer token and verifies it
const authenticate = asyncHandler((req, _res, next) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    throw new AuthenticationError(messages.NO_AUTH_HEADER);
  }

  const token = header.slice(7); // remove "Bearer " part

  try {
    const payload = jwt.verify(token, env.JWT_SECRET);
    req.user = { id: payload.id, role: payload.role };
    next();
  } catch {
    throw new AuthenticationError(messages.BAD_TOKEN);
  }
});

export default authenticate;
