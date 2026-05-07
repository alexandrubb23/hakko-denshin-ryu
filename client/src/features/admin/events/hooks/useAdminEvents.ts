import { eventsApi } from "@api/events";
import { useQuery } from "@tanstack/react-query";

export const useAdminEvents = () =>
  useQuery({
    queryKey: ["admin", "events"],
    queryFn: () => eventsApi.fetchAdminEvents(),
  });
