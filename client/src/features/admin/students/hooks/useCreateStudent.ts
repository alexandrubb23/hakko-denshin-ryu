import { type CreateStudentInput } from "@hakko/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { studentsApi } from "@api/students";

export const useCreateStudent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateStudentInput) =>
      studentsApi.createStudent(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
  });
};
