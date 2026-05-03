export const PERIOD_VALUES = ["all", "day", "week", "month", "year"] as const;

export type Period = (typeof PERIOD_VALUES)[number];
