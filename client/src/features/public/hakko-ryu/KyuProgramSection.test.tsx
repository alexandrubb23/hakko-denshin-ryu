import { fireEvent, screen, within } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import type { KyuLevel } from "@api/kyuProgram";
import { useKyuProgram } from "@features/public/kyu-program/useKyuProgram";
import { mockQueryState } from "@test/mockQuery";
import renderUi from "@test/renderUi";

import KyuProgramSection from "./KyuProgramSection";

// ─── Mocks ───────────────────────────────────────────────────────────────────

vi.mock("@features/public/kyu-program/useKyuProgram", () => ({
  useKyuProgram: vi.fn(),
}));

const mockState = (state: Partial<ReturnType<typeof useKyuProgram>>) =>
  mockQueryState(useKyuProgram, state);

// ─── Fixtures ────────────────────────────────────────────────────────────────

const mockLevels: KyuLevel[] = [
  {
    id: "5e-kyu",
    name: "5e KYU 五級",
    shortName: "5th Kyu",
    belt: "yellow",
    groups: [
      {
        id: "5e-suwari",
        name: "SUWARI WAZA 座技",
        techniques: [
          { number: 1, name: "Hakko dori 八光捕", isKihon: true },
          { number: 2, name: "Waki gatame 脇固", isKihon: false },
        ],
      },
      {
        id: "5e-tachi",
        name: "TACHI WAZA 立技",
        techniques: [{ number: 1, name: "Tachi ate 立当", isKihon: true }],
      },
    ],
  },
  {
    id: "1er-kyu",
    name: "1er KYU 一級",
    shortName: "1st Kyu",
    belt: "brown",
    groups: [
      {
        id: "1er-tambo",
        name: "TAMBO-JUTSU 短棒術",
        techniques: [{ number: 1, name: "Furi age 振上", isKihon: true }],
      },
    ],
  },
];

// ─── Tests ───────────────────────────────────────────────────────────────────

describe("KyuProgramSection", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("shows the error message when the program fails to load", () => {
    mockState({ isError: true });
    renderUi(<KyuProgramSection />);

    expect(screen.getByText(/failed to load kyu program/i)).toBeInTheDocument();
  });

  it("shows no tabs while loading", () => {
    mockState({ isLoading: true });
    renderUi(<KyuProgramSection />);

    expect(screen.queryByRole("tab")).not.toBeInTheDocument();
  });

  it("renders nothing without levels", () => {
    mockState({ data: [] });
    renderUi(<KyuProgramSection />);

    expect(screen.queryByRole("tablist")).not.toBeInTheDocument();
  });

  describe("loaded", () => {
    beforeEach(() => {
      mockState({ data: mockLevels });
      renderUi(<KyuProgramSection />);
    });

    it("renders a tab per level, with its kanji and kyu", () => {
      const tabs = screen.getAllByRole("tab");
      expect(tabs.map((tab) => tab.textContent)).toEqual([
        "五級5th Kyu",
        "一級1st Kyu",
      ]);
    });

    it("titles the level by its belt and counts its techniques", () => {
      expect(
        screen.getByRole("heading", { name: "Yellow Belt" })
      ).toBeInTheDocument();
      expect(screen.getByText(/5th Kyu ·/)).toHaveTextContent(
        "五級 · 5th Kyu · 3 techniques"
      );
    });

    it("numbers the techniques through the whole level", () => {
      expect(screen.getByText("02")).toBeInTheDocument();
      expect(screen.getByText("03")).toBeInTheDocument();
    });

    it("marks the henka apart from the kihon waza", () => {
      const henka = screen.getByText("Waki gatame").closest("li")!;
      const kihon = screen.getByText("Hakko dori").closest("li")!;

      expect(within(henka).getByText("Henka")).toBeInTheDocument();
      expect(within(kihon).queryByText("Henka")).not.toBeInTheDocument();
    });

    it("switches level and restarts the numbering", () => {
      fireEvent.click(screen.getByRole("tab", { name: /1st Kyu/ }));

      expect(
        screen.getByRole("heading", { name: "Brown Belt" })
      ).toBeInTheDocument();
      expect(screen.getByText("Furi age")).toBeInTheDocument();
      expect(screen.getByText("01")).toBeInTheDocument();
    });
  });

  it("opens on the level named in the URL", () => {
    mockState({ data: mockLevels });
    renderUi(<KyuProgramSection />, {
      initialEntries: ["/hakko-ryu?level=1er-kyu"],
    });

    expect(screen.getByRole("tab", { name: /1st Kyu/ })).toHaveAttribute(
      "aria-selected",
      "true"
    );
    expect(
      screen.getByRole("heading", { name: "Brown Belt" })
    ).toBeInTheDocument();
  });
});
