import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  Tooltip,
} from "chart.js";
import { useMemo } from "react";
import { Bar } from "react-chartjs-2";

import type { StudentEvent } from "@api/events";
import { useMyEvents } from "@features/student/events/hooks/useMyEvents";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import {
  CHART_GRID_COLOR,
  CHART_TICK_COLOR,
  CHART_TOOLTIP_BG,
  CHART_TOOLTIP_TEXT,
} from "@style/chart.tokens";
import { ERROR_DARK_ALPHA_80 } from "@style/status.tokens";
import {
  BORDER_COLOR,
  PURPLE,
  PURPLE_ALPHA_18,
  SKELETON_SX,
  TEXT_SUBTLE,
} from "@style/tokens";

import {
  ChartHeader,
  ChartRoot,
  ChartTitle,
  CountBadge,
} from "@features/admin/dashboard/components/DashboardChart.shared.style";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

const ATTENDED_COLOR = PURPLE;

function eventColor(event: StudentEvent): string {
  if (event.attended === true) return ATTENDED_COLOR;
  if (event.attended === false) return ERROR_DARK_ALPHA_80;
  return PURPLE_ALPHA_18;
}

const MyEventChart = () => {
  const { data: events, isLoading } = useMyEvents();

  const chartData = useMemo(() => {
    const items = events ?? [];
    return {
      labels: items.map((e) => e.name),
      values: items.map(() => 1),
      colors: items.map(eventColor),
    };
  }, [events]);

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
            const event = (events ?? [])[ctx.dataIndex];
            if (!event) return "";
            const status =
              event.attended === true
                ? "Attended"
                : event.attended === false
                  ? "Not attended"
                  : "Unmarked";
            return ` ${status} · ${event.type}`;
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
        max: 1,
        grid: { color: CHART_GRID_COLOR },
        ticks: { display: false },
        border: { color: CHART_GRID_COLOR },
      },
      y: {
        grid: { color: CHART_GRID_COLOR },
        ticks: { color: CHART_TICK_COLOR, font: { size: 11 } },
        border: { color: CHART_GRID_COLOR },
      },
    },
  };

  const chartHeight = Math.max(80, (events?.length ?? 0) * 36);
  const attendedCount = events?.filter((e) => e.attended === true).length ?? 0;

  if (isLoading) {
    return (
      <ChartRoot>
        <Skeleton width="50%" height={20} sx={SKELETON_SX} />
        <Skeleton width="100%" height={100} sx={{ ...SKELETON_SX, mt: 2 }} />
      </ChartRoot>
    );
  }

  if (!events?.length) return null;

  return (
    <ChartRoot>
      <ChartHeader>
        <ChartTitle variant="caption">Participation Overview</ChartTitle>
        <CountBadge>
          {attendedCount} / {events.length} attended
        </CountBadge>
      </ChartHeader>

      {events.length === 0 ? (
        <Typography
          variant="body2"
          sx={{ color: TEXT_SUBTLE, textAlign: "center", py: 4 }}
        >
          No events yet.
        </Typography>
      ) : (
        <div style={{ height: chartHeight }}>
          <Bar
            data={{
              labels: chartData.labels,
              datasets: [
                {
                  label: "Event",
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

export default MyEventChart;
