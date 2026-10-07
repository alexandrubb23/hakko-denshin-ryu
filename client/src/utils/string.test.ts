import { describe, expect, it } from "vitest";

import { truncate } from "./string";

describe("truncate", () => {
  it("keeps short text whole, on one line", () => {
    expect(truncate("Two days\n  of training", 50)).toBe(
      "Two days of training"
    );
  });

  it("cuts long text at a word", () => {
    expect(truncate("Two days of training", 10)).toBe("Two days…");
  });

  it("cuts a single long word where it must", () => {
    expect(truncate("Seminarwochenende", 7)).toBe("Seminar…");
  });
});
