import { screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import type { StudentEvent } from "@api/events";
import { useStudentEvents } from "@features/admin/students/hooks/useStudentEvents";
import renderUi from "@test/renderUi";
import { formatDate } from "@utils/time";

import StudentEventsTab from "./StudentEventsTab";

// ─── Mocks ────────────────────────────────────────────────────────────────────

vi.mock("@features/admin/students/hooks/useStudentEvents", () => ({
  useStudentEvents: vi.fn(),
}));

const mockUseStudentEvents = vi.mocked(useStudentEvents);

// ─── Fixtures ─────────────────────────────────────────────────────────────────

const STUDENT_ID = "student-123";

const mockEvents: StudentEvent[] = [
  {
    id: "event-1",
    name: "Spring Seminar",
    type: "seminar" as StudentEvent["type"],
    status: "published" as StudentEvent["status"],
    startDate: "2025-04-15T09:00:00.000Z",
    endDate: null,
    location: "Bucharest Dojo",
    attended: true,
  },
  {
    id: "event-2",
    name: "Summer Camp",
    type: "camp" as StudentEvent["type"],
    status: "published" as StudentEvent["status"],
    startDate: "2025-07-20T08:00:00.000Z",
    endDate: "2025-07-25T18:00:00.000Z",
    location: "Cluj-Napoca",
    attended: false,
  },
  {
    id: "event-3",
    name: "Winter Gasshuku",
    type: "gasshuku" as StudentEvent["type"],
    status: "draft" as StudentEvent["status"],
    startDate: "2025-12-15T10:00:00.000Z",
    endDate: null,
    location: "Timisoara",
    attended: null,
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

type MockState = {
  data: StudentEvent[] | undefined;
  isLoading: boolean;
  isError: boolean;
};

const mockAndRender = (state: MockState) => {
  mockUseStudentEvents.mockReturnValue(
    state as unknown as ReturnType<typeof useStudentEvents>
  );
  renderUi(<StudentEventsTab studentId={STUDENT_ID} />);
};

// ─── Tests ────────────────────────────────────────────────────────────────────

describe("StudentEventsTab", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  // ── Loading state ──────────────────────────────────────────────────────────

  describe("loading state", () => {
    beforeEach(() => {
      mockAndRender({ data: undefined, isLoading: true, isError: false });
    });

    it("renders a loading spinner", () => {
      expect(screen.getByRole("progressbar")).toBeInTheDocument();
    });

    it("does not render the table", () => {
      expect(screen.queryByRole("table")).not.toBeInTheDocument();
    });

    it("does not show any event data", () => {
      expect(screen.queryByText("Spring Seminar")).not.toBeInTheDocument();
    });

    it("does not show an error message", () => {
      expect(
        screen.queryByText(/failed to load events/i)
      ).not.toBeInTheDocument();
    });

    it("does not show the empty state", () => {
      expect(screen.queryByText(/no events found/i)).not.toBeInTheDocument();
    });
  });

  // ── Error state ────────────────────────────────────────────────────────────

  describe("error state", () => {
    beforeEach(() => {
      mockAndRender({ data: undefined, isLoading: false, isError: true });
    });

    it("shows the error message", () => {
      expect(
        screen.getByText(/failed to load events\. please try again/i)
      ).toBeInTheDocument();
    });

    it("does not render the table", () => {
      expect(screen.queryByRole("table")).not.toBeInTheDocument();
    });

    it("does not show the empty state", () => {
      expect(screen.queryByText(/no events found/i)).not.toBeInTheDocument();
    });
  });

  // ── Empty state ────────────────────────────────────────────────────────────

  describe("empty state", () => {
    beforeEach(() => {
      mockAndRender({ data: [], isLoading: false, isError: false });
    });

    it("shows the empty state message", () => {
      expect(screen.getByText(/no events found/i)).toBeInTheDocument();
    });

    it("does not render the table", () => {
      expect(screen.queryByRole("table")).not.toBeInTheDocument();
    });

    it("does not show an error message", () => {
      expect(
        screen.queryByText(/failed to load events/i)
      ).not.toBeInTheDocument();
    });
  });

  // ── Success state ──────────────────────────────────────────────────────────

  describe("success state", () => {
    beforeEach(() => {
      mockAndRender({ data: mockEvents, isLoading: false, isError: false });
    });

    it("renders the table", () => {
      expect(screen.getByRole("table")).toBeInTheDocument();
    });

    it.each(["Event", "Type", "Start Date", "Location", "Attended"])(
      "renders the '%s' column header",
      (header) => {
        expect(screen.getByText(header)).toBeInTheDocument();
      }
    );

    it("renders a row for each event plus the header", () => {
      expect(screen.getAllByRole("row")).toHaveLength(mockEvents.length + 1);
    });

    it("renders the name of each event", () => {
      for (const event of mockEvents) {
        expect(screen.getByText(event.name)).toBeInTheDocument();
      }
    });

    it("renders the formatted start date for each event", () => {
      for (const event of mockEvents) {
        expect(
          screen.getByText(formatDate(event.startDate))
        ).toBeInTheDocument();
      }
    });

    it("renders the location for each event", () => {
      for (const event of mockEvents) {
        expect(screen.getByText(event.location)).toBeInTheDocument();
      }
    });

    it("renders the event type for each event", () => {
      for (const event of mockEvents) {
        expect(screen.getByText(event.type)).toBeInTheDocument();
      }
    });

    it("renders a 'Yes' chip for an attended event", () => {
      expect(screen.getByText("Yes")).toBeInTheDocument();
    });

    it("renders a 'No' chip for a non-attended event", () => {
      expect(screen.getByText("No")).toBeInTheDocument();
    });

    it("renders a '—' chip for an event not yet marked", () => {
      expect(screen.getByText("—")).toBeInTheDocument();
    });

    it("does not show an error message", () => {
      expect(
        screen.queryByText(/failed to load events/i)
      ).not.toBeInTheDocument();
    });

    it("does not show the empty state", () => {
      expect(screen.queryByText(/no events found/i)).not.toBeInTheDocument();
    });
  });
});
