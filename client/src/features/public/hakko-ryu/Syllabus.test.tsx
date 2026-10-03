import { fireEvent, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import type { Suite } from "@api/techniques";
import { mockTechniquesState } from "@test/mockTechniques";
import renderUi from "@test/renderUi";

import Syllabus from "./Syllabus";

// ─── Mocks ───────────────────────────────────────────────────────────────────

vi.mock("@features/public/techniques/useTechniques", () => ({
  useTechniques: vi.fn(),
}));

// ─── Fixtures ────────────────────────────────────────────────────────────────

const mockSuites: Suite[] = [
  {
    id: "shodan-gi",
    name: "SHODAN GI 初段技",
    description: "First degree techniques.",
    groups: [
      {
        id: "shodan-suwari",
        name: "SUWARI WAZA 座技",
        techniques: [
          { number: 1, name: "Hakko dori 八光捕" },
          { number: 2, name: "Kao ate 顔当" },
        ],
      },
      {
        id: "shodan-tachi",
        name: "TACHI WAZA 立技",
        techniques: [{ number: 1, name: "Tachi ate 立当" }],
      },
    ],
  },
  {
    id: "nidan-gi",
    name: "NIDAN GI 二段技",
    description: "Second degree techniques.",
    groups: [
      {
        id: "nidan-jo",
        name: "JO-JUTSU 杖術",
        techniques: [{ number: 1, name: "Tsuki iri 突入" }],
      },
    ],
  },
];

// ─── Tests ───────────────────────────────────────────────────────────────────

describe("Syllabus", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("shows the error message when the techniques fail to load", () => {
    mockTechniquesState({ isError: true });
    renderUi(<Syllabus />);

    expect(screen.getByText(/failed to load techniques/i)).toBeInTheDocument();
  });

  it("shows a placeholder while the techniques load", () => {
    mockTechniquesState({ isLoading: true });
    const { container } = renderUi(<Syllabus />);

    expect(container.querySelector(".MuiSkeleton-root")).toBeInTheDocument();
  });

  it("renders nothing when there are no techniques", () => {
    mockTechniquesState({ data: [] });
    renderUi(<Syllabus />);

    expect(screen.queryByRole("tab")).not.toBeInTheDocument();
    expect(document.querySelector(".MuiSkeleton-root")).not.toBeInTheDocument();
  });

  describe("loaded", () => {
    beforeEach(() => {
      mockTechniquesState({ data: mockSuites });
      renderUi(<Syllabus />);
    });

    it("renders a tab per grade", () => {
      const tabs = screen.getAllByRole("tab");
      expect(tabs.map((tab) => tab.textContent)).toEqual([
        "初段Shodan",
        "弐段Nidan",
      ]);
    });

    it("titles the grade and counts its techniques", () => {
      expect(screen.getByText("Shodan Kihon Waza")).toBeInTheDocument();
      expect(screen.getByText(/1st Dan/)).toHaveTextContent("3 techniques");
    });

    it("numbers the techniques through the whole grade", () => {
      expect(screen.getByText("01")).toBeInTheDocument();
      expect(screen.getByText("02")).toBeInTheDocument();
      // The second category carries on from the first
      expect(screen.getByText("03")).toBeInTheDocument();
      expect(screen.getByText("Tachi ate")).toBeInTheDocument();
    });

    it("splits each name into romaji and kanji", () => {
      expect(screen.getByText("Hakko dori")).toBeInTheDocument();
      expect(screen.getByText("八光捕")).toBeInTheDocument();
    });

    it("opens the first category and collapses the others", () => {
      const suwari = screen.getByRole("button", { name: /Suwari Waza/ });
      const tachi = screen.getByRole("button", { name: /Tachi Waza/ });

      expect(suwari).toHaveAttribute("aria-expanded", "true");
      expect(tachi).toHaveAttribute("aria-expanded", "false");
    });

    it("toggles a category open and closed", () => {
      const suwari = screen.getByRole("button", { name: /Suwari Waza/ });

      fireEvent.click(suwari);
      expect(suwari).toHaveAttribute("aria-expanded", "false");

      fireEvent.click(suwari);
      expect(suwari).toHaveAttribute("aria-expanded", "true");
    });

    it("switches grade and restarts the numbering", () => {
      fireEvent.click(screen.getByRole("tab", { name: /Nidan/ }));

      expect(screen.getByText("Nidan Kihon Waza")).toBeInTheDocument();
      expect(screen.getByText(/2nd Dan/)).toHaveTextContent("1 technique");
      expect(screen.getByText("Tsuki iri")).toBeInTheDocument();
      expect(screen.getByText("01")).toBeInTheDocument();
    });
  });
  it("opens on the grade named in the URL", () => {
    mockTechniquesState({ data: mockSuites });
    renderUi(<Syllabus />, { initialEntries: ["/hakko-ryu?grade=nidan-gi"] });

    expect(screen.getByRole("tab", { name: /Nidan/ })).toHaveAttribute(
      "aria-selected",
      "true"
    );
    expect(screen.getByText("Nidan Kihon Waza")).toBeInTheDocument();
  });
});
