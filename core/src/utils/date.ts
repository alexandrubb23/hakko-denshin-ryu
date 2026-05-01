/** Returns a Date set to midnight UTC for the given year, 1-indexed month, and day. */
export function toUtcDate(year: number, month: number, day: number): Date {
  return new Date(Date.UTC(year, month - 1, day));
}

/** Returns the number of days in the given month (1-indexed). */
export function daysInMonth(year: number, month: number): number {
  return new Date(Date.UTC(year, month, 0)).getUTCDate();
}
