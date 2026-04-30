import { ApiRoutes } from "@lib/routes";

import { Http } from "./http";

export interface Rank {
  id: number;
  name: string;
  belt: string;
  order: number;
}

class RanksApi extends Http {

  async fetchRanks(): Promise<Rank[]> {
    const { data } = await this.http.get(ApiRoutes.adminRanks);
    return data.ranks;
  }
}

export const ranksApi = new RanksApi();
