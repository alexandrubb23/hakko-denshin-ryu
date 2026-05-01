import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { CircularProgress, IconButton, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import { type AttendanceRecord } from "@api/attendance";
import { DAY_NAMES_SHORT, MONTH_NAMES } from "@constants/dateNames";
import {
  formatDateKey,
  getLatestTrainingDay,
  isTrainingDay,
  toUtcDate,
} from "@constants/trainingSchedule";
import { useUpsertAttendance } from "@hooks/useUpsertAttendance";
import { BORDER_COLOR, PURPLE, SURFACE_BG } from "@style/tokens";

import YesNoButtons from "./shared/YesNoButtons";

function getWeekDates(cursor: Date): Date[] {
  const d = new Date(cursor);
  const day = d.getUTCDay();
  const diff = day === 0 ? -6 : 1 - day;
  d.setUTCDate(d.getUTCDate() + diff);
  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(d);
    date.setUTCDate(d.getUTCDate() + i);
    return date;
  });
}

interface DayCellProps {
  date: Date;
  studentId: string;
  records: AttendanceRecord[];
  today: Date;
  year: number;
  month: number;
}

const WeekViewRoot = styled("div")({
  paddingTop: 24,
  paddingBottom: 24,
});

const ViewHeader = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 16,
  marginBottom: 24,
});

const NavIconButton = styled(IconButton)({
  color: PURPLE,
  "&.Mui-disabled": { color: "rgba(171,150,255,0.3)" },
});

const WeekTitle = styled(Typography)({
  fontWeight: 700,
  color: PURPLE,
  minWidth: 220,
  textAlign: "center",
});

const DaysRow = styled("div")({
  display: "flex",
  gap: 8,
});

const DayCellRoot = styled("div", {
  shouldForwardProp: (prop) => prop !== "training",
})<{ training: boolean }>(({ training }) => ({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 8,
  paddingTop: 16,
  paddingBottom: 16,
  paddingLeft: 8,
  paddingRight: 8,
  borderRadius: 8,
  backgroundColor: training ? SURFACE_BG : "transparent",
  border: training ? `1px solid ${BORDER_COLOR}` : "1px solid transparent",
  opacity: training ? 1 : 0.35,
  minWidth: 0,
}));

const DayCellLabel = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  textTransform: "uppercase",
  letterSpacing: 0.5,
}));

const DayCellNumber = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "training",
})<{ training: boolean }>(({ training, theme }) => ({
  fontWeight: 700,
  color: training ? PURPLE : theme.palette.text.disabled,
  lineHeight: 1,
}));

const DayCellActions = styled("div")({
  marginTop: 4,
  width: "100%",
  display: "flex",
  justifyContent: "center",
});

const PurpleSpinner = styled(CircularProgress)({ color: PURPLE });

const DayCell = ({
  date,
  studentId,
  records,
  today,
  year,
  month,
}: DayCellProps) => {
  const training = isTrainingDay(date);
  const isFuture = date > today;
  const dateKey = formatDateKey(date);
  const record = records.find((r) => r.date.startsWith(dateKey));
  const attended = record ? record.attended : null;

  const { mutate, isPending } = useUpsertAttendance(studentId, year, month);

  const handleMark = (value: boolean) => {
    if (!isFuture) mutate({ date: dateKey, attended: value });
  };

  return (
    <DayCellRoot training={training}>
      <DayCellLabel variant="caption">
        {DAY_NAMES_SHORT[date.getUTCDay()]}
      </DayCellLabel>
      <DayCellNumber variant="h6" training={training}>
        {date.getUTCDate()}
      </DayCellNumber>

      {training && (
        <DayCellActions>
          {isPending ? (
            <PurpleSpinner size={18} />
          ) : (
            <YesNoButtons
              attended={isFuture ? null : attended}
              onYes={() => handleMark(true)}
              onNo={() => handleMark(false)}
              disabled={isFuture}
              compact
            />
          )}
        </DayCellActions>
      )}
    </DayCellRoot>
  );
};

interface Props {
  studentId: string;
  cursor: Date;
  onCursorChange: (date: Date) => void;
  records: AttendanceRecord[];
}

const WeekView = ({ studentId, cursor, onCursorChange, records }: Props) => {
  const today = getLatestTrainingDay();
  const weekDates = getWeekDates(cursor);
  const firstDay = weekDates[0];
  const lastDay = weekDates[6];

  const headerLabel =
    firstDay.getUTCMonth() === lastDay.getUTCMonth()
      ? `${MONTH_NAMES[firstDay.getUTCMonth()]} ${firstDay.getUTCFullYear()}`
      : `${MONTH_NAMES[firstDay.getUTCMonth()]} – ${MONTH_NAMES[lastDay.getUTCMonth()]} ${lastDay.getUTCFullYear()}`;

  const prevWeek = () => {
    const d = new Date(firstDay);
    d.setUTCDate(d.getUTCDate() - 1);
    onCursorChange(d);
  };

  const nextWeek = () => {
    const d = new Date(lastDay);
    d.setUTCDate(d.getUTCDate() + 1);
    onCursorChange(d);
  };

  const isNextDisabled = lastDay >= today;
  const year = cursor.getUTCFullYear();
  const month = cursor.getUTCMonth() + 1;

  return (
    <WeekViewRoot>
      <ViewHeader>
        <NavIconButton onClick={prevWeek}>
          <ChevronLeftIcon />
        </NavIconButton>
        <WeekTitle variant="h6">{headerLabel}</WeekTitle>
        <NavIconButton onClick={nextWeek} disabled={isNextDisabled}>
          <ChevronRightIcon />
        </NavIconButton>
      </ViewHeader>

      <DaysRow>
        {weekDates.map((date) => {
          const y = date.getUTCFullYear();
          const m = date.getUTCMonth() + 1;
          const d = date.getUTCDate();
          return (
            <DayCell
              key={formatDateKey(date)}
              date={toUtcDate(y, m, d)}
              studentId={studentId}
              records={records}
              today={today}
              year={year}
              month={month}
            />
          );
        })}
      </DaysRow>
    </WeekViewRoot>
  );
};

export default WeekView;
