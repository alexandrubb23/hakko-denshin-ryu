import { fireEvent, screen } from "@testing-library/react";
import { useEffect } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { type StudentRankEntry } from "@api/students";
import { useStudentRanks } from "@hooks/useStudentRanks";
import renderUi from "@test/renderUi";

import StudentRankTab from ".";

vi.mock("@hooks/useStudentRanks", () => ({
  useStudentRanks: vi.fn(),
}));

vi.mock("./CreateStudentRankModal", () => ({
  default: function MockCreateRankModal({
    open,
    onClose,
  }: {
    open: boolean;
    onClose: () => void;
    studentId: string;
  }) {
    useEffect(() => {
      if (!open) return;
      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      document.addEventListener("keydown", onKeyDown);
      return () => document.removeEventListener("keydown", onKeyDown);
    }, [open, onClose]);

    if (!open) return null;

    return (
      <div data-testid="create-rank-modal">
        <div data-testid="modal-backdrop" onClick={onClose} />
      </div>
    );
  },
}));

const mockUseStudentRanks = vi.mocked(useStudentRanks);

const STUDENT_ID = "student-123";

const mockRanks: StudentRankEntry[] = [
  {
    id: "rank-1",
    awardedAt: "2024-03-01T00:00:00.000Z",
    notes: "Good progress",
    rank: { name: "5 Kyu", belt: "yellow", order: 2 },
  },
  {
    id: "rank-2",
    awardedAt: "2024-09-15T00:00:00.000Z",
    notes: null,
    rank: { name: "4 Kyu", belt: "orange", order: 3 },
  },
];

// ─── Helpers ────────────────────────────────────────────────────────────────

type MockState = {
  data: StudentRankEntry[] | undefined;
  isLoading: boolean;
  isError: boolean;
};

const mockAndRender = (state: MockState) => {
  mockUseStudentRanks.mockReturnValue(
    state as unknown as ReturnType<typeof useStudentRanks>
  );
  renderUi(<StudentRankTab studentId={STUDENT_ID} />);
};

const assertTableHeaders = () => {
  expect(screen.getByRole("table")).toBeInTheDocument();
  expect(screen.getByText("Belt")).toBeInTheDocument();
  expect(screen.getByText("Rank")).toBeInTheDocument();
  expect(screen.getByText("Awarded on")).toBeInTheDocument();
  expect(screen.getByText("Notes")).toBeInTheDocument();
};

// ─── Tests ───────────────────────────────────────────────────────────────────

describe("StudentRankTab", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe("loading state", () => {
    beforeEach(() => {
      mockAndRender({ data: undefined, isLoading: true, isError: false });
    });

    it("renders the Assign Rank button", () => {
      expect(screen.getByRole("button", { name: /assign rank/i })).toBeInTheDocument();
    });

    it("renders the table with column headers", () => {
      assertTableHeaders();
    });

    it("does not show an error alert", () => {
      expect(
        screen.queryByText(/failed to load rank history/i)
      ).not.toBeInTheDocument();
    });

    it("does not show the empty state alert", () => {
      expect(
        screen.queryByText(/no ranks assigned yet/i)
      ).not.toBeInTheDocument();
    });
  });

  describe("error state", () => {
    beforeEach(() => {
      mockAndRender({ data: undefined, isLoading: false, isError: true });
    });

    it("shows the error alert", () => {
      expect(
        screen.getByText(/failed to load rank history/i)
      ).toBeInTheDocument();
    });

    it("does not render the table", () => {
      expect(screen.queryByRole("table")).not.toBeInTheDocument();
    });

    it("does not show the empty state alert", () => {
      expect(
        screen.queryByText(/no ranks assigned yet/i)
      ).not.toBeInTheDocument();
    });

    it("still renders the Assign Rank button", () => {
      expect(screen.getByRole("button", { name: /assign rank/i })).toBeInTheDocument();
    });
  });

  describe("empty state", () => {
    beforeEach(() => {
      mockAndRender({ data: [], isLoading: false, isError: false });
    });

    it("shows the empty state alert", () => {
      expect(
        screen.getByText(/no ranks assigned yet/i)
      ).toBeInTheDocument();
    });

    it("does not render the table", () => {
      expect(screen.queryByRole("table")).not.toBeInTheDocument();
    });

    it("does not show an error alert", () => {
      expect(
        screen.queryByText(/failed to load rank history/i)
      ).not.toBeInTheDocument();
    });

    it("renders the Assign Rank button", () => {
      expect(screen.getByRole("button", { name: /assign rank/i })).toBeInTheDocument();
    });
  });

  describe("success state", () => {
    beforeEach(() => {
      mockAndRender({ data: mockRanks, isLoading: false, isError: false });
    });

    it("renders the table with column headers", () => {
      assertTableHeaders();
    });

    it("renders the rank name for each entry", () => {
      expect(screen.getByText("5 Kyu")).toBeInTheDocument();
      expect(screen.getByText("4 Kyu")).toBeInTheDocument();
    });

    it("renders the awarded dates", () => {
      const date1 = new Date("2024-03-01T00:00:00.000Z").toLocaleDateString();
      const date2 = new Date("2024-09-15T00:00:00.000Z").toLocaleDateString();
      expect(screen.getByText(date1)).toBeInTheDocument();
      expect(screen.getByText(date2)).toBeInTheDocument();
    });

    it("renders notes when present", () => {
      expect(screen.getByText("Good progress")).toBeInTheDocument();
    });

    it("renders a dash when notes are null", () => {
      expect(screen.getByText("—")).toBeInTheDocument();
    });

    it("renders belt images with correct alt text", () => {
      expect(screen.getByAltText("yellow belt")).toBeInTheDocument();
      expect(screen.getByAltText("orange belt")).toBeInTheDocument();
    });

    it("renders the Assign Rank button", () => {
      expect(screen.getByRole("button", { name: /assign rank/i })).toBeInTheDocument();
    });

    it("does not show error or empty state alerts", () => {
      expect(
        screen.queryByText(/failed to load rank history/i)
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(/no ranks assigned yet/i)
      ).not.toBeInTheDocument();
    });
  });

  describe("modal interactions", () => {
    beforeEach(() => {
      mockAndRender({ data: [], isLoading: false, isError: false });
    });

    it("does not show the modal by default", () => {
      expect(screen.queryByTestId("create-rank-modal")).not.toBeInTheDocument();
    });

    it("shows the modal when Assign Rank is clicked", () => {
      fireEvent.click(screen.getByRole("button", { name: /assign rank/i }));
      expect(screen.getByTestId("create-rank-modal")).toBeInTheDocument();
    });

    it("hides the modal when clicking outside", () => {
      fireEvent.click(screen.getByRole("button", { name: /assign rank/i }));
      expect(screen.getByTestId("create-rank-modal")).toBeInTheDocument();

      fireEvent.click(screen.getByTestId("modal-backdrop"));
      expect(screen.queryByTestId("create-rank-modal")).not.toBeInTheDocument();
    });

    it("hides the modal when pressing Escape", () => {
      fireEvent.click(screen.getByRole("button", { name: /assign rank/i }));
      expect(screen.getByTestId("create-rank-modal")).toBeInTheDocument();

      fireEvent.keyDown(document, { key: "Escape" });
      expect(screen.queryByTestId("create-rank-modal")).not.toBeInTheDocument();
    });
  });
});
