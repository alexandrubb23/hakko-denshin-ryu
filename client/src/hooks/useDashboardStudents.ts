import { useQuery } from "@tanstack/react-query";

import { dashboardApi, type AttendancePeriod } from "@api/dashboard";

export const useDashboardStudents = (period: AttendancePeriod = "all") =>
  useQuery({
    queryKey: ["dashboard", "students", period],
    queryFn: () => dashboardApi.fetchStudentStats(period),
  });
