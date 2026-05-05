export const Routes = {
  home: "/",
  hakkoRyu: "/hakko-ryu",
  senshinkan: "/senshinkan",
  dojo: "/dojo",
  contact: "/contact",
  login: "/login",
  setPassword: "/set-password",
  dashboard: "/dashboard",
  students: "/students",
  studentDetail: (id: string) => `/students/${id}`,
  techniques: "/techniques",
  kyuProgram: "/kyu-program",
  events: "/events",
  adminEvents: "/admin/events",
} as const;

export const ApiRoutes = {
  me: "/api/me",
  meImage: "/api/me/image",
  meRanks: "/api/me/ranks",
  meAttendance: "/api/me/attendance",
  meEvents: "/api/me/events",
  techniques: "/api/techniques",
  kyuProgram: "/api/kyu-program",
  events: "/api/events",
  event: (id: string) => `/api/events/${id}`,
  adminRanks: "/api/admin/ranks",
  adminStudents: "/api/admin/students",
  adminStudent: (id: string) => `/api/admin/students/${id}`,
  adminStudentImage: (id: string) => `/api/admin/students/${id}/image`,
  adminStudentRanks: (id: string) => `/api/admin/students/${id}/ranks`,
  adminStudentRank: (studentId: string, rankEntryId: string) =>
    `/api/admin/students/${studentId}/ranks/${rankEntryId}`,
  adminStudentAttendance: (studentId: string) =>
    `/api/admin/students/${studentId}/attendance`,
  adminEvents: "/api/admin/events",
  adminEvent: (id: string) => `/api/admin/events/${id}`,
  adminEventImage: (id: string) => `/api/admin/events/${id}/image`,
  adminEventParticipants: (id: string) =>
    `/api/admin/events/${id}/participants`,
  adminStudentEvents: (studentId: string) =>
    `/api/admin/students/${studentId}/events`,
  adminDashboardStudents: "/api/admin/dashboard/students",
  adminDashboardEvents: "/api/admin/dashboard/events",
  adminTrainingDayAttendance: "/api/admin/training-day/attendance",
  inviteVerifyToken: "/api/invite/verify-token",
  inviteSetPassword: "/api/invite/set-password",
} as const;
