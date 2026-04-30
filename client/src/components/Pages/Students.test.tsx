import { screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import type { Student } from "@api/students";
import { useStudents } from "@hooks/useStudents";
import renderUi from "@test/renderUi";

import Students from "./Students";

vi.mock("@hooks/useStudents", () => ({
  useStudents: vi.fn(),
}));

vi.mock("./CreateStudentModal", () => ({
  default: ({ open }: { open: boolean }) =>
    open ? <div data-testid="create-student-modal" /> : null,
}));

const mockUseStudents = vi.mocked(useStudents);

const mockStudents: Student[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    emailVerified: true,
    createdAt: "2024-01-15T00:00:00.000Z",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    emailVerified: false,
    createdAt: "2024-02-20T00:00:00.000Z",
  },
];

const renderStudents = () => renderUi(<Students />);

describe("Students page", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe("loading state", () => {
    beforeEach(() => {
      mockUseStudents.mockReturnValue({
        data: undefined,
        isLoading: true,
        isError: false,
      } as unknown as ReturnType<typeof useStudents>);

      renderStudents();
    });

    it("renders the page heading", () => {
      expect(screen.getByText("Students")).toBeInTheDocument();
    });

    it("renders the table with column headers", () => {
      expect(screen.getByRole("table")).toBeInTheDocument();
      expect(screen.getByText("Student")).toBeInTheDocument();
      expect(screen.getByText("Email")).toBeInTheDocument();
      expect(screen.getByText("Verified")).toBeInTheDocument();
      expect(screen.getByText("Joined")).toBeInTheDocument();
    });

    it("does not render any student data", () => {
      expect(screen.queryByText("John Doe")).not.toBeInTheDocument();
      expect(screen.queryByText("john@example.com")).not.toBeInTheDocument();
    });

    it("does not show the count chip", () => {
      expect(screen.queryByText("2")).not.toBeInTheDocument();
    });

    it("does not show an error message", () => {
      expect(screen.queryByText(/failed to load/i)).not.toBeInTheDocument();
    });

    it("renders the Add Student button", () => {
      expect(screen.getByRole("button", { name: /add student/i })).toBeInTheDocument();
    });
  });

  describe("error state", () => {
    beforeEach(() => {
      mockUseStudents.mockReturnValue({
        data: undefined,
        isLoading: false,
        isError: true,
      } as unknown as ReturnType<typeof useStudents>);

      renderStudents();
    });

    it("shows the error message", () => {
      expect(screen.getByText(/failed to load students/i)).toBeInTheDocument();
    });

    it("does not render the table", () => {
      expect(screen.queryByRole("table")).not.toBeInTheDocument();
    });

    it("does not show the empty state", () => {
      expect(screen.queryByText(/no students found/i)).not.toBeInTheDocument();
    });
  });

  describe("empty state", () => {
    beforeEach(() => {
      mockUseStudents.mockReturnValue({
        data: [],
        isLoading: false,
        isError: false,
      } as unknown as ReturnType<typeof useStudents>);

      renderStudents();
    });

    it("shows the empty state message", () => {
      expect(screen.getByText("No students found.")).toBeInTheDocument();
    });

    it("does not render the table", () => {
      expect(screen.queryByRole("table")).not.toBeInTheDocument();
    });

    it("does not show an error message", () => {
      expect(screen.queryByText(/failed to load/i)).not.toBeInTheDocument();
    });
  });

  describe("success state", () => {
    beforeEach(() => {
      mockUseStudents.mockReturnValue({
        data: mockStudents,
        isLoading: false,
        isError: false,
      } as unknown as ReturnType<typeof useStudents>);

      renderStudents();
    });

    it("renders all student names", () => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    });

    it("renders all student emails", () => {
      expect(screen.getByText("john@example.com")).toBeInTheDocument();
      expect(screen.getByText("jane@example.com")).toBeInTheDocument();
    });

    it("shows the student count chip", () => {
      expect(screen.getByText("2")).toBeInTheDocument();
    });

    it("renders the correct join dates", () => {
      const jan = new Date("2024-01-15T00:00:00.000Z").toLocaleDateString();
      const feb = new Date("2024-02-20T00:00:00.000Z").toLocaleDateString();
      expect(screen.getByText(jan)).toBeInTheDocument();
      expect(screen.getByText(feb)).toBeInTheDocument();
    });

    it("renders avatar initials for each student", () => {
      expect(screen.getByText("JD")).toBeInTheDocument();
      expect(screen.getByText("JS")).toBeInTheDocument();
    });

    it("does not show error or empty state", () => {
      expect(screen.queryByText(/failed to load/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/no students found/i)).not.toBeInTheDocument();
    });

    it("renders the Add Student button", () => {
      expect(screen.getByRole("button", { name: /add student/i })).toBeInTheDocument();
    });

    it("does not show the modal by default", () => {
      expect(screen.queryByTestId("create-student-modal")).not.toBeInTheDocument();
    });
  });
});
