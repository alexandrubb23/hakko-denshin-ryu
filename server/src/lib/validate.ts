import { z, type ZodType } from "zod";
import { type Response } from "express";

export const validate = <T>(
  schema: ZodType<T>,
  data: unknown,
  res: Response
): T | null => {
  const parsed = schema.safeParse(data);
  if (!parsed.success) {
    res.status(400).json({ error: z.treeifyError(parsed.error) });
    return null;
  }
  return parsed.data;
};
