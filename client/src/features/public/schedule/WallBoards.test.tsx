import { screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { getSessionsByDay } from "@constants/trainingSchedule";
import renderUi from "@test/renderUi";

import WallBoards from "./WallBoards";

const getBoard = (name: string) =>
  within(
    screen
      .getByRole("heading", { level: 3, name, hidden: true })
      .closest("article")!
  );

// The boards only show on wide screens, so query hidden elements too
describe("WallBoards", () => {
  it("writes one day on each board", () => {
    renderUi(<WallBoards days={getSessionsByDay()} />);
    expect(screen.getAllByRole("article", { hidden: true })).toHaveLength(3);
  });

  it("lists Tuesday's sessions with their times and groups", () => {
    renderUi(<WallBoards days={getSessionsByDay()} />);
    const tuesday = getBoard("Tuesday");
    expect(tuesday.getAllByRole("listitem", { hidden: true })).toHaveLength(2);
    expect(tuesday.getByText("18:15")).toBeInTheDocument();
    expect(tuesday.getByText("21:00")).toBeInTheDocument();
    expect(tuesday.getByText("Kids")).toBeInTheDocument();
    expect(tuesday.getByText("Seniors")).toBeInTheDocument();
  });

  it("lists only the seniors session on Thursday", () => {
    renderUi(<WallBoards days={getSessionsByDay()} />);
    const thursday = getBoard("Thursday");
    expect(thursday.getAllByRole("listitem", { hidden: true })).toHaveLength(1);
    expect(thursday.queryByText("Kids")).not.toBeInTheDocument();
  });

  describe("today's lantern", () => {
    afterEach(() => vi.useRealTimers());

    it("lights only the lantern over today's board", () => {
      vi.useFakeTimers({ now: new Date(2026, 9, 8), toFake: ["Date"] });
      renderUi(<WallBoards days={getSessionsByDay()} />);
      const thursday = getBoard("Thursday");
      expect(
        thursday.getByRole("img", { name: "Training today", hidden: true })
      ).toBeInTheDocument();
      expect(
        screen.getAllByRole("img", { name: "Training today", hidden: true })
      ).toHaveLength(1);
      expect(
        screen
          .getAllByRole("article", { hidden: true })
          .filter((board) => board.getAttribute("aria-current") === "date")
      ).toHaveLength(1);
    });

    it("hangs an unlit lantern on every board on a day without training", () => {
      vi.useFakeTimers({ now: new Date(2026, 9, 5), toFake: ["Date"] });
      renderUi(<WallBoards days={getSessionsByDay()} />);
      for (const day of ["Tuesday", "Thursday", "Saturday"]) {
        expect(
          getBoard(day).getAllByRole("presentation", { hidden: true })
        ).not.toHaveLength(0);
      }
      expect(
        screen.queryByRole("img", { name: "Training today", hidden: true })
      ).not.toBeInTheDocument();
    });
  });
});
