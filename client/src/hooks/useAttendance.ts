import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { attendanceApi } from "@api/attendance";

interface UseAttendanceByMonthParams {
  studentId: string;
  year: number;
  month: number;
}

export const useAttendanceByMonth = ({ studentId, year, month }: UseAttendanceByMonthParams) =>
  useQuery({
    queryKey: ["students", studentId, "attendance", year, month],
    queryFn: () => attendanceApi.getAttendanceByMonth(studentId, year, month),
    placeholderData: keepPreviousData,
  });

interface UseAttendanceByYearParams {
  studentId: string;
  year: number;
}

export const useAttendanceByYear = ({ studentId, year }: UseAttendanceByYearParams) =>
  useQuery({
    queryKey: ["students", studentId, "attendance", year],
    queryFn: () => attendanceApi.getAttendanceByYear(studentId, year),
  });
