import { eventsApi } from "@api/events";
import { useQuery } from "@tanstack/react-query";

export const useEventParticipants = (eventId: string) =>
  useQuery({
    queryKey: ["admin", "events", eventId, "participants"],
    queryFn: () => eventsApi.fetchEventParticipants(eventId),
    enabled: !!eventId,
  });
