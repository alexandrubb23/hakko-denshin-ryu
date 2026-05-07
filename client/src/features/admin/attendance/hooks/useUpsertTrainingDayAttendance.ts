import { useMutation, useQueryClient } from "@tanstack/react-query";

import { attendanceApi } from "@api/attendance";

interface Payload {
  studentId: string;
  attended: boolean;
}

export const useUpsertTrainingDayAttendance = (date: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ studentId, attended }: Payload) =>
      attendanceApi.upsertAttendance(studentId, date, attended),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["training-day-attendance", date],
      });
      queryClient.invalidateQueries({
        queryKey: ["dashboard", "students"],
      });
    },
  });
};
