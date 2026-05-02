import { useQuery } from "@tanstack/react-query";
import { eventsApi } from "@api/events";

export const useAdminEvents = () =>
  useQuery({
    queryKey: ["admin", "events"],
    queryFn: () => eventsApi.fetchAdminEvents(),
  });
