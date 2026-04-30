import { type UpdateStudentInput } from "@hakko/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { studentsApi } from "@api/students";

type UpdateStudentPayload = { id: string } & UpdateStudentInput;

export const useUpdateStudent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ...payload }: UpdateStudentPayload) =>
      studentsApi.updateStudent(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
  });
};
