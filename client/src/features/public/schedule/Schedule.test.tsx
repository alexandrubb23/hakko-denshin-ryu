import { screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import renderUi from "@test/renderUi";

import Schedule from "./Schedule";

// The day cards below the cover (the cover's boards repeat them on wide screens)
const getTimetable = () => within(screen.getByTestId("timetable"));

const getDayCard = (name: string) =>
  getTimetable().getByRole("heading", { level: 3, name }).closest("article")!;

// Sessions of the timetable (the cover's menu links are list items too)
const getSessions = () =>
  getTimetable()
    .getAllByRole("article")
    .flatMap((day) => within(day).getAllByRole("listitem"));

describe("Schedule page", () => {
  it("renders the page heading", () => {
    renderUi(<Schedule />);
    expect(
      screen.getByRole("heading", { level: 1, name: "Training Schedule" })
    ).toBeInTheDocument();
  });

  it("summarises weekly sessions per group", () => {
    renderUi(<Schedule />);
    expect(screen.getByText("2 sessions per week · 2 h")).toBeInTheDocument();
    expect(screen.getByText("3 sessions per week · 4.5 h")).toBeInTheDocument();
  });

  it("renders one card per training day", () => {
    renderUi(<Schedule />);
    expect(getTimetable().getAllByRole("article")).toHaveLength(3);
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
      screen.getByText(/Words are but opinions\. Action is the only truth\./)
    ).toBeInTheDocument();
    expect(screen.getByText("Marcus Aurelius")).toBeInTheDocument();
  });

  it("lists every session of the week", () => {
    renderUi(<Schedule />);
    expect(getSessions()).toHaveLength(5);
  });

  it("links to the contact page", () => {
    renderUi(<Schedule />);
    expect(screen.getByRole("link", { name: /contact us/i })).toHaveAttribute(
      "href",
      "/contact"
    );
  });
});
