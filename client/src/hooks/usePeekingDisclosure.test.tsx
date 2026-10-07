import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import usePeekingDisclosure from "./usePeekingDisclosure";

describe("usePeekingDisclosure", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  const pressEscape = () => {
    const event = new KeyboardEvent("keydown", {
      key: "Escape",
      cancelable: true,
    });
    act(() => void window.dispatchEvent(event));
    return event;
  };

  it("toggles open and closed", () => {
    const { result } = renderHook(() => usePeekingDisclosure());

    act(() => result.current.toggle());
    expect(result.current.open).toBe(true);

    act(() => result.current.toggle());
    expect(result.current.open).toBe(false);
  });

  it("leaves the trigger up a moment after closing", () => {
    const { result } = renderHook(() => usePeekingDisclosure());

    act(() => result.current.toggle());
    act(() => result.current.close());
    expect(result.current.peeking).toBe(true);
  });

  it("dismisses only while open", () => {
    const { result } = renderHook(() => usePeekingDisclosure());

    act(() => result.current.dismiss());
    // Closed already: nothing to close, so nothing peeks
    expect(result.current.peeking).toBe(false);

    act(() => result.current.toggle());
    act(() => result.current.dismiss());
    expect(result.current.open).toBe(false);
  });

  it("ignores Escape while closed", () => {
    renderHook(() => usePeekingDisclosure());
    expect(pressEscape().defaultPrevented).toBe(false);
  });

  it("closes on Escape and gives the trigger its focus back", () => {
    const { result } = renderHook(() => usePeekingDisclosure());
    const trigger = document.createElement("button");
    document.body.append(trigger);
    result.current.triggerRef.current = trigger;

    act(() => result.current.toggle());
    expect(pressEscape().defaultPrevented).toBe(true);
    expect(result.current.open).toBe(false);
    expect(document.activeElement).toBe(trigger);

    trigger.remove();
  });

  it("lets only the first open panel take the Escape", () => {
    const first = renderHook(() => usePeekingDisclosure());
    const second = renderHook(() => usePeekingDisclosure());

    act(() => first.result.current.toggle());
    act(() => second.result.current.toggle());
    pressEscape();

    expect([first.result.current.open, second.result.current.open]).toEqual([
      false,
      true,
    ]);
  });
});
