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
