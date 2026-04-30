export const Routes = {
  home: "/",
  hakkoRyu: "/hakko-ryu",
  senshinkan: "/senshinkan",
  dojo: "/dojo",
  contact: "/contact",
  login: "/login",
  dashboard: "/dashboard",
  students: "/students",
  studentDetail: (id: string) => `/students/${id}`,
} as const;

export const ApiRoutes = {
  me: "/api/me",
  adminStudents: "/api/admin/students",
  adminStudent: (id: string) => `/api/admin/students/${id}`,
} as const;
