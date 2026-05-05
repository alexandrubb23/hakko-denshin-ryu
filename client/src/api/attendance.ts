import { ApiRoutes } from "@lib/routes";

import { Http } from "./http";

export interface AttendanceRecord {
  id: string;
  date: string; // ISO date string "YYYY-MM-DD"
  attended: boolean;
}

class AttendanceApi extends Http {
  async getAttendanceByMonth(
    studentId: string,
    year: number,
    month: number
  ): Promise<{ records: AttendanceRecord[] }> {
    const { data } = await this.http.get(
      ApiRoutes.adminStudentAttendance(studentId),
      {
        params: { year, month },
      }
    );
    return data;
  }

  async getAttendanceByYear(
    studentId: string,
    year: number
  ): Promise<{ records: AttendanceRecord[] }> {
    const { data } = await this.http.get(
      ApiRoutes.adminStudentAttendance(studentId),
      {
        params: { year },
      }
    );
    return data;
  }

  async upsertAttendance(
    studentId: string,
    date: string,
    attended: boolean
  ): Promise<{ record: AttendanceRecord }> {
    const { data } = await this.http.post(
      ApiRoutes.adminStudentAttendance(studentId),
      {
        date,
        attended,
      }
    );
    return data;
  }

  async getTrainingDayAttendance(
    date: string
  ): Promise<{ records: { userId: string; attended: boolean }[] }> {
    const { data } = await this.http.get(ApiRoutes.adminTrainingDayAttendance, {
      params: { date },
    });
    return data;
  }
}

export const attendanceApi = new AttendanceApi();
