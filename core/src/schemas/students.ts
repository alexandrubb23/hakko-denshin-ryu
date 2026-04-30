import { z } from "zod";

export const createStudentSchema = z.object({
  name: z.string().trim().min(3, "Name must be at least 3 characters"),
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type CreateStudentInput = z.infer<typeof createStudentSchema>;
