export const getReadingTimeMs = (text: string, wpm = 200) => {
  const words = text.split(/\s+/).length;
  const minutes = words / wpm;
  return Math.ceil(minutes * 60 * 1000);
};

export const getQuoteDisplayTime = (text: string) => {
  const baseDelay = 1000;
  const readingTime = getReadingTimeMs(text);
  return Math.max(readingTime, baseDelay) + 1000; // Add 1s padding
};

/** The dojo's time zone: dates and times are shown as they are in Corbeanca */
export const TIME_ZONE = "Europe/Bucharest";

/** "23 Oct 2026", in the dojo's time zone */
export const DATE_OPTIONS: Intl.DateTimeFormatOptions = {
  day: "2-digit",
  month: "short",
  year: "numeric",
  timeZone: TIME_ZONE,
};

/**
 * Formats a UTC ISO date string to a human-readable date (Europe/Bucharest).
 * Defaults to the Romanian locale; pass `intl.locale` to follow the active language.
 */
export const formatDate = (iso: string, locale = "ro-RO") =>
  new Date(iso).toLocaleDateString(locale, DATE_OPTIONS);
