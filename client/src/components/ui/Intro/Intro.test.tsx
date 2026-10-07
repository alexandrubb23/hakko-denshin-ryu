import { act, fireEvent, renderHook, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import renderUi from "@test/renderUi";
import { messages } from "../../../i18n/messages";

import Intro from "./Intro";
import useIntroTimeline, {
  EXIT_HANDOFF,
  INTRO_WORDS,
  type IntroBeat,
  introTimeline,
  type IntroWords,
  SKIP_SHOWN_AT,
} from "./useIntroTimeline";

// The intro times itself by the words it shows, here in English
const textOf = (words: IntroWords) => messages.en[`intro.${words}`];
const INTRO_DURATION = introTimeline(textOf).duration;

const skipButton = () => screen.getByRole("button", { name: "Skip intro" });

describe("Intro", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("ends on its own once it has played out", () => {
    const onEnd = vi.fn();
    renderUi(<Intro onEnd={onEnd} />);

    act(() => vi.advanceTimersByTime(INTRO_DURATION - 1));
    expect(onEnd).not.toHaveBeenCalled();

    act(() => vi.advanceTimersByTime(1));
    expect(onEnd).toHaveBeenCalledOnce();
  });

  it("keeps the skip button out of the tab order until it shows", () => {
    renderUi(<Intro onEnd={vi.fn()} />);
    expect(skipButton()).toHaveAttribute("tabindex", "-1");

    act(() => vi.advanceTimersByTime(SKIP_SHOWN_AT));
    expect(skipButton()).toHaveAttribute("tabindex", "0");
  });

  it("skips to the end from the skip button", () => {
    const onEnd = vi.fn();
    renderUi(<Intro onEnd={onEnd} />);

    act(() => vi.advanceTimersByTime(SKIP_SHOWN_AT));
    fireEvent.click(skipButton());
    act(() => vi.advanceTimersByTime(EXIT_HANDOFF));
    expect(onEnd).toHaveBeenCalledOnce();

    // The rest of the timeline no longer runs
    act(() => vi.advanceTimersByTime(INTRO_DURATION));
    expect(onEnd).toHaveBeenCalledOnce();
  });

  it("skips on Escape, ending only once however often it's pressed", () => {
    const onEnd = vi.fn();
    renderUi(<Intro onEnd={onEnd} />);

    fireEvent.keyDown(window, { key: "Escape" });
    act(() => vi.advanceTimersByTime(EXIT_HANDOFF / 2));
    // A second press doesn't put the end off
    fireEvent.keyDown(window, { key: "Escape" });
    act(() => vi.advanceTimersByTime(EXIT_HANDOFF / 2));
    expect(onEnd).toHaveBeenCalledOnce();

    fireEvent.keyDown(window, { key: "Escape" });
    act(() => vi.advanceTimersByTime(EXIT_HANDOFF));
    expect(onEnd).toHaveBeenCalledOnce();
  });

  it("opens on the quote, then shows each line in turn, then the title", () => {
    const { result } = renderHook(() => useIntroTimeline(vi.fn(), textOf));
    const seen: IntroBeat[] = [];
    for (let t = 0; t < INTRO_DURATION; t += 100) {
      act(() => vi.advanceTimersByTime(100));
      const { beat } = result.current;
      if (beat !== "none" && beat !== seen.at(-1)) seen.push(beat);
    }
    expect(seen).toEqual([...INTRO_WORDS, "title"]);
  });

  it("shows its lines in the visitor's language", () => {
    renderUi(<Intro onEnd={vi.fn()} />);
    expect(
      screen.getByText("Every path begins with the first step")
    ).toBeInTheDocument();
  });
});
