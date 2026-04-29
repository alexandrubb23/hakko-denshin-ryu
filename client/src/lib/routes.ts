export const Routes = {
  home: "/",
  hakkoRyu: "/hakko-ryu",
  senshinkan: "/senshinkan",
  dojo: "/dojo",
  contact: "/contact",
  login: "/login",
  dashboard: "/dashboard",
  students: "/students",
} as const;

export const ApiRoutes = {
  me: "/api/me",
  adminStudents: "/api/admin/students",
} as const;
