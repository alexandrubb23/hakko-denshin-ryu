import { useMemo } from "react";
import { useSearchParams } from "react-router";

import {
  formatDateKey,
  getLatestTrainingDay,
  toUtcDate,
} from "@constants/trainingSchedule";

import { CalendarView } from "./calendarView";

const VALID_VIEWS = Object.values(CalendarView);

export function parseView(
  param: string | null,
  defaultView: CalendarView = CalendarView.day,
): CalendarView {
  return param && VALID_VIEWS.includes(param as CalendarView)
    ? (param as CalendarView)
    : defaultView;
}

export function parseCursor(param: string | null): Date {
  if (param) {
    const [y, m, d] = param.split("-").map(Number);
    if (y && m && d) return toUtcDate(y, m, d);
  }
  return getLatestTrainingDay();
}

const useAttendanceTabParams = (
  defaultView: CalendarView = CalendarView.year,
) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const view = useMemo(
    () => parseView(searchParams.get("view"), defaultView),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchParams],
  );
  const cursor = useMemo(
    () => parseCursor(searchParams.get("date")),
    [searchParams],
  );

  const year = cursor.getUTCFullYear();
  const month = cursor.getUTCMonth() + 1;

  const updateParams = (updates: Record<string, string>) => {
    setSearchParams(
      (prev) => {
        Object.entries(updates).forEach(([k, v]) => prev.set(k, v));
        return prev;
      },
      { replace: true },
    );
  };

  const handleViewChange = (newView: CalendarView) => {
    const latest = getLatestTrainingDay();
    const newCursor =
      (newView === CalendarView.day || newView === CalendarView.week) &&
      cursor > latest
        ? latest
        : cursor;
    updateParams({ view: newView, date: formatDateKey(newCursor) });
  };

  const handleCursorChange = (date: Date) => {
    updateParams({ date: formatDateKey(date) });
  };

  return { view, cursor, year, month, handleViewChange, handleCursorChange };
};

export default useAttendanceTabParams;
