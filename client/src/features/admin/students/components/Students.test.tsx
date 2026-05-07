import { fireEvent, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import type { Student } from "@api/students";
import { useStudents } from "@features/admin/students/hooks/useStudents";
import createModalMock from "@test/createModalMock";
import renderUi from "@test/renderUi";

import Students from "./Students";

vi.mock("@features/admin/students/hooks/useStudents", () => ({
  useStudents: vi.fn(),
}));

vi.mock("./CreateStudentModal", () => ({
  default: createModalMock("create-student-modal"),
}));

vi.mock("./EditStudentModal", () => ({
  default: function MockEditModal({
    open,
    onClose,
    student,
  }: {
    open: boolean;
    onClose: () => void;
    student: { name: string };
  }) {
    if (!open) return null;
    return (
      <div data-testid="edit-student-modal">
        <span data-testid="editing-student-name">{student.name}</span>
        <button onClick={onClose}>Close modal</button>
      </div>
    );
  },
}));

vi.mock("./DeleteStudentModal", () => ({
  default: function MockDeleteModal({
    open,
    onClose,
    student,
  }: {
    open: boolean;
    onClose: () => void;
    student: { name: string };
  }) {
    if (!open) return null;
    return (
      <div data-testid="delete-student-modal">
        <span data-testid="deleting-student-name">{student.name}</span>
        <button onClick={onClose}>Close delete modal</button>
      </div>
    );
  },
}));

const mockUseStudents = vi.mocked(useStudents);

const mockStudents: Student[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    emailVerified: true,
    createdAt: "2024-01-15T00:00:00.000Z",
    image: null,
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    emailVerified: false,
    createdAt: "2024-02-20T00:00:00.000Z",
    image: null,
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

    it("renders a loading spinner", () => {
      expect(screen.getByRole("progressbar")).toBeInTheDocument();
    });

    it("does not render the table", () => {
      expect(screen.queryByRole("table")).not.toBeInTheDocument();
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
      expect(
        screen.getByRole("button", { name: /add student/i }),
      ).toBeInTheDocument();
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
      expect(
        screen.getByRole("button", { name: /add student/i }),
      ).toBeInTheDocument();
    });

    it("does not show the modal by default", () => {
      expect(
        screen.queryByTestId("create-student-modal"),
      ).not.toBeInTheDocument();
    });

    it("renders an edit button for each student", () => {
      const editButtons = screen.getAllByRole("button", {
        name: /edit student/i,
      });
      expect(editButtons).toHaveLength(mockStudents.length);
    });

    it("does not show the edit modal by default", () => {
      expect(
        screen.queryByTestId("edit-student-modal"),
      ).not.toBeInTheDocument();
    });

    it("renders a delete button for each student", () => {
      const deleteButtons = screen.getAllByRole("button", {
        name: /delete student/i,
      });
      expect(deleteButtons).toHaveLength(mockStudents.length);
    });

    it("does not show the delete modal by default", () => {
      expect(
        screen.queryByTestId("delete-student-modal"),
      ).not.toBeInTheDocument();
    });
  });

  describe("modal interactions", () => {
    beforeEach(() => {
      mockUseStudents.mockReturnValue({
        data: [],
        isLoading: false,
        isError: false,
      } as unknown as ReturnType<typeof useStudents>);

      renderStudents();
    });

    it("shows the modal when the Add Student button is clicked", () => {
      fireEvent.click(screen.getByRole("button", { name: /add student/i }));
      expect(screen.getByTestId("create-student-modal")).toBeInTheDocument();
    });

    it("hides the modal when clicking outside", () => {
      fireEvent.click(screen.getByRole("button", { name: /add student/i }));
      expect(screen.getByTestId("create-student-modal")).toBeInTheDocument();

      fireEvent.click(screen.getByTestId("create-student-modal-backdrop"));
      expect(
        screen.queryByTestId("create-student-modal"),
      ).not.toBeInTheDocument();
    });

    it("hides the modal when pressing Escape", () => {
      fireEvent.click(screen.getByRole("button", { name: /add student/i }));
      expect(screen.getByTestId("create-student-modal")).toBeInTheDocument();

      fireEvent.keyDown(document, { key: "Escape" });
      expect(
        screen.queryByTestId("create-student-modal"),
      ).not.toBeInTheDocument();
    });
  });

  describe("edit modal interactions", () => {
    beforeEach(() => {
      mockUseStudents.mockReturnValue({
        data: mockStudents,
        isLoading: false,
        isError: false,
      } as unknown as ReturnType<typeof useStudents>);

      renderStudents();
    });

    it("shows the edit modal when an edit button is clicked", () => {
      const [firstEditBtn] = screen.getAllByRole("button", {
        name: /edit student/i,
      });
      fireEvent.click(firstEditBtn);
      expect(screen.getByTestId("edit-student-modal")).toBeInTheDocument();
    });

    it("populates the modal with the correct student for the first row", () => {
      const [firstEditBtn] = screen.getAllByRole("button", {
        name: /edit student/i,
      });
      fireEvent.click(firstEditBtn);
      expect(screen.getByTestId("editing-student-name")).toHaveTextContent(
        mockStudents[0].name,
      );
    });

    it("populates the modal with the correct student for another row", () => {
      const editButtons = screen.getAllByRole("button", {
        name: /edit student/i,
      });
      fireEvent.click(editButtons[1]);
      expect(screen.getByTestId("editing-student-name")).toHaveTextContent(
        mockStudents[1].name,
      );
    });

    it("hides the edit modal when onClose is called", () => {
      const [firstEditBtn] = screen.getAllByRole("button", {
        name: /edit student/i,
      });
      fireEvent.click(firstEditBtn);
      expect(screen.getByTestId("edit-student-modal")).toBeInTheDocument();

      fireEvent.click(screen.getByRole("button", { name: /close modal/i }));
      expect(
        screen.queryByTestId("edit-student-modal"),
      ).not.toBeInTheDocument();
    });
  });

  describe("delete modal interactions", () => {
    beforeEach(() => {
      mockUseStudents.mockReturnValue({
        data: mockStudents,
        isLoading: false,
        isError: false,
      } as unknown as ReturnType<typeof useStudents>);

      renderStudents();
    });

    it("shows the delete modal when a delete button is clicked", () => {
      const [firstDeleteBtn] = screen.getAllByRole("button", {
        name: /delete student/i,
      });
      fireEvent.click(firstDeleteBtn);
      expect(screen.getByTestId("delete-student-modal")).toBeInTheDocument();
    });

    it("populates the modal with the correct student for the first row", () => {
      const [firstDeleteBtn] = screen.getAllByRole("button", {
        name: /delete student/i,
      });
      fireEvent.click(firstDeleteBtn);
      expect(screen.getByTestId("deleting-student-name")).toHaveTextContent(
        mockStudents[0].name,
      );
    });

    it("populates the modal with the correct student for another row", () => {
      const deleteButtons = screen.getAllByRole("button", {
        name: /delete student/i,
      });
      fireEvent.click(deleteButtons[1]);
      expect(screen.getByTestId("deleting-student-name")).toHaveTextContent(
        mockStudents[1].name,
      );
    });

    it("hides the delete modal when onClose is called", () => {
      const [firstDeleteBtn] = screen.getAllByRole("button", {
        name: /delete student/i,
      });
      fireEvent.click(firstDeleteBtn);
      expect(screen.getByTestId("delete-student-modal")).toBeInTheDocument();

      fireEvent.click(
        screen.getByRole("button", { name: /close delete modal/i }),
      );
      expect(
        screen.queryByTestId("delete-student-modal"),
      ).not.toBeInTheDocument();
    });
  });
});
