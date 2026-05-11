import { z } from "zod";

import { STUDENT_CATEGORIES } from "../constants/categories.js";

const categorySchema = z.enum(STUDENT_CATEGORIES, {
  error: () => ({ message: "Category must be 'kid' or 'senior'" }),
});

export const createStudentSchema = z
  .object({
    name: z.string().trim().min(3, "Name must be at least 3 characters"),
    email: z.email("Invalid email address"),
    category: categorySchema,
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

export const updateStudentSchema = z
  .object({
    name: z.string().trim().min(3, "Name must be at least 3 characters"),
    email: z.email("Invalid email address"),
    category: categorySchema,
    password: z
      .string()
      .refine(
        (val) => !val || val.length >= 8,
        "Password must be at least 8 characters"
      )
      .optional(),
    sendInvite: z.boolean().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.sendInvite && data.password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Cannot set a password when sending an invitation email",
        path: ["password"],
      });
    }
  });

export type UpdateStudentInput = z.infer<typeof updateStudentSchema>;

export const setPasswordSchema = z.object({
  token: z.string().min(1, "Token is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type SetPasswordInput = z.infer<typeof setPasswordSchema>;
