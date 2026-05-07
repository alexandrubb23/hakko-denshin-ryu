import { fireEvent, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import type { KyuLevel } from "@api/kyuProgram";
import { useKyuProgram } from "@features/public/kyu-program/useKyuProgram";
import renderUi from "@test/renderUi";

import KyuProgram from "./KyuProgram";

// ─── Mocks ───────────────────────────────────────────────────────────────────

vi.mock("@features/public/kyu-program/useKyuProgram", () => ({
  useKyuProgram: vi.fn(),
}));

const mockUseKyuProgram = vi.mocked(useKyuProgram);

// ─── Fixtures ────────────────────────────────────────────────────────────────

const mockLevels: KyuLevel[] = [
  {
    id: "5th-kyu",
    name: "5TH KYU — YELLOW BELT",
    shortName: "5th Kyu",
    belt: "yellow",
    groups: [
      {
        id: "5kyu-te",
        name: "TE WAZA 手技",
        techniques: [
          { number: 1, name: "Hakko dori", isKihon: true },
          { number: 2, name: "Yubi dori", isKihon: false },
        ],
      },
      {
        id: "5kyu-katame",
        name: "KATAME WAZA 固技",
        techniques: [{ number: 1, name: "Ude osae dori", isKihon: true }],
      },
    ],
  },
  {
    id: "4th-kyu",
    name: "4TH KYU — ORANGE BELT",
    shortName: "4th Kyu",
    belt: "orange",
    groups: [
      {
        id: "4kyu-group",
        name: "ORANGE GROUP",
        techniques: [{ number: 1, name: "Orange technique", isKihon: true }],
      },
    ],
  },
  {
    id: "3rd-kyu",
    name: "3RD KYU — GREEN BELT",
    shortName: "3rd Kyu",
    belt: "green",
    groups: [
      {
        id: "3kyu-group",
        name: "GREEN GROUP",
        techniques: [{ number: 1, name: "Green technique", isKihon: false }],
      },
    ],
  },
  {
    id: "2nd-kyu",
    name: "2ND KYU — BLUE BELT",
    shortName: "2nd Kyu",
    belt: "blue",
    groups: [
      {
        id: "2kyu-group",
        name: "BLUE GROUP",
        techniques: [{ number: 1, name: "Blue technique", isKihon: true }],
      },
    ],
  },
  {
    id: "1st-kyu",
    name: "1ST KYU — BROWN BELT",
    shortName: "1st Kyu",
    belt: "brown",
    groups: [
      {
        id: "1kyu-group",
        name: "BROWN GROUP",
        techniques: [{ number: 1, name: "Brown technique", isKihon: false }],
      },
    ],
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

const renderKyuProgram = (initialUrl = "/") =>
  renderUi(<KyuProgram />, { initialEntries: [initialUrl] });

const mockSuccess = () =>
  mockUseKyuProgram.mockReturnValue({
    data: mockLevels,
    isLoading: false,
    isError: false,
  } as unknown as ReturnType<typeof useKyuProgram>);

// ─── Tests ───────────────────────────────────────────────────────────────────

describe("KyuProgram page", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  // ── Loading state ────────────────────────────────────────────────────────

  describe("loading state", () => {
    beforeEach(() => {
      mockUseKyuProgram.mockReturnValue({
        data: undefined,
        isLoading: true,
        isError: false,
      } as unknown as ReturnType<typeof useKyuProgram>);

      renderKyuProgram();
    });

    it("renders the page heading", () => {
      expect(screen.getByText("Kyu Program")).toBeInTheDocument();
    });

    it("renders a loading spinner", () => {
      expect(screen.getByRole("progressbar")).toBeInTheDocument();
    });

    it("does not render level tabs", () => {
      expect(screen.queryByRole("tab")).not.toBeInTheDocument();
    });

    it("does not render an error message", () => {
      expect(screen.queryByText(/failed to load/i)).not.toBeInTheDocument();
    });
  });

  // ── Error state ──────────────────────────────────────────────────────────

  describe("error state", () => {
    beforeEach(() => {
      mockUseKyuProgram.mockReturnValue({
        data: undefined,
        isLoading: false,
        isError: true,
      } as unknown as ReturnType<typeof useKyuProgram>);

      renderKyuProgram();
    });

    it("renders the error message", () => {
      expect(
        screen.getByText(/failed to load kyu program/i),
      ).toBeInTheDocument();
    });

    it("does not render level tabs", () => {
      expect(screen.queryByRole("tab")).not.toBeInTheDocument();
    });

    it("does not render a spinner", () => {
      expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
    });
  });

  // ── Success state ────────────────────────────────────────────────────────

  describe("success state", () => {
    beforeEach(() => {
      mockSuccess();
      renderKyuProgram();
    });

    it("renders the page heading", () => {
      expect(screen.getByText("Kyu Program")).toBeInTheDocument();
    });

    it.each(["5th Kyu", "4th Kyu", "3rd Kyu", "2nd Kyu", "1st Kyu"])(
      "renders the %s tab",
      (shortName) => {
        expect(
          screen.getByRole("tab", { name: new RegExp(shortName, "i") }),
        ).toBeInTheDocument();
      },
    );

    it("shows the first level content by default", () => {
      expect(screen.getByText("5TH KYU — YELLOW BELT")).toBeInTheDocument();
    });

    it("renders all group titles for the active level", () => {
      expect(screen.getByText("TE WAZA 手技")).toBeInTheDocument();
      expect(screen.getByText("KATAME WAZA 固技")).toBeInTheDocument();
    });

    it("renders all techniques within each group", () => {
      expect(screen.getByText("Hakko dori")).toBeInTheDocument();
      expect(screen.getByText("Yubi dori")).toBeInTheDocument();
      expect(screen.getByText("Ude osae dori")).toBeInTheDocument();
    });

    it("renders the kihon/henka legend", () => {
      expect(screen.getByText("Kihon waza")).toBeInTheDocument();
      expect(screen.getByText("Henka")).toBeInTheDocument();
    });

    it("does not show error or spinner", () => {
      expect(screen.queryByText(/failed to load/i)).not.toBeInTheDocument();
      expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
    });
  });

  // ── URL initialisation ───────────────────────────────────────────────────

  describe("URL initialisation", () => {
    beforeEach(() => {
      mockSuccess();
    });

    it.each([
      ["5th-kyu", "5TH KYU — YELLOW BELT"],
      ["4th-kyu", "4TH KYU — ORANGE BELT"],
      ["3rd-kyu", "3RD KYU — GREEN BELT"],
      ["2nd-kyu", "2ND KYU — BLUE BELT"],
      ["1st-kyu", "1ST KYU — BROWN BELT"],
    ] as const)(
      "renders %s level when ?level=%s is in the URL",
      (levelId, levelName) => {
        renderKyuProgram(`/?level=${levelId}`);
        expect(screen.getByText(levelName)).toBeInTheDocument();
      },
    );

    it("falls back to the first level for an unknown level param", () => {
      renderKyuProgram("/?level=unknown");
      expect(screen.getByText("5TH KYU — YELLOW BELT")).toBeInTheDocument();
    });
  });

  // ── Tab switching ────────────────────────────────────────────────────────

  describe("tab switching", () => {
    beforeEach(() => {
      mockSuccess();
      renderKyuProgram();
    });

    it.each([
      ["5th Kyu", "5TH KYU — YELLOW BELT"],
      ["4th Kyu", "4TH KYU — ORANGE BELT"],
      ["3rd Kyu", "3RD KYU — GREEN BELT"],
      ["2nd Kyu", "2ND KYU — BLUE BELT"],
      ["1st Kyu", "1ST KYU — BROWN BELT"],
    ] as const)(
      "shows %s level content when the tab is clicked",
      (shortName, levelName) => {
        fireEvent.click(
          screen.getByRole("tab", { name: new RegExp(shortName, "i") }),
        );
        expect(screen.getByText(levelName)).toBeInTheDocument();
      },
    );

    it("only renders one level's content at a time", () => {
      fireEvent.click(screen.getByRole("tab", { name: /4th kyu/i }));
      expect(screen.getByText("4TH KYU — ORANGE BELT")).toBeInTheDocument();
      expect(
        screen.queryByText("5TH KYU — YELLOW BELT"),
      ).not.toBeInTheDocument();
    });

    it("marks the clicked tab as selected", () => {
      fireEvent.click(screen.getByRole("tab", { name: /3rd kyu/i }));
      expect(screen.getByRole("tab", { name: /3rd kyu/i })).toHaveAttribute(
        "aria-selected",
        "true",
      );
    });

    it("deselects the previously selected tab", () => {
      fireEvent.click(screen.getByRole("tab", { name: /2nd kyu/i }));
      expect(screen.getByRole("tab", { name: /5th kyu/i })).toHaveAttribute(
        "aria-selected",
        "false",
      );
    });
  });

  // ── Kihon / Henka rendering ──────────────────────────────────────────────

  describe("kihon and henka techniques", () => {
    beforeEach(() => {
      mockSuccess();
      renderKyuProgram();
    });

    it("renders kihon techniques in the DOM", () => {
      expect(screen.getByText("Hakko dori")).toBeInTheDocument();
    });

    it("renders henka techniques in the DOM", () => {
      expect(screen.getByText("Yubi dori")).toBeInTheDocument();
    });

    it("renders both kihon and henka legend labels", () => {
      expect(screen.getByText("Kihon waza")).toBeInTheDocument();
      expect(screen.getByText("Henka")).toBeInTheDocument();
    });
  });
});
