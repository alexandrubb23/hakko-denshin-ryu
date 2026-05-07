import { useMutation, useQueryClient } from "@tanstack/react-query";

import { studentsApi } from "@api/students";
import { type CreateStudentRankInput } from "@hakko/core";

export const useCreateStudentRank = (studentId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateStudentRankInput) =>
      studentsApi.createStudentRank(studentId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["students", studentId, "ranks"],
      });
    },
  });
};
