import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { CircularProgress, IconButton, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import { type AttendanceRecord } from "@api/attendance";
import { DAY_NAMES, MONTH_NAMES } from "@constants/dateNames";
import {
  formatDateKey,
  getLatestTrainingDay,
  getNextTrainingDay,
  getPrevTrainingDay,
} from "@constants/trainingSchedule";
import { useUpsertAttendance } from "@hooks/useUpsertAttendance";
import { BORDER_COLOR, PURPLE, SURFACE_BG } from "@style/tokens";

import AttendedChip from "../AttendedChip";
import YesNoButtons from "./shared/YesNoButtons";

interface Props {
  studentId: string;
  cursor: Date;
  onCursorChange: (date: Date) => void;
  records: AttendanceRecord[];
  readOnly?: boolean;
}

const DayViewRoot = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 24,
  paddingTop: 32,
  paddingBottom: 32,
});

const NavRow = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: 16,
});

const NavIconButton = styled(IconButton)({
  color: PURPLE,
  "&.Mui-disabled": { color: "rgba(171,150,255,0.3)" },
});

const DateCard = styled("div")({
  textAlign: "center",
  backgroundColor: SURFACE_BG,
  border: `1px solid ${BORDER_COLOR}`,
  borderRadius: 8,
  paddingLeft: 32,
  paddingRight: 32,
  paddingTop: 16,
  paddingBottom: 16,
  minWidth: 220,
});

const DayNameCaption = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  textTransform: "uppercase",
  letterSpacing: 1,
}));

const DayNumber = styled(Typography)({
  fontWeight: 700,
  color: PURPLE,
  lineHeight: 1.2,
});

const MonthYearText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

const ActionSection = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 12,
});

const ActionLabel = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

const PurpleSpinner = styled(CircularProgress)({ color: PURPLE });

const DayView = ({
  studentId,
  cursor,
  onCursorChange,
  records,
  readOnly,
}: Props) => {
  const today = getLatestTrainingDay();
  const isAtOrBeforeToday = cursor <= today;

  const dateKey = formatDateKey(cursor);
  const record = records.find((r) => r.date.startsWith(dateKey));
  const attended = record ? record.attended : null;

  const year = cursor.getUTCFullYear();
  const month = cursor.getUTCMonth() + 1;
  const { mutate, isPending } = useUpsertAttendance(studentId, year, month);

  const handleMark = (value: boolean) => {
    mutate({ date: dateKey, attended: value });
  };

  const dayName = DAY_NAMES[cursor.getUTCDay()];
  const monthName = MONTH_NAMES[cursor.getUTCMonth()];
  const day = cursor.getUTCDate();
  const fullYear = cursor.getUTCFullYear();

  return (
    <DayViewRoot>
      <NavRow>
        <NavIconButton
          onClick={() => onCursorChange(getPrevTrainingDay(cursor))}
        >
          <ChevronLeftIcon />
        </NavIconButton>

        <DateCard>
          <DayNameCaption variant="caption">{dayName}</DayNameCaption>
          <DayNumber variant="h4">{day}</DayNumber>
          <MonthYearText variant="body1">
            {monthName} {fullYear}
          </MonthYearText>
        </DateCard>

        <NavIconButton
          onClick={() => onCursorChange(getNextTrainingDay(cursor))}
          disabled={!isAtOrBeforeToday || cursor >= today}
        >
          <ChevronRightIcon />
        </NavIconButton>
      </NavRow>

      <ActionSection>
        <ActionLabel variant="body2">
          {attended === null
            ? "Mark attendance for this session:"
            : "Attendance marked:"}
        </ActionLabel>
        {readOnly ? (
          <AttendedChip attended={attended} />
        ) : isPending ? (
          <PurpleSpinner size={24} />
        ) : (
          <YesNoButtons
            attended={attended}
            onYes={() => handleMark(true)}
            onNo={() => handleMark(false)}
            size="medium"
          />
        )}
      </ActionSection>
    </DayViewRoot>
  );
};

export default DayView;
