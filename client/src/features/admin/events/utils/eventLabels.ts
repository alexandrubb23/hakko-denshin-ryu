import type { IntlMessageID } from "i18n/messages";

export const EVENT_STATUS_LABEL_IDS: Record<string, IntlMessageID> = {
  draft: "admin.events.status.draft",
  published: "admin.events.status.published",
  cancelled: "admin.events.status.cancelled",
};

export const EVENT_TYPE_LABEL_IDS: Record<string, IntlMessageID> = {
  seminar: "page.events.type.seminar",
  demo: "page.events.type.demo",
  camp: "page.events.type.camp",
  other: "page.events.type.other",
};
