import { ApiRoutes } from "@lib/routes";
import { Http } from "./http";

export interface Technique {
  number: number;
  name: string;
}

export interface BodyPositionGroup {
  id: string;
  name: string;
  techniques: Technique[];
}

export interface Suite {
  id: string;
  name: string;
  description: string;
  groups: BodyPositionGroup[];
}

class TechniquesApi extends Http {
  async fetchTechniques(): Promise<Suite[]> {
    const { data } = await this.http.get(ApiRoutes.techniques);
    return data.techniques;
  }
}

export const techniquesApi = new TechniquesApi();
