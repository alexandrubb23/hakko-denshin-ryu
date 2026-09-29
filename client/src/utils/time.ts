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

/**
 * Formats a UTC ISO date string to a human-readable date (Europe/Bucharest).
 * Defaults to the Romanian locale; pass `intl.locale` to follow the active language.
 */
export const formatDate = (iso: string, locale = "ro-RO") =>
  new Date(iso).toLocaleDateString(locale, {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "Europe/Bucharest",
  });
