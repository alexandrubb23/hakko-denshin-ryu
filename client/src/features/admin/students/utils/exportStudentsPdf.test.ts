import { createIntl } from "react-intl";
import { describe, expect, it } from "vitest";

import type { Student } from "@api/students";
import en from "@locales/en.json";

import { buildStudentsPdfDocument } from "./exportStudentsPdf";

const intl = createIntl({ locale: "en", messages: en });

const students: Student[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    emailVerified: true,
    category: "kid",
    createdAt: "2024-01-15T00:00:00.000Z",
    image: null,
    currentRank: {
      name: "4 Kyu",
      belt: "orange",
      awardedAt: "2025-03-10T00:00:00.000Z",
    },
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    emailVerified: false,
    category: null,
    createdAt: "2024-02-20T00:00:00.000Z",
    image: null,
    currentRank: null,
  },
];

type Cell = { text: string } | string;
const cellText = (cell: Cell) => (typeof cell === "string" ? cell : cell.text);

const tableBody = () => {
  const doc = buildStudentsPdfDocument(students, intl);
  const content = doc.content as Array<{ table?: { body: Cell[][] } }>;
  const table = content.find((block) => block.table)?.table;
  return table!.body.map((row) => row.map(cellText));
};

describe("buildStudentsPdfDocument", () => {
  it("has a header row with grade, belt and belt date columns", () => {
    expect(tableBody()[0]).toEqual([
      "#",
      "Student",
      "Email",
      "Category",
      "Joined",
      "Grade",
      "Belt",
      "Belt earned",
    ]);
  });

  it("renders one row per student with their current rank", () => {
    const [, john] = tableBody();
    expect(john).toEqual([
      "1",
      "John Doe",
      "john@example.com",
      "Kid",
      intl.formatDate("2024-01-15T00:00:00.000Z"),
      "4 Kyu",
      "Orange",
      intl.formatDate("2025-03-10T00:00:00.000Z"),
    ]);
  });

  it("uses placeholders for a student with no rank or category", () => {
    const [, , jane] = tableBody();
    expect(jane.slice(3)).toEqual([
      "—",
      intl.formatDate("2024-02-20T00:00:00.000Z"),
      "—",
      "—",
      "—",
    ]);
  });
});
