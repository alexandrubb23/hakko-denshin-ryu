import { fireEvent, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import renderUi from "@test/renderUi";

import Schedule from "./Schedule";

const getDayCard = (name: string) =>
  screen.getByRole("heading", { level: 3, name }).closest("article")!;

describe("Schedule page", () => {
  it("renders the page heading", () => {
    renderUi(<Schedule />);
    expect(
      screen.getByRole("heading", { level: 1, name: "Training Schedule" }),
    ).toBeInTheDocument();
  });

  it("summarises weekly sessions per group", () => {
    renderUi(<Schedule />);
    expect(screen.getByText("2 sessions per week · 2 h")).toBeInTheDocument();
    expect(screen.getByText("3 sessions per week · 4.5 h")).toBeInTheDocument();
  });

  it("renders one card per training day", () => {
    renderUi(<Schedule />);
    expect(screen.getAllByRole("article")).toHaveLength(3);
  });

  it("lists Tuesday's kids and seniors sessions", () => {
    renderUi(<Schedule />);
    const tuesday = within(getDayCard("Tuesday"));
    expect(tuesday.getByText("Kids")).toBeInTheDocument();
    expect(tuesday.getByText("Seniors")).toBeInTheDocument();
    expect(tuesday.getAllByRole("listitem")).toHaveLength(2);
    expect(tuesday.getByText("60 min")).toBeInTheDocument();
    expect(tuesday.getByText("90 min")).toBeInTheDocument();
  });

  it("lists only the seniors session on Thursday", () => {
    renderUi(<Schedule />);
    const thursday = within(getDayCard("Thursday"));
    expect(thursday.getAllByRole("listitem")).toHaveLength(1);
    expect(thursday.queryByText("Kids")).not.toBeInTheDocument();
    expect(thursday.getByText("1 session")).toBeInTheDocument();
  });

  it("renders the motivational quote", () => {
    renderUi(<Schedule />);
    expect(
      screen.getByText("Words are but opinions. Action is the only truth."),
    ).toBeInTheDocument();
    expect(screen.getByText("Marcus Aurelius")).toBeInTheDocument();
  });

  describe("group filter", () => {
    const groupButton = (name: RegExp) => screen.getByRole("button", { name });

    it("shows every group by default", () => {
      renderUi(<Schedule />);
      expect(groupButton(/^kids/i)).toHaveAttribute("aria-pressed", "false");
      expect(groupButton(/^seniors/i)).toHaveAttribute("aria-pressed", "false");
      expect(screen.getAllByRole("listitem")).toHaveLength(5);
    });

    it("shows only kids sessions and hides days without them", () => {
      renderUi(<Schedule />);
      fireEvent.click(groupButton(/^kids/i));

      expect(groupButton(/^kids/i)).toHaveAttribute("aria-pressed", "true");
      expect(screen.getAllByRole("article")).toHaveLength(2);
      expect(
        screen.queryByRole("heading", { name: "Thursday" }),
      ).not.toBeInTheDocument();
      screen.getAllByRole("listitem").forEach((item) => {
        expect(within(item).getByText("Kids")).toBeInTheDocument();
      });
    });

    it("shows only seniors sessions", () => {
      renderUi(<Schedule />);
      fireEvent.click(groupButton(/^seniors/i));

      expect(screen.getAllByRole("article")).toHaveLength(3);
      expect(screen.getAllByRole("listitem")).toHaveLength(3);
      expect(screen.queryByText("60 min")).not.toBeInTheDocument();
    });

    it("clears the filter when the selected group is clicked again", () => {
      renderUi(<Schedule />);
      fireEvent.click(groupButton(/^kids/i));
      fireEvent.click(groupButton(/^kids/i));

      expect(groupButton(/^kids/i)).toHaveAttribute("aria-pressed", "false");
      expect(screen.getAllByRole("listitem")).toHaveLength(5);
    });

    it("reads the selected group from the URL", () => {
      renderUi(<Schedule />, { initialEntries: ["/schedule?group=senior"] });
      expect(groupButton(/^seniors/i)).toHaveAttribute("aria-pressed", "true");
      expect(screen.getAllByRole("listitem")).toHaveLength(3);
    });

    it("ignores an unknown group in the URL", () => {
      renderUi(<Schedule />, { initialEntries: ["/schedule?group=foo"] });
      expect(screen.getAllByRole("listitem")).toHaveLength(5);
    });
  });

  it("links to the contact page", () => {
    renderUi(<Schedule />);
    expect(screen.getByRole("link", { name: /contact us/i })).toHaveAttribute(
      "href",
      "/contact",
    );
  });
});
