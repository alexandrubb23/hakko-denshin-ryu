import {
  useMyAttendanceByMonth,
  useMyAttendanceByYear,
} from "@features/student/attendance/hooks/useMyAttendance";

import AttendanceChart from "@components/shared/AttendanceTab/AttendanceChart";
import DayView from "@components/shared/AttendanceTab/DayView";
import MonthView from "@components/shared/AttendanceTab/MonthView";
import YearView from "@components/shared/AttendanceTab/YearView";
import AttendanceNavBar from "@components/shared/AttendanceTab/shared/AttendanceNavBar";
import {
  LoadingContainer,
  PurpleSpinner,
  TabRoot,
} from "@components/shared/AttendanceTab/shared/AttendanceTab.style";
import { CalendarView } from "@components/shared/AttendanceTab/shared/calendarView";
import useAttendanceTabParams from "@components/shared/AttendanceTab/shared/useAttendanceTabParams";
import WeekView from "@components/shared/AttendanceTab/WeekView";
import ErrorAlert from "@components/shared/ErrorAlert";

const PLACEHOLDER_STUDENT_ID = "";

const MyAttendanceTab = () => {
  const { view, cursor, year, month, handleViewChange, handleCursorChange } =
    useAttendanceTabParams();

  const {
    data: monthData,
    isLoading,
    isError,
  } = useMyAttendanceByMonth(year, month);
  const { data: yearData } = useMyAttendanceByYear(year);
  const records = monthData?.records ?? [];

  return (
    <TabRoot>
      <AttendanceChart
        view={view}
        cursor={cursor}
        records={records}
        yearData={yearData?.records}
      />

      <AttendanceNavBar view={view} onChange={handleViewChange} />

      {isError && view !== CalendarView.year && (
        <ErrorAlert>
          Failed to load attendance data. Please try again.
        </ErrorAlert>
      )}

      {isLoading && view !== CalendarView.year && (
        <LoadingContainer>
          <PurpleSpinner />
        </LoadingContainer>
      )}

      {(!isLoading || view === CalendarView.year) &&
        (!isError || view === CalendarView.year) && (
          <>
            {view === CalendarView.year && (
              <YearView
                studentId={PLACEHOLDER_STUDENT_ID}
                cursor={cursor}
                onCursorChange={handleCursorChange}
                readOnly
              />
            )}
            {view === CalendarView.day && (
              <DayView
                studentId={PLACEHOLDER_STUDENT_ID}
                cursor={cursor}
                onCursorChange={handleCursorChange}
                records={records}
                readOnly
              />
            )}
            {view === CalendarView.week && (
              <WeekView
                studentId={PLACEHOLDER_STUDENT_ID}
                cursor={cursor}
                onCursorChange={handleCursorChange}
                records={records}
                readOnly
              />
            )}
            {view === CalendarView.month && (
              <MonthView
                studentId={PLACEHOLDER_STUDENT_ID}
                cursor={cursor}
                onCursorChange={handleCursorChange}
                records={records}
                readOnly
              />
            )}
          </>
        )}
    </TabRoot>
  );
};

export default MyAttendanceTab;
