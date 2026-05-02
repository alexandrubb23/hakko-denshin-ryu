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
import { useMyEvents } from "@hooks/useMyEvents";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import { BORDER_COLOR, PURPLE, SKELETON_SX } from "@style/tokens";

import {
  ChartHeader,
  ChartRoot,
  ChartTitle,
  CountBadge,
} from "./DashboardChart.shared.style";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

const ATTENDED_COLOR = PURPLE;
const NOT_ATTENDED_COLOR = "rgba(211, 47, 47, 0.8)";
const UNMARKED_COLOR = "rgba(171, 150, 255, 0.18)";

const GRID_COLOR = "rgba(171, 150, 255, 0.08)";
const TICK_COLOR = "rgba(255, 255, 255, 0.45)";

function eventColor(event: StudentEvent): string {
  if (event.attended === true) return ATTENDED_COLOR;
  if (event.attended === false) return NOT_ATTENDED_COLOR;
  return UNMARKED_COLOR;
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
        max: 1,
        grid: { color: GRID_COLOR },
        ticks: { display: false },
        border: { color: GRID_COLOR },
      },
      y: {
        grid: { color: GRID_COLOR },
        ticks: { color: TICK_COLOR, font: { size: 11 } },
        border: { color: GRID_COLOR },
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
          sx={{ color: "rgba(255,255,255,0.35)", textAlign: "center", py: 4 }}
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
