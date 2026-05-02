import { keepPreviousData, useQuery } from "@tanstack/react-query";

import {
  dashboardApi,
  type EventStatusFilter,
  type EventTypeFilter,
} from "@api/dashboard";

export const useDashboardEvents = (
  type: EventTypeFilter = "all",
  status: EventStatusFilter = "all",
  year: number | "all" = "all"
) =>
  useQuery({
    queryKey: ["dashboard", "events", type, status, year],
    queryFn: () => dashboardApi.fetchEventStats(type, status, year),
    placeholderData: keepPreviousData,
  });
