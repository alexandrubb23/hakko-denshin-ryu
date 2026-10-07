import type { IntlShape } from "react-intl";

import type { Event } from "@api/events";
import type { IntlMessageID } from "i18n/messages";

/** The event's type in the active language: "Seminar", "Camp"… */
export const formatEventType = (intl: IntlShape, type: Event["type"]) =>
  intl.formatMessage({ id: `page.events.type.${type}` as IntlMessageID });
