import { useTechniques } from "@features/public/techniques/useTechniques";

import { mockQueryState } from "./mockQuery";

/**
 * Sets what the mocked `useTechniques` returns. The test file must still
 * `vi.mock("@features/public/techniques/useTechniques")` itself (it is hoisted).
 */
export const mockTechniquesState = (
  state: Partial<ReturnType<typeof useTechniques>>
) => mockQueryState(useTechniques, state);
