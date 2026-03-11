// sends a json success response
export const successResponse = (res, message, data, status = 200) => {
  res.status(status).json({ success: true, message, data });
};

// same but with pagination info
export const paginatedResponse = (res, message, data, total, page, limit) => {
  res.status(200).json({
    success: true,
    message,
    data,
    pagination: {
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    },
  });
};
