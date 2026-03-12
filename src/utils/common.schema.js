import { z } from "zod";

// validates a mongodb objectid in request params
export const IdParamSchema = z.object({
  id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ID format"),
});
