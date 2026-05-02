import { ApiRoutes } from "@lib/routes";

import { Http } from "./http";
import type { StudentRankEntry } from "./students";
import type { AttendanceRecord } from "./attendance";
import type { StudentEvent } from "./events";

export interface MeUser {
  id: string;
  name: string;
  email: string;
  role: string;
  image: string | null;
  emailVerified: boolean;
  createdAt: string;
}

class MeApi extends Http {
  async getMe(): Promise<MeUser> {
    const { data } = await this.http.get(ApiRoutes.me);
    return data.user as MeUser;
  }

  async getMyRanks(): Promise<StudentRankEntry[]> {
    const { data } = await this.http.get(ApiRoutes.meRanks);
    return data.ranks;
  }

  async getMyAttendance(
    year: number,
    month?: number
  ): Promise<{ records: AttendanceRecord[] }> {
    const { data } = await this.http.get(ApiRoutes.meAttendance, {
      params: month !== undefined ? { year, month } : { year },
    });
    return data;
  }

  async getMyEvents(): Promise<StudentEvent[]> {
    const { data } = await this.http.get(ApiRoutes.meEvents);
    return data.events;
  }

  async uploadMyImage(file: File): Promise<string> {
    return this.uploadImage(ApiRoutes.meImage, file);
  }
}

export const meApi = new MeApi();
