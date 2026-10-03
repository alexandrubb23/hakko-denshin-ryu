import { describe, expect, it } from "vitest";

import { splitName } from "./syllabusData";

describe("splitName", () => {
  it("splits the romaji from the kanji", () => {
    expect(splitName("Hakko dori 八光捕")).toEqual({
      romaji: "Hakko dori",
      kanji: "八光捕",
    });
  });

  it("keeps an opening bracket with the kanji it opens", () => {
    expect(splitName("(Ryo) Ude osae dori (kata form) (両)腕押捕")).toEqual({
      romaji: "(Ryo) Ude osae dori (kata form)",
      kanji: "(両)腕押捕",
    });
    expect(splitName("(Ryo) Mune osae dori (kata form) (両)胸押捕")).toEqual({
      romaji: "(Ryo) Mune osae dori (kata form)",
      kanji: "(両)胸押捕",
    });
  });

  it("leaves a romaji-only bracket in the romaji", () => {
    expect(splitName("Kote gaeshi (on Katate dori) 小手返")).toEqual({
      romaji: "Kote gaeshi (on Katate dori)",
      kanji: "小手返",
    });
  });

  it("keeps a name without kanji whole", () => {
    expect(splitName("Nidan technique 1")).toEqual({
      romaji: "Nidan technique 1",
      kanji: "",
    });
  });
});
