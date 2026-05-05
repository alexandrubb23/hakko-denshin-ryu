import { useQuery } from "@tanstack/react-query";

import { attendanceApi } from "@api/attendance";

export const useTrainingDayAttendance = (date: string) =>
  useQuery({
    queryKey: ["training-day-attendance", date],
    queryFn: () => attendanceApi.getTrainingDayAttendance(date),
  });
