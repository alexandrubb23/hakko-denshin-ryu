import { vi } from "vitest";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type QueryHook = (...args: any[]) => unknown;

/**
 * Sets what a mocked query hook returns: no data, neither loading nor failed,
 * then `state`. The test file must still `vi.mock` the hook's module itself
 * (it is hoisted).
 */
export const mockQueryState = <H extends QueryHook>(
  hook: H,
  state: Partial<ReturnType<H>>
) =>
  vi.mocked(hook).mockReturnValue({
    data: undefined,
    isLoading: false,
    isError: false,
    ...state,
  } as unknown as ReturnType<H>);
