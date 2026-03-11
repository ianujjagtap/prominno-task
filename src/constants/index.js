export const messages = {
  // auth
  BAD_CREDENTIALS: "Invalid email or password",
  NO_AUTH_HEADER: "Missing or invalid authorization header",
  BAD_TOKEN: "Invalid or expired token",
  LOGIN_REQUIRED: "Authentication required",
  FORBIDDEN: "Forbidden",
  ACCESS_DENIED: "You do not have permission to access this resource",

  // validation
  VALIDATION_FAILED: "Validation failed",

  // seller
  EMAIL_TAKEN: "Email already registered",

  // product
  PRODUCT_NOT_FOUND: "Product not found",
  PRODUCT_DELETED: "Product deleted successfully",
  PRODUCT_ACCESS_DENIED: "You do not have permission to access this product",
  PRODUCT_DELETE_DENIED: "You do not have permission to delete this product",

  // upload
  BAD_FILE_TYPE: "Only JPEG, PNG, and WebP images are allowed",

  // database
  DUPLICATE_ENTRY: "A record with this value already exists",
  DB_FAIL: "MongoDB connection failed",
  DB_OK: "MongoDB connected",

  // server
  INTERNAL_ERROR: "Something went wrong. Please try again.",
  NOT_FOUND: "Route not found",
  RATE_LIMITED: "Too many attempts. Try again in 15 minutes.",

  // success
  LOGIN_OK: "Logged in successfully",
  SELLER_CREATED: "Seller created successfully",
  SELLERS_FETCHED: "Sellers retrieved successfully",
  PRODUCT_CREATED: "Product created successfully",
  PRODUCTS_FETCHED: "Products retrieved successfully",
  PRODUCT_DELETED: "Product deleted successfully",
};

export const codes = {
  VALIDATION_ERROR: "VALIDATION_ERROR",
  UNAUTHORIZED: "UNAUTHORIZED",
  FORBIDDEN: "FORBIDDEN",
  NOT_FOUND: "NOT_FOUND",
  CONFLICT: "CONFLICT",
  FILE_UPLOAD_ERROR: "FILE_UPLOAD_ERROR",
};
