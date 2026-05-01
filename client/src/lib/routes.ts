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
} as const;

export const ApiRoutes = {
  me: "/api/me",
  techniques: "/api/techniques",
  adminRanks: "/api/admin/ranks",
  adminStudents: "/api/admin/students",
  adminStudent: (id: string) => `/api/admin/students/${id}`,
  adminStudentRanks: (id: string) => `/api/admin/students/${id}/ranks`,
  adminStudentRank: (studentId: string, rankEntryId: string) =>
    `/api/admin/students/${studentId}/ranks/${rankEntryId}`,
  adminStudentAttendance: (studentId: string) =>
    `/api/admin/students/${studentId}/attendance`,
} as const;
