export const ApiRoutes = {
  authBase: "/api/auth",
  authWildcard: "/api/auth/*splat",
  health: "/api/health",
  me: "/api/me",
  adminRanks: "/api/admin/ranks",
  adminStudents: "/api/admin/students",
  adminStudent: "/api/admin/students/:id",
  adminStudentRanks: "/api/admin/students/:id/ranks",
} as const;
