import { describe, expect, it } from "vitest";

import type { Event } from "@api/events";
import { DOJO_NAME } from "@constants/brand";

import {
  eventDescription,
  eventPageUrl,
  eventShareText,
  eventTitle,
} from "./eventMeta";

const EVENT = {
  name: "Taikai 2025",
  location: "Belgium",
  details: "Two days of\ntraining.",
  sessions: [
    {
      id: "s1",
      startsAt: "2025-05-29T13:00:00.000Z",
      endsAt: "2025-05-29T15:00:00.000Z",
    },
    {
      id: "s2",
      startsAt: "2025-05-31T13:00:00.000Z",
      endsAt: "2025-05-31T15:00:00.000Z",
    },
  ],
} as Event;

describe("eventTitle", () => {
  it("is the event's name, then the dojo's", () => {
    expect(eventTitle(EVENT)).toBe(`Taikai 2025 - ${DOJO_NAME}`);
  });
});

describe("eventDescription", () => {
  it("says when and where, then what, on one line", () => {
    expect(eventDescription("en-GB", EVENT)).toBe(
      "29–31 May 2025 · Belgium. Two days of training."
    );
  });
});

describe("eventPageUrl", () => {
  it("is the event's page at the origin", () => {
    expect(eventPageUrl("https://senshinkan.ro", "taikai-2025")).toBe(
      "https://senshinkan.ro/events/taikai-2025"
    );
  });
});

describe("eventShareText", () => {
  it("names the event, its days and its place", () => {
    expect(eventShareText("en-GB", EVENT)).toBe(
      "Taikai 2025 · 29–31 May 2025 · Belgium"
    );
  });
});
