import { eventsApi } from "@api/events";
import { useQuery } from "@tanstack/react-query";

export const useEvents = () =>
  useQuery({
    queryKey: ["events"],
    queryFn: () => eventsApi.fetchEvents(),
  });
