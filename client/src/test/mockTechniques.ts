import { vi } from "vitest";

import { useTechniques } from "@features/public/techniques/useTechniques";

type TechniquesState = ReturnType<typeof useTechniques>;

/**
 * Sets what the mocked `useTechniques` returns. The test file must still
 * `vi.mock("@features/public/techniques/useTechniques")` itself (it is hoisted).
 */
export const mockTechniquesState = (state: Partial<TechniquesState>) =>
  vi.mocked(useTechniques).mockReturnValue({
    data: undefined,
    isLoading: false,
    isError: false,
    ...state,
  } as unknown as TechniquesState);
