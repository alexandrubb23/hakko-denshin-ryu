import { eventsApi } from "@api/events";
import type { UpdateEventInput } from "@hakko/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateEvent = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateEventInput) =>
      eventsApi.updateEvent(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "events"] });
      queryClient.invalidateQueries({ queryKey: ["events"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "events", id] });
    },
  });
};
