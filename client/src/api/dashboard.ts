import { ApiRoutes } from "@lib/routes";

import { Http } from "./http";

export type AttendancePeriod = "all" | "day" | "week" | "month" | "year";

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

class DashboardApi extends Http {
  async fetchStudentStats(
    period: AttendancePeriod = "all"
  ): Promise<StudentStats> {
    const { data } = await this.http.get(ApiRoutes.adminDashboardStudents, {
      params: { period },
    });
    return data;
  }
}

export const dashboardApi = new DashboardApi();
