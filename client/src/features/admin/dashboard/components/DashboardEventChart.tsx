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
import { useDashboardEvents } from "@features/admin/dashboard/hooks/useDashboardEvents";
import Divider from "@mui/material/Divider";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import {
  CHART_GRID_COLOR,
  CHART_TICK_COLOR,
  CHART_TOOLTIP_BG,
  CHART_TOOLTIP_TEXT,
} from "@style/chart.tokens";
import {
  EVENT_CAMP_COLOR,
  EVENT_DEMO_COLOR,
  EVENT_OTHER_COLOR,
  EVENT_SEMINAR_COLOR,
} from "@style/events.tokens";
import {
  ERROR,
  ERROR_ALPHA_12,
  ERROR_ALPHA_40,
  SUCCESS,
  SUCCESS_ALPHA_12,
  SUCCESS_ALPHA_40,
} from "@style/status.tokens";
import {
  BORDER_COLOR,
  PURPLE,
  PURPLE_ALPHA_25,
  SKELETON_SX,
  TEXT_MUTED,
  TEXT_SUBTLE,
  WHITE_ALPHA_10,
  WHITE_ALPHA_25,
} from "@style/tokens";

import ChipFilterRow, { defaultChipSx } from "@components/shared/ChipFilterRow";
import {
  ChartHeader,
  ChartRoot,
  ChartTitle,
  CountBadge,
} from "./DashboardEventChart.style";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

const EVENT_TYPE_COLORS: Record<string, string> = {
  seminar: EVENT_SEMINAR_COLOR,
  demo: EVENT_DEMO_COLOR,
  camp: EVENT_CAMP_COLOR,
  other: EVENT_OTHER_COLOR,
};

const EVENT_STATUS_COLORS: Record<
  string,
  { border: string; text: string; activeBg: string }
> = {
  draft: {
    border: WHITE_ALPHA_25,
    text: TEXT_MUTED,
    activeBg: WHITE_ALPHA_10,
  },
  published: {
    border: SUCCESS_ALPHA_40,
    text: SUCCESS,
    activeBg: SUCCESS_ALPHA_12,
  },
  cancelled: {
    border: ERROR_ALPHA_40,
    text: ERROR,
    activeBg: ERROR_ALPHA_12,
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

const statusChipSx = (
  value: EventStatusFilter,
  active: boolean,
  activeStatus: EventStatusFilter
) => {
  if (value === "all") return defaultChipSx(active);
  const colors = EVENT_STATUS_COLORS[value];
  if (!colors) return defaultChipSx(active);
  const isActive = active && activeStatus !== "all";
  return {
    borderColor: isActive ? colors.text : colors.border,
    color: isActive ? colors.text : TEXT_MUTED,
    backgroundColor: isActive ? colors.activeBg : "transparent",
    "&:hover": { borderColor: colors.text },
  };
};

function eventTypeColor(type: string): string {
  return EVENT_TYPE_COLORS[type] ?? PURPLE_ALPHA_25;
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

  const yearOptions = useMemo(
    () => [
      { value: "all" as const, label: "All Years" },
      ...availableYears.map((y) => ({ value: y, label: String(y) })),
    ],
    [availableYears]
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
      <ChipFilterRow options={TYPE_OPTIONS} value={type} onChange={setType} />

      <Divider sx={{ borderColor: BORDER_COLOR, mb: 2 }} />

      {/* Status filter */}
      <ChipFilterRow
        options={STATUS_OPTIONS}
        value={status}
        onChange={setStatus}
        getChipSx={(v, active) => statusChipSx(v, active, status)}
      />

      <Divider sx={{ borderColor: BORDER_COLOR, mb: 2 }} />

      {/* Year filter */}
      <ChipFilterRow options={yearOptions} value={year} onChange={setYear} />

      {filtered.length === 0 ? (
        <Typography
          variant="body2"
          sx={{ color: TEXT_SUBTLE, textAlign: "center", py: 4 }}
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
