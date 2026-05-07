import { useMutation, useQueryClient } from "@tanstack/react-query";

import { studentsApi } from "@api/students";

export const useDeleteStudentRank = (studentId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (rankEntryId: string) =>
      studentsApi.deleteStudentRank(studentId, rankEntryId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["students", studentId, "ranks"],
      });
    },
  });
};
