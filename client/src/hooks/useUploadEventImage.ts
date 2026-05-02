import { eventsApi } from "@api/events";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUploadEventImage = (eventId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: File) => eventsApi.uploadEventImage(eventId, file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "events"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "events", eventId] });
    },
  });
};
