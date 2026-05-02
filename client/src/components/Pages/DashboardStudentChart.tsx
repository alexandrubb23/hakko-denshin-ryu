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
import { useDashboardStudents } from "@hooks/useDashboardStudents";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Skeleton from "@mui/material/Skeleton";
import { BORDER_COLOR, PURPLE, SKELETON_SX } from "@style/tokens";

import BeltChipLabel from "./BeltChipLabel";
import {
  ChartHeader,
  ChartRoot,
  ChartTitle,
  FilterRow,
  StudentCountBadge,
} from "./DashboardStudentChart.style";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

const GRID_COLOR = "rgba(171, 150, 255, 0.08)";
const TICK_COLOR = "rgba(255, 255, 255, 0.45)";

const BELT_COLORS: Record<string, string> = {
  white: "rgba(255, 255, 255, 0.75)",
  yellow: "#f9a825",
  orange: "#ef6c00",
  green: "#388e3c",
  blue: "#1565c0",
  brown: "#795548",
  black: PURPLE,
};

const UNRANKED_COLOR = "rgba(171, 150, 255, 0.25)";

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
  if (!belt) return UNRANKED_COLOR;
  return BELT_COLORS[belt] ?? UNRANKED_COLOR;
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

const chipSx = (active: boolean) => ({
  borderColor: active ? PURPLE : BORDER_COLOR,
  color: active ? PURPLE : "rgba(255,255,255,0.6)",
  backgroundColor: active ? "rgba(171,150,255,0.12)" : "transparent",
  "&:hover": { borderColor: PURPLE },
});

const DashboardStudentChart = () => {
  const [period, setPeriod] = useState<AttendancePeriod>("all");
  const [rankFilter, setRankFilter] = useState<string>(ALL_RANK_FILTER);

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
        min: 0,
        max: maxX,
        grid: { color: GRID_COLOR },
        ticks: {
          color: TICK_COLOR,
          font: { size: 11 },
          stepSize: 1,
          precision: 0,
        },
        border: { color: GRID_COLOR },
      },
      y: {
        grid: { color: GRID_COLOR },
        ticks: {
          color: TICK_COLOR,
          font: { size: 11 },
        },
        border: { color: GRID_COLOR },
      },
    },
  };

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
      <ChartHeader>
        <ChartTitle variant="caption">
          Students — Attendance Overview
        </ChartTitle>
        <StudentCountBadge>
          {filtered.length} student{filtered.length !== 1 ? "s" : ""}
        </StudentCountBadge>
      </ChartHeader>

      {/* Period filter */}
      <FilterRow>
        {PERIOD_OPTIONS.map(({ value, label }) => (
          <Chip
            key={value}
            label={label}
            size="small"
            onClick={() => setPeriod(value)}
            sx={chipSx(period === value)}
            variant="outlined"
          />
        ))}
      </FilterRow>

      <Divider sx={{ borderColor: BORDER_COLOR, mb: 2 }} />

      {/* Rank filter */}
      <FilterRow>
        <Chip
          label="All"
          size="small"
          onClick={() => setRankFilter(ALL_RANK_FILTER)}
          sx={chipSx(rankFilter === ALL_RANK_FILTER)}
          variant="outlined"
        />
        {(data?.ranks ?? []).map((rank) => (
          <Chip
            key={rank.id}
            label={<BeltChipLabel belt={rank.belt} name={rank.name} />}
            size="small"
            onClick={() => setRankFilter(String(rank.id))}
            sx={chipSx(rankFilter === String(rank.id))}
            variant="outlined"
          />
        ))}
        {hasUnranked && (
          <Chip
            label="Unranked"
            size="small"
            onClick={() => setRankFilter(UNRANKED_FILTER)}
            sx={chipSx(rankFilter === UNRANKED_FILTER)}
            variant="outlined"
          />
        )}
      </FilterRow>

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
