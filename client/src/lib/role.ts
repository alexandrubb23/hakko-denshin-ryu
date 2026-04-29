export const Role = {
  admin: "admin",
  student: "student",
} as const;

export type RoleType = (typeof Role)[keyof typeof Role];
