import { fireEvent, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import renderUi from "@test/renderUi";

import SectionAnchor from "./SectionAnchor";

describe("SectionAnchor", () => {
  const writeText = vi.fn().mockResolvedValue(undefined);

  beforeEach(() => {
    history.replaceState(null, "", "/kyu-program?level=3e-kyu");
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText },
      configurable: true,
    });
  });

  afterEach(() => writeText.mockClear());

  it("links to its section", () => {
    renderUi(<SectionAnchor id="origins" />);

    expect(
      screen.getByRole("link", { name: "Copy link to this section" })
    ).toHaveAttribute("href", "#origins");
  });

  it("copies the page's link to its section, keeping the query string", async () => {
    renderUi(<SectionAnchor id="3e-suwari" />);

    fireEvent.click(screen.getByRole("link"));

    const expected = `${location.origin}/kyu-program?level=3e-kyu#3e-suwari`;
    await waitFor(() => expect(writeText).toHaveBeenCalledWith(expected));
    expect(location.href).toBe(expected);
  });

  it("turns into a checkmark once the link is copied", async () => {
    renderUi(<SectionAnchor id="origins" />);
    expect(screen.getByTestId("LinkIcon")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("link"));

    expect(await screen.findByTestId("CheckIcon")).toBeInTheDocument();
    expect(screen.queryByTestId("LinkIcon")).not.toBeInTheDocument();
  });
});
