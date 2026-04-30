import { fireEvent, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { useCreateStudent } from "@hooks/useCreateStudent";
import renderUi from "@test/renderUi";

import CreateStudentModal from "./CreateStudentModal";

vi.mock("@hooks/useCreateStudent", () => ({
  useCreateStudent: vi.fn(),
}));

const mockUseCreateStudent = vi.mocked(useCreateStudent);

const mockMutate = vi.fn();
const mockReset = vi.fn();

const defaultMutation = {
  mutate: mockMutate,
  isPending: false,
  isError: false,
  error: null,
  reset: mockReset,
};

const onClose = vi.fn();

const renderModal = (open = true) =>
  renderUi(<CreateStudentModal open={open} onClose={onClose} />);

describe("CreateStudentModal", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    mockUseCreateStudent.mockReturnValue(
      defaultMutation as unknown as ReturnType<typeof useCreateStudent>
    );
  });

  it("renders the modal when open", () => {
    renderModal();
    expect(screen.getByText("Add Student")).toBeInTheDocument();
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it("does not render the modal when closed", () => {
    renderModal(false);
    expect(screen.queryByText("Add Student")).not.toBeInTheDocument();
  });

  it("calls onClose when Cancel is clicked", () => {
    renderModal();
    fireEvent.click(screen.getByRole("button", { name: /cancel/i }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("shows validation errors when submitted with empty fields", async () => {
    renderModal();
    fireEvent.click(screen.getByRole("button", { name: /create student/i }));

    await waitFor(() => {
      expect(
        screen.getByText("Name must be at least 3 characters")
      ).toBeInTheDocument();
      expect(screen.getByText("Invalid email address")).toBeInTheDocument();
      expect(
        screen.getByText("Password must be at least 8 characters")
      ).toBeInTheDocument();
    });

    expect(mockMutate).not.toHaveBeenCalled();
  });

  it("shows validation error when name is too short", async () => {
    renderModal();
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: "ab" },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /create student/i }));

    await waitFor(() => {
      expect(
        screen.getByText("Name must be at least 3 characters")
      ).toBeInTheDocument();
    });

    expect(mockMutate).not.toHaveBeenCalled();
  });

  it("shows validation error when password is too short", async () => {
    renderModal();
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "short" },
    });
    fireEvent.click(screen.getByRole("button", { name: /create student/i }));

    await waitFor(() => {
      expect(
        screen.getByText("Password must be at least 8 characters")
      ).toBeInTheDocument();
    });

    expect(mockMutate).not.toHaveBeenCalled();
  });

  it("calls mutate with correct values when form is valid", async () => {
    renderModal();
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "securepassword" },
    });
    fireEvent.click(screen.getByRole("button", { name: /create student/i }));

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith(
        {
          name: "John Doe",
          email: "john@example.com",
          password: "securepassword",
        },
        expect.any(Object)
      );
    });
  });

  it("shows 'Creating…' text while pending", () => {
    mockUseCreateStudent.mockReturnValue({
      ...defaultMutation,
      isPending: true,
    } as unknown as ReturnType<typeof useCreateStudent>);

    renderModal();
    expect(
      screen.getByRole("button", { name: /creating/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /creating/i })).toBeDisabled();
  });

  it("shows server error message on generic error", () => {
    mockUseCreateStudent.mockReturnValue({
      ...defaultMutation,
      isError: true,
      error: new Error("Server error"),
    } as unknown as ReturnType<typeof useCreateStudent>);

    renderModal();
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });
});
