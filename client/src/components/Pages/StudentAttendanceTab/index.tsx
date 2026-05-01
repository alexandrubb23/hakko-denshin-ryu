import { Alert, CircularProgress } from "@mui/material";
import { styled } from "@mui/material/styles";
import { type ComponentType, useMemo } from "react";
import { useSearchParams } from "react-router";

import { type AttendanceRecord } from "@api/attendance";
import { formatDateKey, getLatestTrainingDay, toUtcDate } from "@constants/trainingSchedule";
import { useAttendanceByMonth } from "@hooks/useAttendance";
import { PURPLE } from "@style/tokens";

import DayView from "./DayView";
import MonthView from "./MonthView";
import AttendanceNavBar, { type CalendarView } from "./shared/AttendanceNavBar";
import WeekView from "./WeekView";
import YearView from "./YearView";

interface Props {
  studentId: string;
}

interface ViewProps {
  studentId: string;
  cursor: Date;
  onCursorChange: (date: Date) => void;
  records: AttendanceRecord[];
}

const VALID_VIEWS: CalendarView[] = ["day", "week", "month", "year"];

const VIEW_COMPONENTS: Record<CalendarView, ComponentType<ViewProps>> = {
  day: DayView,
  week: WeekView,
  month: MonthView,
  year: YearView as ComponentType<ViewProps>, // YearView fetches its own yearly data
};

const TabRoot = styled("div")({ marginTop: 24 });

const LoadingContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  paddingTop: 48,
  paddingBottom: 48,
});

const PurpleSpinner = styled(CircularProgress)({ color: PURPLE });

const StyledAlert = styled(Alert)({ marginTop: 16 });

function parseView(param: string | null): CalendarView {
  return param && VALID_VIEWS.includes(param as CalendarView)
    ? (param as CalendarView)
    : "day";
}

function parseCursor(param: string | null): Date {
  if (param) {
    const [y, m, d] = param.split("-").map(Number);
    if (y && m && d) return toUtcDate(y, m, d);
  }
  return getLatestTrainingDay();
}

const StudentAttendanceTab = ({ studentId }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const view = useMemo(() => parseView(searchParams.get("view")), [searchParams]);
  const cursor = useMemo(() => parseCursor(searchParams.get("date")), [searchParams]);

  const year = cursor.getUTCFullYear();
  const month = cursor.getUTCMonth() + 1;

  const { data, isLoading, isError } = useAttendanceByMonth({ studentId, year, month });
  const records = data?.records ?? [];

  const updateParams = (updates: Record<string, string>) => {
    setSearchParams(
      (prev) => {
        Object.entries(updates).forEach(([k, v]) => prev.set(k, v));
        return prev;
      },
      { replace: true }
    );
  };

  const handleViewChange = (newView: CalendarView) => {
    const latest = getLatestTrainingDay();
    const newCursor =
      (newView === "day" || newView === "week") && cursor > latest ? latest : cursor;
    updateParams({ view: newView, date: formatDateKey(newCursor) });
  };

  const handleCursorChange = (date: Date) => {
    updateParams({ date: formatDateKey(date) });
  };

  const ActiveView = VIEW_COMPONENTS[view];

  return (
    <TabRoot>
      <AttendanceNavBar view={view} onChange={handleViewChange} />

      {isError && view !== "year" && (
        <StyledAlert severity="error">
          Failed to load attendance data. Please try again.
        </StyledAlert>
      )}

      {isLoading && view !== "year" && (
        <LoadingContainer>
          <PurpleSpinner />
        </LoadingContainer>
      )}

      {(!isLoading || view === "year") && !isError && (
        <ActiveView
          studentId={studentId}
          cursor={cursor}
          onCursorChange={handleCursorChange}
          records={records}
        />
      )}
    </TabRoot>
  );
};

export default StudentAttendanceTab;
