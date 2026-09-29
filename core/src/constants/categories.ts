export const STUDENT_CATEGORIES = ["kid", "senior"] as const;

export type StudentCategory = (typeof STUDENT_CATEGORIES)[number];

export const isStudentCategory = (
  value: string | null | undefined,
): value is StudentCategory =>
  STUDENT_CATEGORIES.includes(value as StudentCategory);
