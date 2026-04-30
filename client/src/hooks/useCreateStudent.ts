import { createStudent, type CreateStudentPayload } from "@api/students";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateStudent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateStudentPayload) => createStudent(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
  });
};
