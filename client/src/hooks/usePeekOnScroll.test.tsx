import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import usePeekOnScroll from "./usePeekOnScroll";

describe("usePeekOnScroll", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  const scroll = () =>
    act(() => void window.dispatchEvent(new Event("scroll")));

  it("stays hidden until the page scrolls", () => {
    const { result } = renderHook(() => usePeekOnScroll(1000));
    expect(result.current.peeking).toBe(false);

    scroll();
    expect(result.current.peeking).toBe(true);
  });

  it("hides once the page has been still for the duration", () => {
    const { result } = renderHook(() => usePeekOnScroll(1000));
    scroll();

    act(() => void vi.advanceTimersByTime(600));
    scroll();
    act(() => void vi.advanceTimersByTime(600));
    // Each scroll restarts the wait
    expect(result.current.peeking).toBe(true);

    act(() => void vi.advanceTimersByTime(400));
    expect(result.current.peeking).toBe(false);
  });

  it("peeks by hand too", () => {
    const { result } = renderHook(() => usePeekOnScroll(1000));

    act(() => result.current.peek());
    expect(result.current.peeking).toBe(true);

    act(() => void vi.advanceTimersByTime(1000));
    expect(result.current.peeking).toBe(false);
  });
});
