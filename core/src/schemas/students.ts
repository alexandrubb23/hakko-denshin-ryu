import { z } from "zod";

export const createStudentSchema = z
  .object({
    name: z.string().trim().min(3, "Name must be at least 3 characters"),
    email: z.email("Invalid email address"),
    password: z.preprocess(
      (v) => (v === "" ? undefined : v),
      z.string().min(8, "Password must be at least 8 characters").optional()
    ),
    sendInvite: z.boolean().optional(),
  })
  .superRefine((data, ctx) => {
    if (!data.sendInvite && !data.password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Password must be at least 8 characters",
        path: ["password"],
      });
    }
  });

export type CreateStudentInput = z.infer<typeof createStudentSchema>;

export const updateStudentSchema = z.object({
  name: z.string().trim().min(3, "Name must be at least 3 characters"),
  email: z.email("Invalid email address"),
  password: z
    .string()
    .refine(
      (val) => !val || val.length >= 8,
      "Password must be at least 8 characters"
    )
    .optional(),
});

export type UpdateStudentInput = z.infer<typeof updateStudentSchema>;

export const setPasswordSchema = z.object({
  token: z.string().min(1, "Token is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type SetPasswordInput = z.infer<typeof setPasswordSchema>;
