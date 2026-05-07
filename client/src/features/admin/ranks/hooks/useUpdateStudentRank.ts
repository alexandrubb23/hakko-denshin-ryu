import { useMutation, useQueryClient } from "@tanstack/react-query";

import { studentsApi } from "@api/students";
import { type UpdateStudentRankInput } from "@hakko/core";

export const useUpdateStudentRank = (studentId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      rankEntryId,
      payload,
    }: {
      rankEntryId: string;
      payload: UpdateStudentRankInput;
    }) => studentsApi.updateStudentRank(studentId, rankEntryId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students", studentId, "ranks"] });
    },
  });
};
