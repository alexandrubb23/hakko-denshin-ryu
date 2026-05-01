import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
} from "chart.js";
import { useEffect, useMemo, useState } from "react";
import { Bar } from "react-chartjs-2";

import { type AttendanceRecord } from "@api/attendance";
import { DAY_NAMES_SHORT, MONTH_NAMES_SHORT } from "@constants/dateNames";
import {
  formatDateKey,
  getTrainingDaysInMonth,
  getTrainingDaysInWeek,
} from "@constants/trainingSchedule";
import { useAttendanceByYear } from "@hooks/useAttendance";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { BORDER_COLOR, PURPLE, SURFACE_BG } from "@style/tokens";

import { CalendarView } from "./shared/calendarView";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const ATTENDED_COLOR = PURPLE;
const ABSENT_COLOR = "rgba(211, 47, 47, 0.8)";
const UNMARKED_COLOR = "rgba(171, 150, 255, 0.18)";
const GRID_COLOR = "rgba(171, 150, 255, 0.08)";
const TICK_COLOR = "rgba(255, 255, 255, 0.45)";

const ChartRoot = styled("div")({
  marginBottom: 24,
  backgroundColor: SURFACE_BG,
  border: `1px solid ${BORDER_COLOR}`,
  borderRadius: 12,
  padding: "20px 16px 12px",
  backdropFilter: "blur(20px)",
});

const ChartHeader = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: 16,
});

const ChartTitle = styled(Typography)({
  color: PURPLE,
  fontWeight: 600,
  letterSpacing: 0.5,
  textTransform: "uppercase",
  fontSize: "0.7rem",
});

const StatsBadges = styled("div")(({ theme }) => ({
  display: "flex",
  gap: 8,
  [theme.breakpoints.down("sm")]: {
    gap: 6,
  },
}));

const StatBadge = styled("div", {
  shouldForwardProp: (prop) => prop !== "variant",
})<{ variant: "present" | "absent" }>(({ variant, theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: 5,
  fontSize: "0.7rem",
  fontWeight: 600,
  color: variant === "present" ? PURPLE : "rgba(211, 47, 47, 0.9)",
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.6rem",
    gap: 3,
  },
}));

const StatDot = styled("span", {
  shouldForwardProp: (prop) => prop !== "variant",
})<{ variant: "present" | "absent" }>(({ variant, theme }) => ({
  width: 10,
  height: 10,
  borderRadius: 2,
  flexShrink: 0,
  border: `1px solid ${variant === "present" ? PURPLE : "rgba(211, 47, 47, 0.9)"}`,
  backgroundColor:
    variant === "present" ? "rgba(171,150,255,0.18)" : "rgba(211,47,47,0.15)",
  [theme.breakpoints.down("sm")]: {
    width: 8,
    height: 8,
  },
}));

interface Props {
  view: CalendarView;
  cursor: Date;
  records: AttendanceRecord[];
  studentId: string;
}

enum SessionLabel {
  Present = "Present",
  Absent = "Absent",
  Unmarked = "Unmarked",
  NotYet = "Not yet",
}

interface ChartData {
  labels: string[];
  data: number[];
  colors: string[];
  maxY: number;
  tooltipLabels?: string[];
  absentData?: number[];
  presentCount: number;
  absentCount: number;
}

function makeSingleBarData(
  label: string,
  value: number,
  color: string,
  tooltipLabel: string,
  presentCount: number,
  absentCount: number
): ChartData {
  return {
    labels: [label],
    data: [value],
    colors: [color],
    maxY: 1,
    tooltipLabels: [tooltipLabel],
    presentCount,
    absentCount,
  };
}

function buildDayData(cursor: Date, records: AttendanceRecord[]): ChartData {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const isFuture = cursor > today;
  const key = formatDateKey(cursor);
  const label = `${DAY_NAMES_SHORT[cursor.getUTCDay()]} ${cursor.getUTCDate()} ${MONTH_NAMES_SHORT[cursor.getUTCMonth()]} ${cursor.getUTCFullYear()}`;

  if (isFuture)
    return makeSingleBarData(
      label,
      0.3,
      UNMARKED_COLOR,
      SessionLabel.NotYet,
      0,
      0
    );

  const record = records.find((r) => r.date.startsWith(key));
  if (!record)
    return makeSingleBarData(
      label,
      0.5,
      UNMARKED_COLOR,
      SessionLabel.Unmarked,
      0,
      0
    );
  if (record.attended)
    return makeSingleBarData(
      label,
      1,
      ATTENDED_COLOR,
      SessionLabel.Present,
      1,
      0
    );
  return makeSingleBarData(label, 1, ABSENT_COLOR, SessionLabel.Absent, 0, 1);
}

