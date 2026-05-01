export const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
] as const;

export const MONTH_NAMES_SHORT = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
] as const;

/** Sunday-first, matches JS Date.getDay() (0 = Sun) */
export const DAY_NAMES = [
  "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",
] as const;

/** Sunday-first, matches JS Date.getDay() (0 = Sun) */
export const DAY_NAMES_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;

/** Monday-first calendar grid headers (abbreviated) */
export const DAY_HEADERS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;

/** Monday-first calendar grid headers (single letter, for compact views) */
export const DAY_HEADERS_MINI = ["M", "T", "W", "T", "F", "S", "S"] as const;
