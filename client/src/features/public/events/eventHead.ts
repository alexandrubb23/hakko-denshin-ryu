import { eventsApi } from "@api/events";

import type { PageHead } from "../../../pages";

import { eventDescription, eventTitle } from "./eventMeta";

// Past this, the page is served with its generic preview instead
const EVENT_HEAD_TIMEOUT_MS = 3000;

/** The event page's head: titled, described and pictured after its event */
export const fetchEventHead = async (
  slug: string,
  locale: string
): Promise<PageHead> => {
  const event = await eventsApi.fetchEvent(slug, {
    timeout: EVENT_HEAD_TIMEOUT_MS,
  });
  return {
    title: eventTitle(event),
    description: eventDescription(locale, event),
    image: event.image ?? undefined,
  };
};
