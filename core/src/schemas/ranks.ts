import { z } from "zod";

export const createStudentRankSchema = z.object({
  rankId: z.number().int().min(1, "Please select a rank"),
  awardedAt: z.iso.date("Please select a valid date"),
  notes: z.string().trim().optional(),
});

export type CreateStudentRankInput = z.infer<typeof createStudentRankSchema>;
