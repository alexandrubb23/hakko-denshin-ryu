import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import useIntro from "./useIntro";

describe("useIntro", () => {
  beforeEach(() => {
    // happy-dom reports itself as an automated browser
    vi.spyOn(navigator, "webdriver", "get").mockReturnValue(false);
    sessionStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    window.history.replaceState(null, "", "/");
  });

  const renderIntro = () => renderHook(() => useIntro());

  it("plays on a session's first visit until it's finished", () => {
    const { result } = renderIntro();
    expect(result.current).toMatchObject({ play: true, done: false });

    act(() => result.current.finish());
    expect(result.current).toMatchObject({ play: true, done: true });
  });

  it("doesn't play again once the session has been welcomed", () => {
    const first = renderIntro();
    act(() => first.result.current.finish());

    const { result } = renderIntro();
    expect(result.current).toMatchObject({ play: false, done: true });
  });

  it("plays again if the visit ended before it was over", () => {
    renderIntro().unmount();

    const { result } = renderIntro();
    expect(result.current.play).toBe(true);
  });

  it("doesn't play in automated browsers", () => {
    vi.spyOn(navigator, "webdriver", "get").mockReturnValue(true);
    const { result } = renderIntro();
    expect(result.current).toMatchObject({ play: false, done: true });
  });

  it("plays again whenever asked for with ?intro", () => {
    const first = renderHook(() => useIntro());
    act(() => first.result.current.finish());

    window.history.replaceState(null, "", "/?intro");
    const { result } = renderIntro();
    expect(result.current.play).toBe(true);
  });
});
