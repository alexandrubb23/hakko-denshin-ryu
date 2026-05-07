import { useMutation, useQueryClient } from "@tanstack/react-query";

import { studentsApi } from "@api/students";

export const useUploadStudentImage = (studentId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: File) => studentsApi.uploadStudentImage(studentId, file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students", studentId] });
    },
  });
};
