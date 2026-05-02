import { type ComponentType } from "react";

import { type AttendanceRecord } from "@api/attendance";
import { useAttendanceByMonth } from "@hooks/useAttendance";

import AttendanceChart from "./AttendanceChart";
import DayView from "./DayView";
import MonthView from "./MonthView";
import AttendanceNavBar from "./shared/AttendanceNavBar";
import {
  LoadingContainer,
  PurpleSpinner,
  StyledAlert,
  TabRoot,
} from "./shared/AttendanceTab.style";
import { CalendarView } from "./shared/calendarView";
import useAttendanceTabParams from "./shared/useAttendanceTabParams";
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

const VIEW_COMPONENTS: Record<CalendarView, ComponentType<ViewProps>> = {
  [CalendarView.day]: DayView,
  [CalendarView.week]: WeekView,
  [CalendarView.month]: MonthView,
  [CalendarView.year]: YearView as ComponentType<ViewProps>,
};

const StudentAttendanceTab = ({ studentId }: Props) => {
  const { view, cursor, year, month, handleViewChange, handleCursorChange } =
    useAttendanceTabParams();

  const { data, isLoading, isError } = useAttendanceByMonth({
    studentId,
    year,
    month,
  });
  const records = data?.records ?? [];

  const ActiveView = VIEW_COMPONENTS[view];

  return (
    <TabRoot>
      <AttendanceChart
        view={view}
        cursor={cursor}
        records={records}
        studentId={studentId}
      />

      <AttendanceNavBar view={view} onChange={handleViewChange} />

      {isError && view !== CalendarView.year && (
        <StyledAlert severity="error">
          Failed to load attendance data. Please try again.
        </StyledAlert>
      )}

      {isLoading && view !== CalendarView.year && (
        <LoadingContainer>
          <PurpleSpinner />
        </LoadingContainer>
      )}

      {(!isLoading || view === CalendarView.year) &&
        (!isError || view === CalendarView.year) && (
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
