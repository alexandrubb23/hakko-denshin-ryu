export const STUDENT_CATEGORIES = ["kid", "senior"] as const;

export type StudentCategory = (typeof STUDENT_CATEGORIES)[number];
