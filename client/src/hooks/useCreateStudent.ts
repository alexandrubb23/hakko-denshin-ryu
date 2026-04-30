import { createStudent } from "@api/students";
import { type CreateStudentInput } from "@hakko/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateStudent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateStudentInput) => createStudent(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
  });
};
