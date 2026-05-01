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
  techniques: "/techniques",
  kyuProgram: "/kyu-program",
} as const;

export const ApiRoutes = {
  me: "/api/me",
  meImage: "/api/me/image",
  techniques: "/api/techniques",
  kyuProgram: "/api/kyu-program",
  adminRanks: "/api/admin/ranks",
  adminStudents: "/api/admin/students",
  adminStudent: (id: string) => `/api/admin/students/${id}`,
  adminStudentImage: (id: string) => `/api/admin/students/${id}/image`,
  adminStudentRanks: (id: string) => `/api/admin/students/${id}/ranks`,
  adminStudentRank: (studentId: string, rankEntryId: string) =>
    `/api/admin/students/${studentId}/ranks/${rankEntryId}`,
  adminStudentAttendance: (studentId: string) =>
    `/api/admin/students/${studentId}/attendance`,
} as const;
