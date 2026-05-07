import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { CircularProgress, IconButton, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import { type AttendanceRecord } from "@api/attendance";
import { DAY_HEADERS, MONTH_NAMES } from "@constants/dateNames";
import {
  formatDateKey,
  getCalendarGrid,
  getLatestTrainingDay,
  isTrainingDay,
  toUtcDate,
} from "@constants/trainingSchedule";
import {
  BORDER_COLOR,
  PURPLE,
  PURPLE_ALPHA_30,
  SURFACE_BG,
} from "@style/tokens";

import AttendedChip from "../AttendedChip";
import useAttendanceMark from "./shared/useAttendanceMark";
import YesNoButtons from "./shared/YesNoButtons";

interface DayCellProps {
  date: Date;
  studentId: string;
  records: AttendanceRecord[];
  today: Date;
  year: number;
  month: number;
  readOnly?: boolean;
}

const MonthViewRoot = styled("div")({ paddingTop: 24, paddingBottom: 24 });

const ViewHeader = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 16,
  marginBottom: 24,
});

const NavIconButton = styled(IconButton)({
  color: PURPLE,
  "&.Mui-disabled": { color: PURPLE_ALPHA_30 },
});

const MonthTitle = styled(Typography)({
  fontWeight: 700,
  color: PURPLE,
  minWidth: 200,
  textAlign: "center",
});

const DayHeadersGrid = styled("div")({
  display: "grid",
  gridTemplateColumns: "repeat(7, 1fr)",
  gap: 4,
  marginBottom: 4,
});

const DayHeaderText = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  color: theme.palette.text.secondary,
  fontWeight: 600,
}));

const CalendarGrid = styled("div")({
  display: "grid",
  gridTemplateColumns: "repeat(7, 1fr)",
  gap: 4,
});

const DayCellRoot = styled("div", {
  shouldForwardProp: (prop) => prop !== "training" && prop !== "isFuture",
})<{ training: boolean; isFuture: boolean }>(({ training, isFuture }) => ({
  minHeight: 80,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
  paddingTop: 8,
  paddingBottom: 4,
  borderRadius: 6,
  backgroundColor: training ? SURFACE_BG : "transparent",
  border: training ? `1px solid ${BORDER_COLOR}` : "1px solid transparent",
  opacity: training ? (isFuture ? 0.45 : 1) : 0.3,
  gap: 4,
}));

const DayCellNumber = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "training",
})<{ training: boolean }>(({ training, theme }) => ({
  fontWeight: training ? 700 : 400,
  color: training ? PURPLE : theme.palette.text.disabled,
}));

const EmptyCell = styled("div")({ minHeight: 80 });

const PurpleSpinner = styled(CircularProgress)({ color: PURPLE });

const DayCell = ({
  date,
  studentId,
  records,
  today,
  year,
  month,
  readOnly,
}: DayCellProps) => {
  const training = isTrainingDay(date);
  const isFuture = date > today;

  const { attended, isPending, handleMark } = useAttendanceMark({
    date,
    studentId,
    year,
    month,
    records,
  });

  return (
    <DayCellRoot training={training} isFuture={isFuture}>
      <DayCellNumber variant="caption" training={training}>
        {date.getUTCDate()}
      </DayCellNumber>

      {training && !isFuture && (
        <div>
          {readOnly ? (
            <AttendedChip attended={attended} />
          ) : isPending ? (
            <PurpleSpinner size={14} />
          ) : (
            <YesNoButtons
              attended={attended}
              onYes={() => handleMark(true)}
              onNo={() => handleMark(false)}
              compact
            />
          )}
        </div>
      )}
    </DayCellRoot>
  );
};

interface Props {
  studentId: string;
  cursor: Date;
  onCursorChange: (date: Date) => void;
  records: AttendanceRecord[];
  readOnly?: boolean;
}

const MonthView = ({
  studentId,
  cursor,
  onCursorChange,
  records,
  readOnly,
}: Props) => {
  const year = cursor.getUTCFullYear();
  const month = cursor.getUTCMonth() + 1;
  const today = getLatestTrainingDay();
  const grid = getCalendarGrid(year, month);

  const prevMonth = () => {
    onCursorChange(
      toUtcDate(month === 1 ? year - 1 : year, month === 1 ? 12 : month - 1, 1),
    );
  };

  const nextMonth = () => {
    onCursorChange(
      toUtcDate(
        month === 12 ? year + 1 : year,
        month === 12 ? 1 : month + 1,
        1,
      ),
    );
  };

  const isNextDisabled =
    year > today.getUTCFullYear() ||
    (year === today.getUTCFullYear() && month >= today.getUTCMonth() + 1);

  return (
    <MonthViewRoot>
      <ViewHeader>
        <NavIconButton onClick={prevMonth}>
          <ChevronLeftIcon />
        </NavIconButton>
        <MonthTitle variant="h6">
          {MONTH_NAMES[month - 1]} {year}
        </MonthTitle>
        <NavIconButton onClick={nextMonth} disabled={isNextDisabled}>
          <ChevronRightIcon />
        </NavIconButton>
      </ViewHeader>

      <DayHeadersGrid>
        {DAY_HEADERS.map((h) => (
          <DayHeaderText key={h} variant="caption">
            {h}
          </DayHeaderText>
        ))}
      </DayHeadersGrid>

      <CalendarGrid>
        {grid.map((date, i) =>
          date ? (
            <DayCell
              key={formatDateKey(date)}
              date={date}
              studentId={studentId}
              records={records}
              today={today}
              year={year}
              month={month}
              readOnly={readOnly}
            />
          ) : (
            <EmptyCell key={`empty-${i}`} />
          ),
        )}
      </CalendarGrid>
    </MonthViewRoot>
  );
};

export default MonthView;
