import type { Rank } from "./GradeRank";

// The Mudansha ranks, shared by the grading system and the kyu program
export const KYU_RANKS: Rank[] = [
  { name: "Rokkyū", kanji: "六級", n: 6 },
  { name: "Gokyū", kanji: "五級", n: 5 },
  { name: "Yonkyū", kanji: "四級", n: 4 },
  { name: "Sankyū", kanji: "三級", n: 3 },
  { name: "Nikyū", kanji: "二級", n: 2 },
  { name: "Ikkyū", kanji: "一級", n: 1 },
];

// The Yudansha ranks, shared by the grading system and the syllabus
export const DAN_RANKS: Rank[] = [
  { name: "Shodan", kanji: "初段", n: 1 },
  { name: "Nidan", kanji: "弐段", n: 2 },
  { name: "Sandan", kanji: "参段", n: 3 },
  { name: "Yondan", kanji: "四段", n: 4 },
];
