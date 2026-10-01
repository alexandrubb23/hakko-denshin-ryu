const DATE_OPTIONS: Intl.DateTimeFormatOptions = {
  day: "2-digit",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Europe/Bucharest",
};

/** The event's start, or its start – end range, in dojo-local time */
export const formatEventDate = (
  locale: string,
  start: string,
  end?: string | null
): string => {
  const startStr = new Date(start).toLocaleString(locale, DATE_OPTIONS);
  if (!end) return startStr;
  const endStr = new Date(end).toLocaleString(locale, DATE_OPTIONS);
  return `${startStr} – ${endStr}`;
};
