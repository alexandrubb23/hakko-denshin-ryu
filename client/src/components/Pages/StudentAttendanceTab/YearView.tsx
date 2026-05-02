import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { IconButton, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";

import { type AttendanceRecord } from "@api/attendance";
import { DAY_HEADERS_MINI, MONTH_NAMES_SHORT } from "@constants/dateNames";
import {
  formatDateKey,
  getCalendarGrid,
  getLatestTrainingDay,
  isTrainingDay,
  toUtcDate,
} from "@constants/trainingSchedule";
import { useAttendanceByYear } from "@hooks/useAttendance";
import {
  BORDER_COLOR,
  PURPLE,
  PURPLE_ALPHA_12,
  PURPLE_ALPHA_30,
  SURFACE_BG,
} from "@style/tokens";

import AttendanceDayDot, { AttendanceStatus } from "./shared/AttendanceDayDot";
import AttendancePopup from "./shared/AttendancePopup";

function getStatus(
  date: Date,
  records: AttendanceRecord[],
  today: Date
): AttendanceStatus {
  if (date > today) return AttendanceStatus.unmarked;
  const record = records.find((r) => r.date.startsWith(formatDateKey(date)));
  if (!record) return AttendanceStatus.unmarked;
  return record.attended ? AttendanceStatus.present : AttendanceStatus.absent;
}

const YearViewRoot = styled("div")({ paddingTop: 24, paddingBottom: 24 });

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

const YearTitle = styled(Typography)({ fontWeight: 700, color: PURPLE });

const MonthsGrid = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: 16,
  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "repeat(2, 1fr)",
  },
}));

const MiniMonthCard = styled("div")({
  backgroundColor: SURFACE_BG,
  border: `1px solid ${BORDER_COLOR}`,
  borderRadius: 8,
  padding: 12,
});

const MiniMonthTitle = styled(Typography)({
  display: "block",
  textAlign: "center",
  fontWeight: 700,
  color: PURPLE,
  marginBottom: 6,
});

const DayHeadersGrid = styled("div")({
  display: "grid",
  gridTemplateColumns: "repeat(7, 1fr)",
  gap: 2,
  marginBottom: 2,
});

const DayHeaderText = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  color: theme.palette.text.disabled,
  fontSize: "0.6rem",
}));

const CellsGrid = styled("div")({
  display: "grid",
  gridTemplateColumns: "repeat(7, 1fr)",
  gap: 2,
});

const DayCell = styled("div", {
  shouldForwardProp: (prop) => prop !== "clickable",
})<{ clickable: boolean }>(({ clickable }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: 20,
  borderRadius: 2,
  cursor: clickable ? "pointer" : "default",
  "&:hover": clickable ? { backgroundColor: PURPLE_ALPHA_12 } : {},
}));

const EmptyDayCell = styled("div")({ height: 20 });

const NonTrainingText = styled(Typography)(({ theme }) => ({
  fontSize: "0.6rem",
  color: theme.palette.text.disabled,
}));

interface MiniMonthProps {
  year: number;
  month: number;
  records: AttendanceRecord[];
  today: Date;
  onDayClick: (date: Date, el: HTMLElement) => void;
}

const MiniMonth = ({
  year,
  month,
  records,
  today,
  onDayClick,
}: MiniMonthProps) => {
  const grid = getCalendarGrid(year, month);

  return (
    <MiniMonthCard>
      <MiniMonthTitle variant="caption">
        {MONTH_NAMES_SHORT[month - 1]}
      </MiniMonthTitle>

      <DayHeadersGrid>
        {DAY_HEADERS_MINI.map((h, i) => (
          <DayHeaderText key={i} variant="caption">
            {h}
          </DayHeaderText>
        ))}
      </DayHeadersGrid>

      <CellsGrid>
        {grid.map((date, i) =>
          date ? (
            <DayCell
              key={formatDateKey(date)}
              clickable={isTrainingDay(date) && date <= today}
              onClick={
                isTrainingDay(date) && date <= today
                  ? (e) => onDayClick(date, e.currentTarget as HTMLElement)
                  : undefined
              }
            >
              {isTrainingDay(date) ? (
                <AttendanceDayDot
                  status={getStatus(date, records, today)}
                  size={7}
                />
              ) : (
                <NonTrainingText variant="caption">
                  {date.getUTCDate()}
                </NonTrainingText>
              )}
            </DayCell>
          ) : (
            <EmptyDayCell key={`e-${i}`} />
          )
        )}
      </CellsGrid>
    </MiniMonthCard>
  );
};

interface Props {
  studentId: string;
  cursor: Date;
  onCursorChange: (date: Date) => void;
}

const YearView = ({ studentId, cursor, onCursorChange }: Props) => {
  const year = cursor.getUTCFullYear();
  const today = getLatestTrainingDay();

  const { data, isLoading, isError } = useAttendanceByYear({ studentId, year });
  const records = data?.records ?? [];

  const [popoverAnchor, setPopoverAnchor] = useState<HTMLElement | null>(null);
  const [popoverDate, setPopoverDate] = useState<Date | null>(null);

  const handleDayClick = (date: Date, el: HTMLElement) => {
    setPopoverDate(date);
    setPopoverAnchor(el);
  };

  const handlePopoverClose = () => {
    setPopoverAnchor(null);
    setPopoverDate(null);
  };

  return (
    <YearViewRoot>
      <ViewHeader>
        <NavIconButton
          onClick={() => onCursorChange(toUtcDate(year - 1, 1, 1))}
        >
          <ChevronLeftIcon />
        </NavIconButton>
        <YearTitle variant="h6">{year}</YearTitle>
        <NavIconButton
          onClick={() => onCursorChange(toUtcDate(year + 1, 1, 1))}
          disabled={year >= today.getUTCFullYear()}
        >
          <ChevronRightIcon />
        </NavIconButton>
      </ViewHeader>

      {isError && (
        <Typography color="error" sx={{ textAlign: "center" }}>
          Failed to load attendance data.
        </Typography>
      )}

      {!isError && (
        <MonthsGrid>
          {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
            <MiniMonth
              key={month}
              year={year}
              month={month}
              records={isLoading ? [] : records}
              today={today}
              onDayClick={handleDayClick}
            />
          ))}
        </MonthsGrid>
      )}

      <AttendancePopup
        anchorEl={popoverAnchor}
        date={popoverDate}
        studentId={studentId}
        records={records}
        onClose={handlePopoverClose}
      />
    </YearViewRoot>
  );
};

export default YearView;
