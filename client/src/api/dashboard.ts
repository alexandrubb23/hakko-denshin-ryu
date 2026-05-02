import { ApiRoutes } from "@lib/routes";

import { Http } from "./http";

export type AttendancePeriod = "all" | "day" | "week" | "month" | "year";
export type EventTypeFilter = "all" | "seminar" | "demo" | "camp" | "other";
export type EventStatusFilter = "all" | "draft" | "published" | "cancelled";

export interface DashboardRank {
  id: number;
  name: string;
  belt: string;
  order: number;
}

export interface DashboardStudent {
  id: string;
  name: string;
  rankId: number | null;
  rankName: string | null;
  belt: string | null;
  attendanceCount: number;
}

export interface StudentStats {
  total: number;
  students: DashboardStudent[];
  ranks: DashboardRank[];
}

export interface DashboardEvent {
  id: string;
  name: string;
  type: string;
  status: string;
  startDate: string;
  registeredCount: number;
  attendedCount: number;
}

export interface EventStats {
  total: number;
  events: DashboardEvent[];
  availableYears: number[];
}

class DashboardApi extends Http {
  async fetchStudentStats(
    period: AttendancePeriod = "all"
  ): Promise<StudentStats> {
    const { data } = await this.http.get(ApiRoutes.adminDashboardStudents, {
      params: { period },
    });
    return data;
  }

  async fetchEventStats(
    type: EventTypeFilter = "all",
    status: EventStatusFilter = "all",
    year: number | "all" = "all"
  ): Promise<EventStats> {
    const { data } = await this.http.get(ApiRoutes.adminDashboardEvents, {
      params: { type, status, year },
    });
    return data;
  }
}

export const dashboardApi = new DashboardApi();
