import type { Event } from "@api/events";
import { brandedTitle } from "@constants/brand";
import { Routes } from "@lib/routes";
import { truncate } from "@utils/string";

import { formatEventWhenWhere } from "./formatEventDate";

// Link previews show about this much of a description
const DESCRIPTION_LENGTH = 200;

type EventSummary = Pick<Event, "name" | "sessions" | "location">;

/** The event's public page at `origin` */
export const eventPageUrl = (origin: string, slug: string) =>
  `${origin}${Routes.eventDetail(slug)}`;

/** The event page's document title: "Taikai 2025 - Senshinkan Romania" */
export const eventTitle = (event: Pick<Event, "name">) =>
  brandedTitle(event.name);

/** The event page's meta description: "29–31 May 2025 · Belgium. Two days of…" */
export const eventDescription = (
  locale: string,
  event: Omit<EventSummary, "name"> & Pick<Event, "details">
) =>
  [
    formatEventWhenWhere(locale, event),
    truncate(event.details, DESCRIPTION_LENGTH),
  ]
    .filter(Boolean)
    .join(". ");

/** One line naming the event: "Taikai 2025 · 29–31 May 2025 · Belgium" */
export const eventShareText = (locale: string, event: EventSummary) =>
  `${event.name} · ${formatEventWhenWhere(locale, event)}`;
