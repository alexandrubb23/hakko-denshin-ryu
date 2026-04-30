import { z } from "zod";

const rankFormBaseSchema = z.object({
  awardedAt: z.iso.date("Please select a valid date"),
  notes: z.string().trim().optional(),
});

export type RankFormBase = z.infer<typeof rankFormBaseSchema>;

export const createStudentRankSchema = rankFormBaseSchema.extend({
  rankId: z.number().int().min(1, "Please select a rank"),
});

export type CreateStudentRankInput = z.infer<typeof createStudentRankSchema>;

export const updateStudentRankSchema = rankFormBaseSchema;

export type UpdateStudentRankInput = z.infer<typeof updateStudentRankSchema>;
