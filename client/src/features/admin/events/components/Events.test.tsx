import { fireEvent, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { useAdminEvents } from "@features/admin/events/hooks/useAdminEvents";
import { useCreateEvent } from "@features/admin/events/hooks/useCreateEvent";
import { useUpdateEvent } from "@features/admin/events/hooks/useUpdateEvent";
import renderUi from "@test/renderUi";

import Events from "./Events";

vi.mock("@features/admin/events/hooks/useAdminEvents", () => ({
  useAdminEvents: vi.fn(),
}));

vi.mock("@features/admin/events/hooks/useCreateEvent", () => ({
  useCreateEvent: vi.fn(),
}));

vi.mock("@features/admin/events/hooks/useUpdateEvent", () => ({
  useUpdateEvent: vi.fn(),
}));

const mockUseAdminEvents = vi.mocked(useAdminEvents);
const mockUseCreateEvent = vi.mocked(useCreateEvent);
const mockUseUpdateEvent = vi.mocked(useUpdateEvent);

const defaultMutation = {
  mutate: vi.fn(),
  isPending: false,
  isError: false,
  error: null,
  reset: vi.fn(),
};

const renderEvents = () => renderUi(<Events />);

describe("Events", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    mockUseAdminEvents.mockReturnValue({
      data: [],
      isLoading: false,
      isError: false,
    } as unknown as ReturnType<typeof useAdminEvents>);
    mockUseCreateEvent.mockReturnValue(
      defaultMutation as unknown as ReturnType<typeof useCreateEvent>,
    );
    mockUseUpdateEvent.mockReturnValue(
      defaultMutation as unknown as ReturnType<typeof useUpdateEvent>,
    );
  });

  it("renders the Add Event button", () => {
    renderEvents();
    expect(
      screen.getByRole("button", { name: /add event/i }),
    ).toBeInTheDocument();
  });

  it("dialog is not visible on initial render", () => {
    renderEvents();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("shows the create dialog when Add Event is clicked", () => {
    renderEvents();
    fireEvent.click(screen.getByRole("button", { name: /add event/i }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("hides the dialog when Escape is pressed", async () => {
    renderEvents();
    fireEvent.click(screen.getByRole("button", { name: /add event/i }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    const presentation = document.querySelector('[role="presentation"]');
    fireEvent.keyDown(presentation!, { key: "Escape", code: "Escape" });

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  it("hides the dialog when clicking outside (backdrop)", async () => {
    renderEvents();
    fireEvent.click(screen.getByRole("button", { name: /add event/i }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    const backdrop = document.querySelector(".MuiBackdrop-root");
    expect(backdrop).not.toBeNull();
    fireEvent.click(backdrop!);

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });
});
