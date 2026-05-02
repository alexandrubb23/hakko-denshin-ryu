import { fireEvent, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import type { Suite } from "@api/techniques";
import { useTechniques } from "@hooks/useTechniques";
import renderUi from "@test/renderUi";

import Techniques from "./Techniques";

// ─── Mocks ───────────────────────────────────────────────────────────────────

vi.mock("@hooks/useTechniques", () => ({
  useTechniques: vi.fn(),
}));

const mockUseTechniques = vi.mocked(useTechniques);

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
          { number: 1, name: "Hakko dori" },
          { number: 2, name: "Kao ate" },
        ],
      },
      {
        id: "shodan-tachi",
        name: "TACHI WAZA 立技",
        techniques: [{ number: 1, name: "Ude osae dori" }],
      },
    ],
  },
  {
    id: "nidan-gi",
    name: "NIDAN GI 二段技",
    description: "Second degree techniques.",
    groups: [
      {
        id: "nidan-suwari",
        name: "NIDAN SUWARI WAZA",
        techniques: [{ number: 1, name: "Nidan technique 1" }],
      },
    ],
  },
  {
    id: "sandan-gi",
    name: "SANDAN GI 三段技",
    description: "Third degree techniques.",
    groups: [
      {
        id: "sandan-group",
        name: "SANDAN GROUP",
        techniques: [{ number: 1, name: "Sandan technique 1" }],
      },
    ],
  },
  {
    id: "yondan-gi",
    name: "YONDAN GI 四段技",
    description: "Fourth degree techniques.",
    groups: [
      {
        id: "yondan-group",
        name: "YONDAN GROUP",
        techniques: [{ number: 1, name: "Yondan technique 1" }],
      },
    ],
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

const renderTechniques = (initialUrl = "/") =>
  renderUi(<Techniques />, { initialEntries: [initialUrl] });

const mockSuccess = () =>
  mockUseTechniques.mockReturnValue({
    data: mockSuites,
    isLoading: false,
    isError: false,
  } as unknown as ReturnType<typeof useTechniques>);

// ─── Tests ───────────────────────────────────────────────────────────────────

describe("Techniques page", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  // ── Loading state ────────────────────────────────────────────────────────

  describe("loading state", () => {
    beforeEach(() => {
      mockUseTechniques.mockReturnValue({
        data: undefined,
        isLoading: true,
        isError: false,
      } as unknown as ReturnType<typeof useTechniques>);

      renderTechniques();
    });

    it("renders the page heading", () => {
      expect(screen.getByText("Techniques")).toBeInTheDocument();
    });

    it("renders a loading spinner", () => {
      expect(screen.getByRole("progressbar")).toBeInTheDocument();
    });

    it("does not render suite tabs", () => {
      expect(screen.queryByRole("tab")).not.toBeInTheDocument();
    });

    it("does not render an error message", () => {
      expect(screen.queryByText(/failed to load/i)).not.toBeInTheDocument();
    });
  });

  // ── Error state ──────────────────────────────────────────────────────────

  describe("error state", () => {
    beforeEach(() => {
      mockUseTechniques.mockReturnValue({
        data: undefined,
        isLoading: false,
        isError: true,
      } as unknown as ReturnType<typeof useTechniques>);

      renderTechniques();
    });

    it("renders the error message", () => {
      expect(
        screen.getByText(/failed to load techniques/i)
      ).toBeInTheDocument();
    });

    it("does not render suite tabs", () => {
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
      renderTechniques();
    });

    it("renders the page heading", () => {
      expect(screen.getByText("Techniques")).toBeInTheDocument();
    });

    it.each(["Shodan", "Nidan", "Sandan", "Yondan"])(
      "renders the %s tab",
      (label) => {
        expect(screen.getByRole("tab", { name: label })).toBeInTheDocument();
      }
    );

    it("shows the first suite content by default", () => {
      expect(screen.getByText("SHODAN GI 初段技")).toBeInTheDocument();
      expect(screen.getByText("First degree techniques.")).toBeInTheDocument();
    });

    it("renders all group titles for the active suite", () => {
      expect(screen.getByText("SUWARI WAZA 座技")).toBeInTheDocument();
      expect(screen.getByText("TACHI WAZA 立技")).toBeInTheDocument();
    });

    it("renders techniques within each group", () => {
      expect(screen.getByText("Hakko dori")).toBeInTheDocument();
      expect(screen.getByText("Kao ate")).toBeInTheDocument();
      expect(screen.getByText("Ude osae dori")).toBeInTheDocument();
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
      ["shodan-gi", "SHODAN GI 初段技", "First degree techniques."],
      ["nidan-gi", "NIDAN GI 二段技", "Second degree techniques."],
      ["sandan-gi", "SANDAN GI 三段技", "Third degree techniques."],
      ["yondan-gi", "YONDAN GI 四段技", "Fourth degree techniques."],
    ] as const)(
      "renders %s suite when ?suite=%s is in the URL",
      (suiteId, suiteName, suiteDescription) => {
        renderTechniques(`/?suite=${suiteId}`);
        expect(screen.getByText(suiteName)).toBeInTheDocument();
        expect(screen.getByText(suiteDescription)).toBeInTheDocument();
      }
    );

    it("falls back to the first suite for an unknown suite param", () => {
      renderTechniques("/?suite=unknown");
      expect(screen.getByText("SHODAN GI 初段技")).toBeInTheDocument();
    });
  });

  // ── Tab switching ────────────────────────────────────────────────────────

  describe("tab switching", () => {
    beforeEach(() => {
      mockSuccess();
      renderTechniques();
    });

    it.each([
      ["Shodan", "SHODAN GI 初段技"],
      ["Nidan", "NIDAN GI 二段技"],
      ["Sandan", "SANDAN GI 三段技"],
      ["Yondan", "YONDAN GI 四段技"],
    ] as const)(
      "shows %s suite content when the %s tab is clicked",
      (tabLabel, suiteName) => {
        fireEvent.click(screen.getByRole("tab", { name: tabLabel }));
        expect(screen.getByText(suiteName)).toBeInTheDocument();
      }
    );

    it("only renders one suite's content at a time", () => {
      fireEvent.click(screen.getByRole("tab", { name: "Nidan" }));
      expect(screen.getByText("NIDAN GI 二段技")).toBeInTheDocument();
      expect(screen.queryByText("SHODAN GI 初段技")).not.toBeInTheDocument();
    });

    it("marks the clicked tab as selected", () => {
      fireEvent.click(screen.getByRole("tab", { name: "Sandan" }));
      expect(screen.getByRole("tab", { name: "Sandan" })).toHaveAttribute(
        "aria-selected",
        "true"
      );
    });
  });
});
