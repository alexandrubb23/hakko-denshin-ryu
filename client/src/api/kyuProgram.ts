import { ApiRoutes } from "@lib/routes";
import { Http } from "./http";

export interface KyuTechnique {
  number: number;
  name: string;
  isKihon: boolean;
}

export interface KyuGroup {
  id: string;
  name: string;
  techniques: KyuTechnique[];
}

export interface KyuLevel {
  id: string;
  name: string;
  shortName: string;
  belt: string;
  groups: KyuGroup[];
}

class KyuProgramApi extends Http {
  async fetchKyuProgram(): Promise<KyuLevel[]> {
    const { data } = await this.http.get(ApiRoutes.kyuProgram);
    return data.kyuProgram;
  }
}

export const kyuProgramApi = new KyuProgramApi();
