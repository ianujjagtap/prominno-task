import { z } from "zod";

const BrandSchema = z.object({
  brandName: z.string().min(1),
  detail: z.string().min(1),
  price: z.coerce.number().positive(),
});

export const CreateProductSchema = z.object({
  productName: z.string().min(1).max(200).trim(),
  productDescription: z.string().min(1),
  brands: z.preprocess((val) => {
    if (typeof val === "string") {
      try { return JSON.parse(val); } catch { return val; }
    }
    return val;
  }, z.array(BrandSchema).min(1)),
});

export const PaginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
});
