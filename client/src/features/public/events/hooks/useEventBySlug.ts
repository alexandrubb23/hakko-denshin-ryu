import { type Event, eventsApi } from "@api/events";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { isNotFoundError } from "@utils/getServerError";

/**
 * A published event, by its slug. Opened from the events list, it shows the
 * card's copy of the event at once while the page's own copy loads.
 */
export const useEventBySlug = (slug: string) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["events", "slug", slug],
    queryFn: () => eventsApi.fetchEvent(slug),
    placeholderData: () =>
      queryClient
        .getQueryData<Event[]>(["events"])
        ?.find((event) => event.slug === slug),
    // A missing event stays missing; don't retry the 404
    retry: (failureCount, error) => !isNotFoundError(error) && failureCount < 3,
  });
};