function buildWeekData(cursor: Date, records: AttendanceRecord[]): ChartData {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const trainingDays = getTrainingDaysInWeek(cursor);

  const labels: string[] = [];
  const data: number[] = [];
  const colors: string[] = [];
  const tooltipLabels: string[] = [];

  trainingDays.forEach((d) => {
    const isFuture = d > today;
    const key = formatDateKey(d);
    const dayLabel = `${DAY_NAMES_SHORT[d.getUTCDay()]} ${d.getUTCDate()}`;
    labels.push(dayLabel);

    if (isFuture) {
      data.push(0.3);
      colors.push(UNMARKED_COLOR);
      tooltipLabels.push(SessionLabel.NotYet);
      return;
    }

    const record = records.find((r) => r.date.startsWith(key));
    if (!record) {
      data.push(0.5);
      colors.push(UNMARKED_COLOR);
      tooltipLabels.push(SessionLabel.Unmarked);
      return;
    }

    if (record.attended) {
      data.push(1);
      colors.push(ATTENDED_COLOR);
      tooltipLabels.push(SessionLabel.Present);
    } else {
      data.push(1);
      colors.push(ABSENT_COLOR);
      tooltipLabels.push(SessionLabel.Absent);
    }
  });

  return {
    labels,
    data,
    colors,
    maxY: 1,
    tooltipLabels,
    presentCount: tooltipLabels.filter((l) => l === SessionLabel.Present)
      .length,
    absentCount: tooltipLabels.filter((l) => l === SessionLabel.Absent).length,
  };
}

function buildMonthData(cursor: Date, records: AttendanceRecord[]): ChartData {
  const year = cursor.getUTCFullYear();
  const month = cursor.getUTCMonth() + 1;
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const trainingDays = getTrainingDaysInMonth(year, month);

  const labels: string[] = [];
  const data: number[] = [];
  const colors: string[] = [];
  const tooltipLabels: string[] = [];

  trainingDays.forEach((d) => {
    const isFuture = d > today;
    const key = formatDateKey(d);
    labels.push(`${DAY_NAMES_SHORT[d.getUTCDay()]} ${d.getUTCDate()}`);

    if (isFuture) {
      data.push(0.3);
      colors.push(UNMARKED_COLOR);
      tooltipLabels.push(SessionLabel.NotYet);
      return;
    }

    const record = records.find((r) => r.date.startsWith(key));
    if (!record) {
      data.push(0.5);
      colors.push(UNMARKED_COLOR);
      tooltipLabels.push(SessionLabel.Unmarked);
      return;
    }

    if (record.attended) {
      data.push(1);
      colors.push(ATTENDED_COLOR);
      tooltipLabels.push(SessionLabel.Present);
    } else {
      data.push(1);
      colors.push(ABSENT_COLOR);
      tooltipLabels.push(SessionLabel.Absent);
    }
  });

  return {
    labels,
    data,
    colors,
    maxY: 1,
    tooltipLabels,
    presentCount: tooltipLabels.filter((l) => l === SessionLabel.Present)
      .length,
    absentCount: tooltipLabels.filter((l) => l === SessionLabel.Absent).length,
  };
}

function buildYearData(
  yearRecords: AttendanceRecord[],
  year: number
): ChartData {
  const labels = MONTH_NAMES_SHORT.map((m) => `${m} ${year}`);
  const attendedData = Array.from({ length: 12 }, (_, i) => {
    const monthStr = String(i + 1).padStart(2, "0");
    return yearRecords.filter(
      (r) => r.date.slice(5, 7) === monthStr && r.attended
    ).length;
  });
  const absentData = Array.from({ length: 12 }, (_, i) => {
    const monthStr = String(i + 1).padStart(2, "0");
    return yearRecords.filter(
      (r) => r.date.slice(5, 7) === monthStr && !r.attended
    ).length;
  });
  const maxY = Math.max(...attendedData.map((a, i) => a + absentData[i]), 4);
  const presentCount = attendedData.reduce((s, v) => s + v, 0);
  const absentCount = absentData.reduce((s, v) => s + v, 0);
  return {
    labels,
    data: attendedData,
    colors: attendedData.map(() => ATTENDED_COLOR),
    absentData,
    maxY,
    presentCount,
    absentCount,
  };
}

