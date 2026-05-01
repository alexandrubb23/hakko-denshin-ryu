import { ApiRoutes } from "@lib/routes";

import { Http } from "./http";

export interface MeUser {
  id: string;
  name: string;
  email: string;
  role: string;
  image: string | null;
  emailVerified: boolean;
}

class MeApi extends Http {
  async getMe(): Promise<MeUser> {
    const { data } = await this.http.get(ApiRoutes.me);
    return data.user as MeUser;
  }

  async uploadMyImage(file: File): Promise<string> {
    return this.uploadImage(ApiRoutes.meImage, file);
  }
}

export const meApi = new MeApi();
