import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { meApi } from "@api/me";

export const useMyAttendanceByMonth = (year: number, month: number) =>
  useQuery({
    queryKey: ["me", "attendance", year, month],
    queryFn: () => meApi.getMyAttendance(year, month),
    placeholderData: keepPreviousData,
  });

export const useMyAttendanceByYear = (year: number) =>
  useQuery({
    queryKey: ["me", "attendance", year],
    queryFn: () => meApi.getMyAttendance(year),
  });
