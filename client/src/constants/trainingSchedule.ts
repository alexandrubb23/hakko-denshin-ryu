import { daysInMonth, toUtcDate, type StudentCategory } from "@hakko/core";

export { daysInMonth, toUtcDate };

// ─── Weekly timetable ───────────────────────────────────────────────────────

export interface TrainingSession {
  /** JS getDay() index (0=Sun ... 6=Sat) */
  day: number;
  group: StudentCategory;
  /** "HH:mm", local dojo time */
  start: string;
  end: string;
}

export const TRAINING_SESSIONS: readonly TrainingSession[] = [
  { day: 2, group: "kid", start: "18:30", end: "19:30" },
  { day: 2, group: "senior", start: "19:30", end: "21:00" },
  { day: 4, group: "senior", start: "20:00", end: "21:30" },
  { day: 6, group: "kid", start: "10:00", end: "11:00" },
  { day: 6, group: "senior", start: "11:00", end: "12:30" },
];

/** Weekdays with at least one session, ascending (JS getDay(): 0=Sun ... 6=Sat). */
export const TRAINING_DAYS: readonly number[] = [
  ...new Set(TRAINING_SESSIONS.map((s) => s.day)),
].sort((a, b) => a - b);

const toMinutes = (time: string) => {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
};

/** Length of a session in minutes. */
export const getSessionMinutes = ({ start, end }: TrainingSession): number =>
  toMinutes(end) - toMinutes(start);

/** Weekly session count and total training minutes for a group. */
export const getGroupStats = (group: StudentCategory) => {
  const sessions = TRAINING_SESSIONS.filter((s) => s.group === group);
  return {
    count: sessions.length,
    minutes: sessions.reduce((sum, s) => sum + getSessionMinutes(s), 0),
  };
};

export interface TrainingDaySessions {
  day: number;
  sessions: TrainingSession[];
}

/** Sessions grouped by weekday, optionally limited to one group; days without sessions are omitted. */
export const getSessionsByDay = (
  group: StudentCategory | null = null
): TrainingDaySessions[] =>
  TRAINING_DAYS.map((day) => ({
    day,
    sessions: TRAINING_SESSIONS.filter(
      (s) => s.day === day && (!group || s.group === group)
    ),
  })).filter(({ sessions }) => sessions.length > 0);

// ─── Calendar helpers ───────────────────────────────────────────────────────

export function isTrainingDay(date: Date): boolean {
  return TRAINING_DAYS.includes(date.getUTCDay());
}

function stepTrainingDay(from: Date, step: 1 | -1): Date {
  const d = new Date(from);
  do {
    d.setUTCDate(d.getUTCDate() + step);
  } while (!isTrainingDay(d));
  return d;
}

/** Returns the nearest previous training day. */
export function getPrevTrainingDay(from: Date): Date {
  return stepTrainingDay(from, -1);
}

/** Returns the nearest next training day. */
export function getNextTrainingDay(from: Date): Date {
  return stepTrainingDay(from, 1);
}

/**
 * Returns the latest past-or-today training day (for initial Day view cursor).
 */
export function getLatestTrainingDay(): Date {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  if (isTrainingDay(today)) return today;
  return getPrevTrainingDay(today);
}

/**
 * Returns all training day Dates within a given month (1-indexed).
 */
export function getTrainingDaysInMonth(year: number, month: number): Date[] {
  const days: Date[] = [];
  const totalDays = daysInMonth(year, month);
  for (let d = 1; d <= totalDays; d++) {
    const date = toUtcDate(year, month, d);
    if (isTrainingDay(date)) days.push(date);
  }
  return days;
}

/**
 * Returns all training day Dates within a given year.
 */
export function getTrainingDaysInYear(year: number): Date[] {
  const days: Date[] = [];
  for (let month = 1; month <= 12; month++) {
    days.push(...getTrainingDaysInMonth(year, month));
  }
  return days;
}

/**
 * Returns all training day Dates in the ISO week (Mon–Sun) containing the given date.
 */
export function getTrainingDaysInWeek(date: Date): Date[] {
  const d = new Date(date);
  const day = d.getUTCDay();
  const diff = day === 0 ? -6 : 1 - day; // shift to Monday
  d.setUTCDate(d.getUTCDate() + diff);
  const days: Date[] = [];
  for (let i = 0; i < 7; i++) {
    const curr = new Date(d);
    curr.setUTCDate(d.getUTCDate() + i);
    if (isTrainingDay(curr)) days.push(curr);
  }
  return days;
}

/** Format a Date to a "YYYY-MM-DD" string for API calls. */
export function formatDateKey(date: Date): string {
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, "0");
  const d = String(date.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/**
 * Returns a Monday-first calendar grid for a given month.
 * Cells are Date objects for valid days, or null for padding cells.
 * Total length is always a multiple of 7.
 */
export function getCalendarGrid(year: number, month: number): (Date | null)[] {
  const firstDay = toUtcDate(year, month, 1);
  const totalDays = daysInMonth(year, month);
  const startOffset = (firstDay.getUTCDay() + 6) % 7;
  const cells: (Date | null)[] = Array(startOffset).fill(null);
  for (let d = 1; d <= totalDays; d++) cells.push(toUtcDate(year, month, d));
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}
