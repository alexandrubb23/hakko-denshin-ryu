import { useMutation, useQueryClient } from "@tanstack/react-query";

import { attendanceApi } from "@api/attendance";

interface UpsertAttendancePayload {
  date: string; // "YYYY-MM-DD"
  attended: boolean;
}

export const useUpsertAttendance = (
  studentId: string,
  year: number,
  month?: number
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ date, attended }: UpsertAttendancePayload) =>
      attendanceApi.upsertAttendance(studentId, date, attended),
    onSuccess: () => {
      // Invalidate both month and year caches so all views stay in sync
      if (month !== undefined) {
        queryClient.invalidateQueries({
          queryKey: ["students", studentId, "attendance", year, month],
        });
      }
      queryClient.invalidateQueries({
        queryKey: ["students", studentId, "attendance", year],
      });
    },
  });
};
