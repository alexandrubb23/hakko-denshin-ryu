import goshinArt from "@assets/syllabus/goshin.webp";
import hantachiArt from "@assets/syllabus/hantachi.webp";
import joArt from "@assets/syllabus/jo.webp";
import suwariArt from "@assets/syllabus/suwari.webp";
import tachiArt from "@assets/syllabus/tachi.webp";
import tamboArt from "@assets/syllabus/tambo.webp";

import type { Suite } from "@api/techniques";

import type { Rank } from "./GradeRank";
import { DAN_RANKS } from "./ranks";

// Keyed by the suite ids of the techniques API: "shodan-gi" → Shodan
export const SYLLABUS_GRADES: Record<string, Rank> = Object.fromEntries(
  DAN_RANKS.map((rank) => [`${rank.name.toLowerCase()}-gi`, rank])
);

/** "shodan-gi" → "Shodan", else the suite's own name */
export const gradeName = (suite: Suite) =>
  SYLLABUS_GRADES[suite.id]?.name ?? suite.name;

/** A technique of the syllabus or the kyu program */
export interface ProgramTechnique {
  number: number;
  name: string;
  /** Kyu program only: a kihon waza, or else one of its henka (variations) */
  isKihon?: boolean;
}

/** A practice category, e.g. Suwari Waza, and its techniques */
export interface ProgramGroup {
  id: string;
  name: string;
  techniques: ProgramTechnique[];
}

/** Each group's first technique number, counting through the whole grade */
export const numberGroups = (groups: ProgramGroup[]) => {
  let total = 0;
  const starts = groups.map((group) => {
    const start = total + 1;
    total += group.techniques.length;
    return start;
  });
  return { starts, total };
};

// Keyed by the practice in a group id: "shodan-suwari" → "suwari"
const PRACTICE_ART: Record<string, string> = {
  suwari: suwariArt,
  hantachi: hantachiArt,
  tachi: tachiArt,
  tambo: tamboArt,
  jo: joArt,
  goshin: goshinArt,
};

export const practiceArt = (groupId: string): string | undefined =>
  PRACTICE_ART[groupId.slice(groupId.indexOf("-") + 1)];

// The first kana or kanji of a name, with an opening bracket right before it:
// "(両)腕押捕" starts at its "(", not at "両"
const JAPANESE_START = /[(（「]?[぀-ヿ㐀-鿿]/;

/**
 * "Hakko dori 八光捕" → { romaji: "Hakko dori", kanji: "八光捕" }
 * "(Ryo) Ude osae dori (kata form) (両)腕押捕"
 *   → { romaji: "(Ryo) Ude osae dori (kata form)", kanji: "(両)腕押捕" }
 */
export const splitName = (name: string) => {
  const i = name.search(JAPANESE_START);
  if (i < 0) return { romaji: name.trim(), kanji: "" };
  return { romaji: name.slice(0, i).trim(), kanji: name.slice(i).trim() };
};

/** "SUWARI WAZA" → "Suwari Waza", "TAMBO-JUTSU" → "Tambo-jutsu" */
export const titleCase = (text: string) =>
  text.toLowerCase().replace(/(^|\s)\S/g, (letter) => letter.toUpperCase());
