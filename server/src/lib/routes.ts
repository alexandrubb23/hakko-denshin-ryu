export const ApiRoutes = {
  authBase: "/api/auth",
  authWildcard: "/api/auth/*splat",
  health: "/api/health",
  me: "/api/me",
  adminStudents: "/api/admin/students",
  adminStudent: "/api/admin/students/:id",
} as const;
