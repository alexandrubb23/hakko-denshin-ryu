import { eventsApi } from "@api/events";
import { useQuery } from "@tanstack/react-query";

export const useAdminEvent = (id: string) =>
  useQuery({
    queryKey: ["admin", "events", id],
    queryFn: () => eventsApi.fetchEvent(id),
    enabled: !!id,
  });
