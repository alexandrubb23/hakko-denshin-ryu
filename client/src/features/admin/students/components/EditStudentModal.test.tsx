import { fireEvent, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { useUpdateStudent } from "@features/admin/students/hooks/useUpdateStudent";
import renderUi from "@test/renderUi";

import { type Student } from "@api/students";
import EditStudentModal from "./EditStudentModal";

vi.mock("@features/admin/students/hooks/useUpdateStudent", () => ({
  useUpdateStudent: vi.fn(),
}));

const mockUseUpdateStudent = vi.mocked(useUpdateStudent);

const mockMutate = vi.fn();
const mockReset = vi.fn();

const defaultMutation = {
  mutate: mockMutate,
  isPending: false,
  isError: false,
  error: null,
  reset: mockReset,
};

const student: Student = {
  id: "student-1",
  name: "John Doe",
  email: "john@example.com",
  emailVerified: true,
  createdAt: "2024-01-01T00:00:00.000Z",
  image: null,
};

const onClose = vi.fn();

const renderModal = (open = true) =>
  renderUi(
    <EditStudentModal open={open} onClose={onClose} student={student} />,
  );

describe("EditStudentModal", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    mockUseUpdateStudent.mockReturnValue(
      defaultMutation as unknown as ReturnType<typeof useUpdateStudent>,
    );
  });

  it("renders the modal when open", () => {
    renderModal();
    expect(screen.getByText("Edit Student")).toBeInTheDocument();
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: /^email$/i }),
    ).toBeInTheDocument();
  });

  it("does not render the modal when closed", () => {
    renderModal(false);
    expect(screen.queryByText("Edit Student")).not.toBeInTheDocument();
  });

  it("pre-fills the form with student data", () => {
    renderModal();
    expect(screen.getByLabelText(/name/i)).toHaveValue(student.name);
    expect(screen.getByRole("textbox", { name: /^email$/i })).toHaveValue(
      student.email,
    );
  });

  it("shows the invite checkbox unchecked by default", () => {
    renderModal();
    const checkbox = screen.getByRole("checkbox", {
      name: /send invitation email/i,
    });
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
  });

  it("shows the password field when invite checkbox is unchecked (default)", () => {
    renderModal();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it("hides the password field when invite checkbox is checked", async () => {
    renderModal();
    fireEvent.click(
      screen.getByRole("checkbox", { name: /send invitation email/i }),
    );
    await waitFor(() => {
      expect(screen.queryByLabelText(/password/i)).not.toBeInTheDocument();
    });
  });

  it("calls onClose when Cancel is clicked", () => {
    renderModal();
    fireEvent.click(screen.getByRole("button", { name: /cancel/i }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls mutate with sendInvite:false when invite checkbox is unchecked", async () => {
    renderModal();
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: "Jane Doe" },
    });
    fireEvent.change(screen.getByRole("textbox", { name: /^email$/i }), {
      target: { value: "jane@example.com" },
    });
    fireEvent.click(screen.getByRole("button", { name: /save changes/i }));

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith(
        expect.objectContaining({
          id: student.id,
          name: "Jane Doe",
          email: "jane@example.com",
          sendInvite: false,
        }),
        expect.any(Object),
      );
    });
  });

  it("calls mutate with sendInvite:true when invite checkbox is checked", async () => {
    renderModal();
    fireEvent.click(
      screen.getByRole("checkbox", { name: /send invitation email/i }),
    );

    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: "Jane Doe" },
    });
    fireEvent.change(screen.getByRole("textbox", { name: /^email$/i }), {
      target: { value: "jane@example.com" },
    });
    fireEvent.click(screen.getByRole("button", { name: /save changes/i }));

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith(
        expect.objectContaining({
          id: student.id,
          name: "Jane Doe",
          email: "jane@example.com",
          sendInvite: true,
        }),
        expect.any(Object),
      );
    });
  });

  it("shows 'Saving…' text while pending", () => {
    mockUseUpdateStudent.mockReturnValue({
      ...defaultMutation,
      isPending: true,
    } as unknown as ReturnType<typeof useUpdateStudent>);

    renderModal();
    expect(screen.getByRole("button", { name: /saving/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /saving/i })).toBeDisabled();
  });

  it("shows server error message on generic error", () => {
    mockUseUpdateStudent.mockReturnValue({
      ...defaultMutation,
      isError: true,
      error: new Error("Server error"),
    } as unknown as ReturnType<typeof useUpdateStudent>);

    renderModal();
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });

  it("shows 'Email already in use' on 409 error", () => {
    const axiosError = {
      isAxiosError: true,
      response: { status: 409 },
    };

    mockUseUpdateStudent.mockReturnValue({
      ...defaultMutation,
      isError: true,
      error: axiosError,
    } as unknown as ReturnType<typeof useUpdateStudent>);

    renderModal();
    expect(screen.getByText(/email already in use/i)).toBeInTheDocument();
  });
});
