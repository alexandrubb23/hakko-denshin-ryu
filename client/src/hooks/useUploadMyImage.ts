import { useMutation, useQueryClient } from "@tanstack/react-query";

import { meApi } from "@api/me";

export const useUploadMyImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: File) => meApi.uploadMyImage(file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
};
