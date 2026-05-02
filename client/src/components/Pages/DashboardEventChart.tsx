import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  Tooltip,
} from "chart.js";
import { useMemo, useState } from "react";
import { Bar } from "react-chartjs-2";

import {
  type DashboardEvent,
  type EventStatusFilter,
  type EventTypeFilter,
} from "@api/dashboard";
import { useDashboardEvents } from "@hooks/useDashboardEvents";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import { BORDER_COLOR, PURPLE, SKELETON_SX } from "@style/tokens";

import {
  ChartHeader,
  ChartRoot,
  ChartTitle,
  CountBadge,
  FilterRow,
} from "./DashboardEventChart.style";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

const GRID_COLOR = "rgba(171, 150, 255, 0.08)";
const TICK_COLOR = "rgba(255, 255, 255, 0.45)";

const EVENT_TYPE_COLORS: Record<string, string> = {
  seminar: "#1565c0",
  demo: "#ef6c00",
  camp: "#388e3c",
  other: "rgba(171, 150, 255, 0.55)",
};

const EVENT_STATUS_COLORS: Record<
  string,
  { border: string; text: string; activeBg: string }
> = {
  draft: {
    border: "rgba(255,255,255,0.25)",
    text: "rgba(255,255,255,0.5)",
    activeBg: "rgba(255,255,255,0.1)",
  },
  published: {
    border: "rgba(76,175,80,0.4)",
    text: "#4caf50",
    activeBg: "rgba(76,175,80,0.12)",
  },
  cancelled: {
    border: "rgba(244,67,54,0.4)",
    text: "#f44336",
    activeBg: "rgba(244,67,54,0.12)",
  },
};

const TYPE_OPTIONS: { value: EventTypeFilter; label: string }[] = [
  { value: "all", label: "All Types" },
  { value: "seminar", label: "Seminar" },
  { value: "demo", label: "Demo" },
  { value: "camp", label: "Camp" },
  { value: "other", label: "Other" },
];

const STATUS_OPTIONS: { value: EventStatusFilter; label: string }[] = [
  { value: "all", label: "All Statuses" },
  { value: "draft", label: "Draft" },
  { value: "published", label: "Published" },
  { value: "cancelled", label: "Cancelled" },
];

const chipSx = (active: boolean) => ({
  borderColor: active ? PURPLE : BORDER_COLOR,
  color: active ? PURPLE : "rgba(255,255,255,0.6)",
  backgroundColor: active ? "rgba(171,150,255,0.12)" : "transparent",
  "&:hover": { borderColor: PURPLE },
});

const statusChipSx = (
  value: EventStatusFilter,
  active: boolean,
  activeStatus: EventStatusFilter
) => {
  if (value === "all") return chipSx(active);
  const colors = EVENT_STATUS_COLORS[value];
  if (!colors) return chipSx(active);
  const isActive = active && activeStatus !== "all";
  return {
    borderColor: isActive ? colors.text : colors.border,
    color: isActive ? colors.text : "rgba(255,255,255,0.5)",
    backgroundColor: isActive ? colors.activeBg : "transparent",
    "&:hover": { borderColor: colors.text },
  };
};

function eventTypeColor(type: string): string {
  return EVENT_TYPE_COLORS[type] ?? "rgba(171, 150, 255, 0.25)";
}

function filterEvents(
  events: DashboardEvent[],
  type: EventTypeFilter,
  status: EventStatusFilter
): DashboardEvent[] {
  return events.filter((e) => {
    const typeMatch = type === "all" || e.type === type;
    const statusMatch = status === "all" || e.status === status;
    return typeMatch && statusMatch;
  });
}

const DashboardEventChart = () => {
  const [type, setType] = useState<EventTypeFilter>("all");
  const [status, setStatus] = useState<EventStatusFilter>("all");
  const [year, setYear] = useState<number | "all">("all");

  const { data, isLoading, isFetching } = useDashboardEvents(
    type,
    status,
    year
  );

  const filtered = useMemo(
    () => filterEvents(data?.events ?? [], type, status),
    [data, type, status]
  );

  const chartData = useMemo(() => {
    const labels = filtered.map((e) => e.name);
    const values = filtered.map((e) => e.attendedCount);
    const colors = filtered.map((e) => eventTypeColor(e.type));
    return { labels, values, colors };
  }, [filtered]);

  const maxX = useMemo(
    () => Math.max(...(chartData.values.length ? chartData.values : [0]), 4),
    [chartData.values]
  );

  const availableYears = data?.availableYears ?? [];

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
            const event = filtered[ctx.dataIndex];
            if (!event) return [];
            return [
              ` ${event.attendedCount} attended`,
              ` ${event.registeredCount} registered`,
              ` Type: ${event.type}`,
              ` Status: ${event.status}`,
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
        <Skeleton width="100%" height={120} sx={{ ...SKELETON_SX, mt: 2 }} />
      </ChartRoot>
    );
  }

  return (
    <ChartRoot
      sx={{ opacity: isFetching ? 0.6 : 1, transition: "opacity 150ms" }}
    >
      <ChartHeader>
        <ChartTitle variant="caption">
          Events — Participation Overview
        </ChartTitle>
        <CountBadge>
          {filtered.length} event{filtered.length !== 1 ? "s" : ""}
        </CountBadge>
      </ChartHeader>

      {/* Type filter */}
      <FilterRow>
        {TYPE_OPTIONS.map(({ value, label }) => (
          <Chip
            key={value}
            label={label}
            size="small"
            onClick={() => setType(value)}
            sx={chipSx(type === value)}
            variant="outlined"
          />
        ))}
      </FilterRow>

      <Divider sx={{ borderColor: BORDER_COLOR, mb: 2 }} />

      {/* Status filter */}
      <FilterRow>
        {STATUS_OPTIONS.map(({ value, label }) => (
          <Chip
            key={value}
            label={label}
            size="small"
            onClick={() => setStatus(value)}
            sx={statusChipSx(value, status === value, status)}
            variant="outlined"
          />
        ))}
      </FilterRow>

      <Divider sx={{ borderColor: BORDER_COLOR, mb: 2 }} />

      {/* Year filter */}
      <FilterRow>
        <Chip
          label="All Years"
          size="small"
          onClick={() => setYear("all")}
          sx={chipSx(year === "all")}
          variant="outlined"
        />
        {availableYears.map((y) => (
          <Chip
            key={y}
            label={String(y)}
            size="small"
            onClick={() => setYear(y)}
            sx={chipSx(year === y)}
            variant="outlined"
          />
        ))}
      </FilterRow>

      {filtered.length === 0 ? (
        <Typography
          variant="body2"
          sx={{ color: "rgba(255,255,255,0.35)", textAlign: "center", py: 4 }}
        >
          No events match the selected filters.
        </Typography>
      ) : (
        <div style={{ height: chartHeight }}>
          <Bar
            data={{
              labels: chartData.labels,
              datasets: [
                {
                  label: "Attended",
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

export default DashboardEventChart;
