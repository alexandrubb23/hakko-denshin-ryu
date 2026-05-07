import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  Tooltip,
} from "chart.js";
import { useMemo, useState } from "react";
import { Bar } from "react-chartjs-2";

import { type AttendancePeriod, type DashboardStudent } from "@api/dashboard";
import { useDashboardStudents } from "@features/admin/dashboard/hooks/useDashboardStudents";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Skeleton from "@mui/material/Skeleton";
import {
  CHART_GRID_COLOR,
  CHART_TICK_COLOR,
  CHART_TOOLTIP_BG,
  CHART_TOOLTIP_TEXT,
} from "@style/chart.tokens";
import {
  BELT_BLACK,
  BELT_BLUE,
  BELT_BROWN,
  BELT_GREEN,
  BELT_ORANGE,
  BELT_UNRANKED,
  BELT_WHITE,
  BELT_YELLOW,
} from "@style/ranks.tokens";
import { BORDER_COLOR, PURPLE, SKELETON_SX } from "@style/tokens";

import BeltChipLabel from "@components/shared/BeltChipLabel";
import ChipFilterRow from "@components/shared/ChipFilterRow";
import TrainingDayModal from "@features/admin/attendance/components/TrainingDayModal";
import {
  ChartHeader,
  ChartRoot,
  ChartTitle,
  StudentCountBadge,
  trainingDayBtnSx,
} from "./DashboardStudentChart.style";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

const TRAINING_DAYS = new Set([2, 4, 6]); // Tue, Thu, Sat

const BELT_COLORS: Record<string, string> = {
  white: BELT_WHITE,
  yellow: BELT_YELLOW,
  orange: BELT_ORANGE,
  green: BELT_GREEN,
  blue: BELT_BLUE,
  brown: BELT_BROWN,
  black: BELT_BLACK,
};

const ALL_RANK_FILTER = "all";
const UNRANKED_FILTER = "unranked";

const PERIOD_OPTIONS: { value: AttendancePeriod; label: string }[] = [
  { value: "all", label: "All Time" },
  { value: "day", label: "Today" },
  { value: "week", label: "This Week" },
  { value: "month", label: "This Month" },
  { value: "year", label: "This Year" },
];

function beltColor(belt: string | null): string {
  if (!belt) return BELT_UNRANKED;
  return BELT_COLORS[belt] ?? BELT_UNRANKED;
}

function filterStudents(
  students: DashboardStudent[],
  rankFilter: string
): DashboardStudent[] {
  if (rankFilter === ALL_RANK_FILTER) return students;
  if (rankFilter === UNRANKED_FILTER)
    return students.filter((s) => s.rankId === null);
  return students.filter((s) => String(s.rankId) === rankFilter);
}

