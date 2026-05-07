import { ApiRoutes } from "@lib/routes";

import { Http } from "./http";

export interface VerifyTokenResponse {
  name: string;
  email: string;
}

class InviteApi extends Http {
  async verifyToken(token: string): Promise<VerifyTokenResponse> {
    const { data } = await this.http.get(
      `${ApiRoutes.inviteVerifyToken}?token=${encodeURIComponent(token)}`,
    );
    return data;
  }

  async setPassword(payload: {
    token: string;
    password: string;
  }): Promise<void> {
    await this.http.post(ApiRoutes.inviteSetPassword, payload);
  }
}

export const inviteApi = new InviteApi();