const CHART_LABEL: Record<CalendarView, string> = {
  [CalendarView.day]: "Selected session",
  [CalendarView.week]: "This week",
  [CalendarView.month]: "This month",
  [CalendarView.year]: "Sessions per month",
};

const AttendanceChart = ({ view, cursor, records, studentId }: Props) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const year = cursor.getUTCFullYear();

  const { data: yearData } = useAttendanceByYear({
    studentId,
    year,
  });

  const chartData = useMemo<ChartData>(() => {
    if (view === CalendarView.year)
      return buildYearData(yearData?.records ?? [], year);
    if (view === CalendarView.month) return buildMonthData(cursor, records);
    if (view === CalendarView.day) return buildDayData(cursor, records);
    return buildWeekData(cursor, records);
  }, [view, cursor, records, yearData]);

  if (!mounted) return null;

  const isYearView = view === CalendarView.year;

  const attendedDataset = {
    label: "Attended",
    data: chartData.data,
    backgroundColor: chartData.colors,
    borderRadius: isYearView ? 0 : 4,
    borderSkipped: false as const,
    barPercentage: 0.65,
    categoryPercentage: 0.8,
    stack: "sessions",
  };

  const absentDataset = chartData.absentData
    ? {
        label: "Not attended",
        data: chartData.absentData,
        backgroundColor: chartData.absentData.map(() => ABSENT_COLOR),
        borderRadius: 4,
        borderSkipped: false as const,
        barPercentage: 0.65,
        categoryPercentage: 0.8,
        stack: "sessions",
      }
    : null;

  const datasets = absentDataset
    ? [attendedDataset, absentDataset]
    : [attendedDataset];

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    animation: { duration: 400 },
    plugins: {
      legend: {
        display: isYearView,
        labels: {
          color: TICK_COLOR,
          boxWidth: 12,
          boxHeight: 12,
          borderRadius: 3,
          padding: 16,
          font: { size: 11 },
        },
      },
      tooltip: {
        callbacks: {
          label: (ctx: import("chart.js").TooltipItem<"bar">) => {
            if (isYearView) {
              const v = ctx.parsed.y ?? 0;
              return ` ${v} session${v !== 1 ? "s" : ""} ${ctx.dataset.label?.toLowerCase()}`;
            }
            const label = chartData.tooltipLabels?.[ctx.dataIndex] ?? "";
            return ` ${label}`;
          },
        },
        backgroundColor: "rgba(10, 6, 25, 0.92)",
        titleColor: PURPLE,
        bodyColor: "rgba(255,255,255,0.75)",
        borderColor: BORDER_COLOR,
        borderWidth: 1,
        padding: 10,
      },
    },
    scales: {
      x: {
        stacked: isYearView,
        grid: { color: GRID_COLOR },
        ticks: {
          color: TICK_COLOR,
          font: { size: 11 },
        },
        border: { color: GRID_COLOR },
      },
      y: {
        stacked: isYearView,
        min: 0,
        max: chartData.maxY,
        grid: { color: GRID_COLOR },
        ticks: {
          color: TICK_COLOR,
          font: { size: 11 },
          stepSize: isYearView ? undefined : 0.5,
          callback: (value: number | string) => {
            if (isYearView) return value;
            const v = Number(value);
            if (v === 0) return "0";
            if (v === 1) return "1";
            return "";
          },
        },
        border: { color: GRID_COLOR },
      },
    },
  };

  return (
    <ChartRoot>
      <ChartHeader>
        <ChartTitle variant="caption">{CHART_LABEL[view]}</ChartTitle>
        <StatsBadges>
          <StatBadge variant="present">
            <StatDot variant="present" />
            {chartData.presentCount} present
          </StatBadge>
          <StatBadge variant="absent">
            <StatDot variant="absent" />
            {chartData.absentCount} not present
          </StatBadge>
        </StatsBadges>
      </ChartHeader>
      <Bar data={{ labels: chartData.labels, datasets }} options={options} />
    </ChartRoot>
  );
};

export default AttendanceChart;
