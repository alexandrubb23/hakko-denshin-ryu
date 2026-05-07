import { fireEvent, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { type Rank } from "@api/ranks";
import { useCreateStudentRank } from "@features/admin/ranks/hooks/useCreateStudentRank";
import { useRanks } from "@hooks/useRanks";
import renderUi from "@test/renderUi";

import CreateStudentRankModal from "./CreateStudentRankModal";

vi.mock("@hooks/useRanks", () => ({ useRanks: vi.fn() }));
vi.mock("@features/admin/ranks/hooks/useCreateStudentRank", () => ({
  useCreateStudentRank: vi.fn(),
}));

const mockUseRanks = vi.mocked(useRanks);
const mockUseCreateStudentRank = vi.mocked(useCreateStudentRank);

// ─── Fixtures ────────────────────────────────────────────────────────────────

const mockRanks: Rank[] = [
  { id: 1, name: "6 Kyu", belt: "white", order: 1 },
  { id: 2, name: "5 Kyu", belt: "yellow", order: 2 },
];

const mockMutate = vi.fn();
const mockReset = vi.fn();

const defaultMutation = {
  mutate: mockMutate,
  isPending: false,
  isError: false,
  error: null,
  reset: mockReset,
};

const STUDENT_ID = "student-123";
const onClose = vi.fn();

// ─── Helpers ─────────────────────────────────────────────────────────────────

const renderModal = (open = true) =>
  renderUi(
    <CreateStudentRankModal
      studentId={STUDENT_ID}
      open={open}
      onClose={onClose}
    />
  );

const selectRank = (name: string) => {
  fireEvent.mouseDown(screen.getByRole("combobox"));
  fireEvent.click(screen.getByRole("option", { name }));
};

const fillDate = (value: string) =>
  fireEvent.change(screen.getByLabelText(/awarded on/i), {
    target: { value },
  });

const submitForm = () =>
  fireEvent.click(screen.getByRole("button", { name: /assign rank/i }));

// ─── Tests ───────────────────────────────────────────────────────────────────

describe("CreateStudentRankModal", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    mockUseRanks.mockReturnValue({
      data: mockRanks,
    } as unknown as ReturnType<typeof useRanks>);
    mockUseCreateStudentRank.mockReturnValue(
      defaultMutation as unknown as ReturnType<typeof useCreateStudentRank>
    );
  });

  describe("rendering", () => {
    beforeEach(() => {
      renderModal();
    });

    it("renders the dialog title", () => {
      expect(
        screen.getByRole("heading", { name: /assign rank/i })
      ).toBeInTheDocument();
    });

    it("renders the Rank select", () => {
      expect(screen.getByRole("combobox")).toBeInTheDocument();
    });

    it("renders the Awarded on date field", () => {
      expect(screen.getByLabelText(/awarded on/i)).toBeInTheDocument();
    });

    it("renders the Notes text field", () => {
      expect(screen.getByLabelText(/notes/i)).toBeInTheDocument();
    });

    it("renders the Cancel button", () => {
      expect(
        screen.getByRole("button", { name: /cancel/i })
      ).toBeInTheDocument();
    });

    it("renders the submit button", () => {
      expect(
        screen.getByRole("button", { name: /assign rank/i })
      ).toBeInTheDocument();
    });

    it("populates rank options from the hook", () => {
      selectRank("6 Kyu");
      expect(screen.getByRole("option", { name: "6 Kyu" })).toBeInTheDocument();
      expect(screen.getByRole("option", { name: "5 Kyu" })).toBeInTheDocument();
    });
  });

  it("does not render when closed", () => {
    renderModal(false);
    expect(screen.queryByLabelText(/awarded on/i)).not.toBeInTheDocument();
  });

  it("calls onClose when Cancel is clicked", () => {
    renderModal();
    fireEvent.click(screen.getByRole("button", { name: /cancel/i }));
    expect(onClose).toHaveBeenCalledOnce();
  });

  // ─── Validation ─────────────────────────────────────────────────────────────

  describe("form validation", () => {
    beforeEach(() => {
      renderModal();
    });

    it("shows error when rank is not selected", async () => {
      fillDate("2024-03-01");
      submitForm();
      await waitFor(() => {
        expect(screen.getByText(/please select a rank/i)).toBeInTheDocument();
      });
    });

    it("shows error when date is not provided", async () => {
      submitForm();
      await waitFor(() => {
        expect(
          screen.getByText(/please select a valid date/i)
        ).toBeInTheDocument();
      });
    });

    it("does not call mutate when form is invalid", async () => {
      submitForm();
      await waitFor(() => {
        expect(mockMutate).not.toHaveBeenCalled();
      });
    });
  });

  // ─── Successful submission ───────────────────────────────────────────────────

  describe("successful submission", () => {
    beforeEach(() => {
      renderModal();
      selectRank("5 Kyu");
      fillDate("2024-03-01");
    });

    it("calls mutate with the correct values", async () => {
      submitForm();
      await waitFor(() => {
        expect(mockMutate).toHaveBeenCalledWith(
          { rankId: 2, awardedAt: "2024-03-01", notes: undefined },
          expect.objectContaining({ onSuccess: expect.any(Function) })
        );
      });
    });

    it("includes notes in the payload when provided", async () => {
      fireEvent.change(screen.getByLabelText(/notes/i), {
        target: { value: "Great session" },
      });
      submitForm();
      await waitFor(() => {
        expect(mockMutate).toHaveBeenCalledWith(
          expect.objectContaining({ notes: "Great session" }),
          expect.anything()
        );
      });
    });

    it("closes the modal on success", async () => {
      mockMutate.mockImplementation(
        (_values: unknown, { onSuccess }: { onSuccess: () => void }) =>
          onSuccess()
      );
      submitForm();
      await waitFor(() => {
        expect(onClose).toHaveBeenCalledOnce();
      });
    });
  });

  // ─── Server errors ───────────────────────────────────────────────────────────

  describe("server error", () => {
    it("displays the error message returned by the API", () => {
      mockUseCreateStudentRank.mockReturnValue({
        ...defaultMutation,
        isError: true,
        error: {
          isAxiosError: true,
          response: { data: { error: "Rank already assigned" } },
        },
      } as unknown as ReturnType<typeof useCreateStudentRank>);

      renderModal();
      expect(screen.getByText("Rank already assigned")).toBeInTheDocument();
    });

    it("displays a generic message for non-Axios errors", () => {
      mockUseCreateStudentRank.mockReturnValue({
        ...defaultMutation,
        isError: true,
        error: new Error("Network failure"),
      } as unknown as ReturnType<typeof useCreateStudentRank>);

      renderModal();
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    });
  });

  // ─── Pending state ───────────────────────────────────────────────────────────

  describe("pending state", () => {
    beforeEach(() => {
      mockUseCreateStudentRank.mockReturnValue({
        ...defaultMutation,
        isPending: true,
      } as unknown as ReturnType<typeof useCreateStudentRank>);

      renderModal();
    });

    it("shows 'Saving…' on the submit button", () => {
      expect(screen.getByText("Saving…")).toBeInTheDocument();
    });

    it("disables the submit button", () => {
      expect(screen.getByRole("button", { name: /saving/i })).toBeDisabled();
    });

    it("disables the Cancel button", () => {
      expect(screen.getByRole("button", { name: /cancel/i })).toBeDisabled();
    });
  });
});
