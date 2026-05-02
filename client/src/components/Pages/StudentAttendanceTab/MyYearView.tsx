import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { IconButton, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import { type AttendanceRecord } from "@api/attendance";
import { DAY_HEADERS_MINI, MONTH_NAMES_SHORT } from "@constants/dateNames";
import {
  formatDateKey,
  getCalendarGrid,
  getLatestTrainingDay,
  isTrainingDay,
  toUtcDate,
} from "@constants/trainingSchedule";
import { useMyAttendanceByYear } from "@hooks/useMyAttendance";
import { BORDER_COLOR, PURPLE, SURFACE_BG } from "@style/tokens";

import AttendanceDayDot, { AttendanceStatus } from "./shared/AttendanceDayDot";

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
  "&.Mui-disabled": { color: "rgba(171,150,255,0.3)" },
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

const DayCell = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: 20,
  borderRadius: 2,
  cursor: "default",
});

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
}

const MiniMonth = ({ year, month, records, today }: MiniMonthProps) => {
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
            <DayCell key={formatDateKey(date)}>
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
  cursor: Date;
  onCursorChange: (date: Date) => void;
}

const MyYearView = ({ cursor, onCursorChange }: Props) => {
  const year = cursor.getUTCFullYear();
  const today = getLatestTrainingDay();

  const { data, isLoading, isError } = useMyAttendanceByYear(year);
  const records = data?.records ?? [];

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
            />
          ))}
        </MonthsGrid>
      )}
    </YearViewRoot>
  );
};

export default MyYearView;
