import { Belt } from "./belt.js";

export const RANKS = [
  { order: 1, name: "6 Kyu", belt: Belt.white, minimumMonths: 0 },
  { order: 2, name: "5 Kyu", belt: Belt.yellow, minimumMonths: 6 },
  { order: 3, name: "4 Kyu", belt: Belt.orange, minimumMonths: 6 },
  { order: 4, name: "3 Kyu", belt: Belt.green, minimumMonths: 12 },
  { order: 5, name: "2 Kyu", belt: Belt.blue, minimumMonths: 12 },
  { order: 6, name: "1 Kyu", belt: Belt.brown, minimumMonths: 12 },
  { order: 7, name: "1 Dan", belt: Belt.black, minimumMonths: 12 },
  { order: 8, name: "2 Dan", belt: Belt.black, minimumMonths: 24 },
  { order: 9, name: "3 Dan", belt: Belt.black, minimumMonths: 36 },
  { order: 10, name: "4 Dan", belt: Belt.black, minimumMonths: 48 },
] as const;

export type RankDefinition = (typeof RANKS)[number];
export type RankName = RankDefinition["name"];
