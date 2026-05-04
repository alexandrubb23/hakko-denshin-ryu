import {
  useMyAttendanceByMonth,
  useMyAttendanceByYear,
} from "@hooks/useMyAttendance";

import AttendanceChart from "./StudentAttendanceTab/AttendanceChart";
import DayView from "./StudentAttendanceTab/DayView";
import MonthView from "./StudentAttendanceTab/MonthView";
import MyYearView from "./StudentAttendanceTab/MyYearView";
import AttendanceNavBar from "./StudentAttendanceTab/shared/AttendanceNavBar";
import {
  LoadingContainer,
  PurpleSpinner,
  TabRoot,
} from "./StudentAttendanceTab/shared/AttendanceTab.style";
import { CalendarView } from "./StudentAttendanceTab/shared/calendarView";
import useAttendanceTabParams from "./StudentAttendanceTab/shared/useAttendanceTabParams";
import WeekView from "./StudentAttendanceTab/WeekView";
import ErrorAlert from "./shared/ErrorAlert";

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
              <MyYearView cursor={cursor} onCursorChange={handleCursorChange} />
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
