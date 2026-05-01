import { fireEvent, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { useAttendanceByMonth } from "@hooks/useAttendance";
import renderUi from "@test/renderUi";

import StudentAttendanceTab from ".";
import { CalendarView } from "./shared/calendarView";

// ─── Mocks ──────────────────────────────────────────────────────────────────

vi.mock("./DayView", () => ({ default: () => <div data-testid="day-view" /> }));
vi.mock("./WeekView", () => ({
  default: () => <div data-testid="week-view" />,
}));
vi.mock("./MonthView", () => ({
  default: () => <div data-testid="month-view" />,
}));
vi.mock("./YearView", () => ({
  default: () => <div data-testid="year-view" />,
}));

vi.mock("@hooks/useAttendance", () => ({
  useAttendanceByMonth: vi.fn(),
}));

const mockUseAttendanceByMonth = vi.mocked(useAttendanceByMonth);

// ─── Helpers ─────────────────────────────────────────────────────────────────

const STUDENT_ID = "student-123";

type MockState = {
  data: { records: [] } | undefined;
  isLoading: boolean;
  isError: boolean;
};

const defaultState: MockState = {
  data: { records: [] },
  isLoading: false,
  isError: false,
};

const renderTab = (initialUrl = "/", state: MockState = defaultState) => {
  mockUseAttendanceByMonth.mockReturnValue(
    state as unknown as ReturnType<typeof useAttendanceByMonth>
  );
  return renderUi(<StudentAttendanceTab studentId={STUDENT_ID} />, {
    initialEntries: [initialUrl],
  });
};

const clickView = (label: string) =>
  fireEvent.click(screen.getByRole("button", { name: new RegExp(label, "i") }));

// ─── Tests ───────────────────────────────────────────────────────────────────

describe("StudentAttendanceTab", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  // ── Nav bar ─────────────────────────────────────────────────────────────

  describe("navigation bar", () => {
    beforeEach(() => renderTab());

    it.each(["Day", "Week", "Month", "Year"])("renders the %s tab", (label) => {
      expect(
        screen.getByRole("button", { name: new RegExp(`^${label}$`, "i") })
      ).toBeInTheDocument();
    });
  });

  // ── Default view ─────────────────────────────────────────────────────────

  describe("default view", () => {
    it("renders DayView when no view param is present", () => {
      renderTab("/");
      expect(screen.getByTestId("day-view")).toBeInTheDocument();
    });

    it("does not render other views by default", () => {
      renderTab("/");
      expect(screen.queryByTestId("week-view")).not.toBeInTheDocument();
      expect(screen.queryByTestId("month-view")).not.toBeInTheDocument();
      expect(screen.queryByTestId("year-view")).not.toBeInTheDocument();
    });
  });

  // ── URL initialisation ───────────────────────────────────────────────────

  describe("URL initialisation", () => {
    it.each([
      [CalendarView.week, "week-view"],
      [CalendarView.month, "month-view"],
      [CalendarView.year, "year-view"],
    ] as const)("renders %sView when ?view=%s is in the URL", (view, testId) => {
      renderTab(`/?view=${view}`);
      expect(screen.getByTestId(testId)).toBeInTheDocument();
      expect(screen.queryByTestId("day-view")).not.toBeInTheDocument();
    });

    it("falls back to DayView for an invalid view param", () => {
      renderTab("/?view=invalid");
      expect(screen.getByTestId("day-view")).toBeInTheDocument();
    });
  });

  // ── View switching ───────────────────────────────────────────────────────

  describe("view switching", () => {
    beforeEach(() => renderTab());

    it.each([
      ["Week", "week-view"],
      ["Month", "month-view"],
      ["Year", "year-view"],
    ] as const)("switches to %sView when the %s tab is clicked", (label, testId) => {
      clickView(label);
      expect(screen.getByTestId(testId)).toBeInTheDocument();
      expect(screen.queryByTestId("day-view")).not.toBeInTheDocument();
    });

    it("returns to DayView when Day is clicked after switching", () => {
      clickView("Week");
      expect(screen.getByTestId("week-view")).toBeInTheDocument();

      clickView("Day");
      expect(screen.getByTestId("day-view")).toBeInTheDocument();
      expect(screen.queryByTestId("week-view")).not.toBeInTheDocument();
    });

    it("only one view is rendered at a time", () => {
      clickView("Month");
      const views = ["day-view", "week-view", "month-view", "year-view"];
      const rendered = views.filter((id) => screen.queryByTestId(id));
      expect(rendered).toHaveLength(1);
      expect(rendered[0]).toBe("month-view");
    });
  });

  // ── Loading state ────────────────────────────────────────────────────────

  describe("loading state", () => {
    it("shows a spinner while data is loading (day view)", () => {
      renderTab("/", { data: undefined, isLoading: true, isError: false });
      expect(screen.getByRole("progressbar")).toBeInTheDocument();
    });

    it("hides the active view while loading (day view)", () => {
      renderTab("/", { data: undefined, isLoading: true, isError: false });
      expect(screen.queryByTestId("day-view")).not.toBeInTheDocument();
    });

    it("does not show a spinner for year view (year fetches its own data)", () => {
      renderTab("/?view=year", {
        data: undefined,
        isLoading: true,
        isError: false,
      });
      expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
      expect(screen.getByTestId("year-view")).toBeInTheDocument();
    });
  });

  // ── Error state ──────────────────────────────────────────────────────────

  describe("error state", () => {
    it("shows an error alert when the request fails (day view)", () => {
      renderTab("/", { data: undefined, isLoading: false, isError: true });
      expect(
        screen.getByText(/failed to load attendance data/i)
      ).toBeInTheDocument();
    });

    it("hides the active view on error (day view)", () => {
      renderTab("/", { data: undefined, isLoading: false, isError: true });
      expect(screen.queryByTestId("day-view")).not.toBeInTheDocument();
    });

    it("does not show an error alert for year view (year handles its own errors)", () => {
      renderTab("/?view=year", {
        data: undefined,
        isLoading: false,
        isError: true,
      });
      expect(
        screen.queryByText(/failed to load attendance data/i)
      ).not.toBeInTheDocument();
      expect(screen.getByTestId("year-view")).toBeInTheDocument();
    });
  });
});