const DashboardStudentChart = () => {
  const [period, setPeriod] = useState<AttendancePeriod>("all");
  const [rankFilter, setRankFilter] = useState<string>(ALL_RANK_FILTER);
  const [trainingModalOpen, setTrainingModalOpen] = useState(false);

  const today = new Date();
  const isTodayTrainingDay = TRAINING_DAYS.has(today.getDay());
  const todayStr = today.toLocaleDateString("en-CA"); // "YYYY-MM-DD"

  const { data, isLoading, isFetching } = useDashboardStudents(period);

  const hasUnranked = useMemo(
    () => (data?.students ?? []).some((s) => s.rankId === null),
    [data]
  );

  const filtered = useMemo(
    () => filterStudents(data?.students ?? [], rankFilter),
    [data, rankFilter]
  );

  const chartData = useMemo(() => {
    const labels = filtered.map((s) => s.name);
    const values = filtered.map((s) => s.attendanceCount);
    const colors = filtered.map((s) => beltColor(s.belt));
    return { labels, values, colors };
  }, [filtered]);

  const maxX = useMemo(
    () => Math.max(...(chartData.values.length ? chartData.values : [0]), 4),
    [chartData.values]
  );

  const options = {
    indexAxis: "y" as const,
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 350 },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx: import("chart.js").TooltipItem<"bar">) => {
            const count = ctx.parsed.x ?? 0;
            const student = filtered[ctx.dataIndex];
            const rank = student?.rankName ?? "Unranked";
            return [
              ` ${count} session${count !== 1 ? "s" : ""} attended`,
              ` Rank: ${rank}`,
            ];
          },
        },
        backgroundColor: CHART_TOOLTIP_BG,
        titleColor: PURPLE,
        bodyColor: CHART_TOOLTIP_TEXT,
        borderColor: BORDER_COLOR,
        borderWidth: 1,
        padding: 10,
      },
    },
    scales: {
      x: {
        min: 0,
        max: maxX,
        grid: { color: CHART_GRID_COLOR },
        ticks: {
          color: CHART_TICK_COLOR,
          font: { size: 11 },
          stepSize: 1,
          precision: 0,
        },
        border: { color: CHART_GRID_COLOR },
      },
      y: {
        grid: { color: CHART_GRID_COLOR },
        ticks: {
          color: CHART_TICK_COLOR,
          font: { size: 11 },
        },
        border: { color: CHART_GRID_COLOR },
      },
    },
  };

  const rankOptions = useMemo(
    () => [
      { value: ALL_RANK_FILTER, label: "All" },
      ...(data?.ranks ?? []).map((rank) => ({
        value: String(rank.id),
        label: <BeltChipLabel belt={rank.belt} name={rank.name} />,
      })),
      ...(hasUnranked ? [{ value: UNRANKED_FILTER, label: "Unranked" }] : []),
    ],
    [data?.ranks, hasUnranked]
  );

  const chartHeight = Math.max(120, filtered.length * 36);

  if (isLoading) {
    return (
      <ChartRoot>
        <Skeleton width="40%" height={20} sx={SKELETON_SX} />
        <Skeleton
          width="100%"
          height={chartHeight}
          sx={{ ...SKELETON_SX, mt: 2 }}
        />
      </ChartRoot>
    );
  }

  return (
    <ChartRoot
      sx={{ opacity: isFetching ? 0.6 : 1, transition: "opacity 150ms" }}
    >
      <ChartHeader sx={{ flexWrap: "wrap", rowGap: { xs: 1.5, sm: 0 } }}>
        <ChartTitle variant="caption">
          Students — Attendance Overview
        </ChartTitle>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <StudentCountBadge>
            {filtered.length} student{filtered.length !== 1 ? "s" : ""}
          </StudentCountBadge>
          {/* Desktop: inline with badge */}
          {isTodayTrainingDay && (
            <Button
              size="small"
              variant="contained"
              onClick={() => setTrainingModalOpen(true)}
              sx={{
                ...trainingDayBtnSx,
                display: { xs: "none", sm: "inline-flex" },
              }}
            >
              Training Day
            </Button>
          )}
        </Box>
        {/* Mobile: full-width row below title + badge */}
        {isTodayTrainingDay && (
          <Button
            size="small"
            variant="contained"
            onClick={() => setTrainingModalOpen(true)}
            sx={{
              ...trainingDayBtnSx,
              display: { xs: "flex", sm: "none" },
              width: "100%",
              py: 0.75,
              fontSize: "0.75rem",
            }}
          >
            Training Day
          </Button>
        )}
      </ChartHeader>

      {isTodayTrainingDay && (
        <TrainingDayModal
          open={trainingModalOpen}
          date={todayStr}
          onClose={() => setTrainingModalOpen(false)}
        />
      )}

      {/* Period filter */}
      <ChipFilterRow
        options={PERIOD_OPTIONS}
        value={period}
        onChange={setPeriod}
      />

      <Divider sx={{ borderColor: BORDER_COLOR, mb: 2 }} />

      {/* Rank filter */}
      <ChipFilterRow
        options={rankOptions}
        value={rankFilter}
        onChange={setRankFilter}
      />

      {filtered.length > 0 && (
        <div style={{ height: chartHeight }}>
          <Bar
            data={{
              labels: chartData.labels,
              datasets: [
                {
                  label: "Attended sessions",
                  data: chartData.values,
                  backgroundColor: chartData.colors,
                  borderRadius: 4,
                  borderSkipped: false,
                  barPercentage: 0.65,
                  categoryPercentage: 0.85,
                },
              ],
            }}
            options={options}
          />
        </div>
      )}
    </ChartRoot>
  );
};

export default DashboardStudentChart;
