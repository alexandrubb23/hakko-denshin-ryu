import { eventsApi } from "@api/events";
import type { CreateEventInput } from "@hakko/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateEventInput) => eventsApi.createEvent(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "events"] });
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
};
