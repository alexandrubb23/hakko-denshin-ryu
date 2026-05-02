import { eventsApi } from "@api/events";
import type { UpsertEventParticipationInput } from "@hakko/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpsertEventParticipation = (eventId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpsertEventParticipationInput) =>
      eventsApi.upsertEventParticipation(eventId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin", "events", eventId, "participants"],
      });
    },
  });
};
