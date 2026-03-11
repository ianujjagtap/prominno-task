import { z } from "zod";

export const CreateSellerSchema = z.object({
  name: z.string().min(2).max(100).trim(),
  email: z.string().email(),
  mobile: z.string().min(10).max(15),
  country: z.string().min(2),
  state: z.string().min(2),
  skills: z.array(z.string().min(1)).min(1),
  password: z.string().min(8),
});

export const PaginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
});
