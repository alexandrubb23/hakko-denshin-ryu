import { fireEvent, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { useUploadStudentImage } from "@hooks/useUploadStudentImage";
import createModalMock from "@test/createModalMock";
import renderUi from "@test/renderUi";

import StudentAvatar from "./StudentAvatar";

vi.mock("@hooks/useUploadStudentImage", () => ({
  useUploadStudentImage: vi.fn(),
}));

vi.mock("@components/AvatarUploadDialog/AvatarUploadDialog", () => ({
  default: createModalMock("avatar-upload-dialog"),
}));

const mockUseUploadStudentImage = vi.mocked(useUploadStudentImage);

const defaultProps = {
  studentId: "student-1",
  name: "John Doe",
  isLoading: false,
};

describe("StudentAvatar", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    mockUseUploadStudentImage.mockReturnValue({
      mutate: vi.fn(),
      isPending: false,
      isError: false,
      error: null,
      reset: vi.fn(),
    } as unknown as ReturnType<typeof useUploadStudentImage>);
  });

  it("does not show the upload dialog initially", () => {
    renderUi(<StudentAvatar {...defaultProps} />);

    expect(screen.queryByTestId("avatar-upload-dialog")).not.toBeInTheDocument();
  });

  it("renders initials when no image is provided", () => {
    renderUi(<StudentAvatar {...defaultProps} />);

    expect(screen.getByText("JD")).toBeInTheDocument();
  });

  it("renders a skeleton when loading", () => {
    renderUi(<StudentAvatar {...defaultProps} isLoading />);

    expect(screen.queryByText("JD")).not.toBeInTheDocument();
    expect(screen.queryByTestId("avatar-upload-dialog")).not.toBeInTheDocument();
  });

  describe("dialog visibility", () => {
    beforeEach(() => {
      renderUi(<StudentAvatar {...defaultProps} />);
    });

    it("opens the upload dialog when the avatar is clicked", () => {
      fireEvent.click(screen.getByText("JD"));

      expect(screen.getByTestId("avatar-upload-dialog")).toBeInTheDocument();
    });

    it("closes the dialog when clicking outside (backdrop)", () => {
      fireEvent.click(screen.getByText("JD"));
      expect(screen.getByTestId("avatar-upload-dialog")).toBeInTheDocument();

      fireEvent.click(screen.getByTestId("avatar-upload-dialog-backdrop"));

      expect(screen.queryByTestId("avatar-upload-dialog")).not.toBeInTheDocument();
    });

    it("closes the dialog when the Escape key is pressed", () => {
      fireEvent.click(screen.getByText("JD"));
      expect(screen.getByTestId("avatar-upload-dialog")).toBeInTheDocument();

      fireEvent.keyDown(document, { key: "Escape" });

      expect(screen.queryByTestId("avatar-upload-dialog")).not.toBeInTheDocument();
    });
  });
});
