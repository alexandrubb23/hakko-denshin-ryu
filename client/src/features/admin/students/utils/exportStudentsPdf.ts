import type { Content, TDocumentDefinitions } from "pdfmake/interfaces";
import type { IntlShape } from "react-intl";

import { type Student } from "@api/students";
import { DOJO_NAME } from "@constants/brand";
import type { IntlMessageID } from "i18n/messages";

import { STUDENT_CATEGORY_LABEL_IDS } from "./categoryLabels";

const BELT_COLOR_IDS: Record<string, IntlMessageID> = {
  white: "admin.students.export.belt.white",
  yellow: "admin.students.export.belt.yellow",
  orange: "admin.students.export.belt.orange",
  green: "admin.students.export.belt.green",
  blue: "admin.students.export.belt.blue",
  brown: "admin.students.export.belt.brown",
  black: "admin.students.export.belt.black",
};

const EMPTY = "—";
const HEADER_FILL = "#ede7f6";
const ROW_STRIPE_FILL = "#f7f5fb";
const LINE_COLOR = "#d6d0e0";

const isoDate = (date: Date) => date.toISOString().slice(0, 10);

export const buildStudentsPdfDocument = (
  students: Student[],
  intl: IntlShape
): TDocumentDefinitions => {
  const t = (id: IntlMessageID, values?: Record<string, string>) =>
    intl.formatMessage({ id }, values);

  const headers = [
    "#",
    t("admin.students.table.student"),
    t("common.email"),
    t("admin.students.category"),
    t("admin.students.table.joined"),
    t("admin.students.export.grade"),
    t("admin.students.export.belt"),
    t("admin.students.export.beltSince"),
  ].map<Content>((text) => ({ text, style: "tableHeader" }));

  const rows = students.map<Content[]>((student, index) => {
    const rank = student.currentRank;
    const beltColorId = rank ? BELT_COLOR_IDS[rank.belt] : undefined;

    return [
      { text: String(index + 1), color: "#777" },
      { text: student.name, bold: true },
      student.email,
      student.category
        ? t(STUDENT_CATEGORY_LABEL_IDS[student.category])
        : EMPTY,
      intl.formatDate(student.createdAt),
      rank?.name ?? EMPTY,
      rank ? (beltColorId ? t(beltColorId) : rank.belt) : EMPTY,
      rank ? intl.formatDate(rank.awardedAt) : EMPTY,
    ];
  });

  const title = t("admin.students.export.title");

  return {
    pageSize: "A4",
    pageOrientation: "landscape",
    pageMargins: [32, 40, 32, 40],
    info: { title: `${title} — ${DOJO_NAME}`, author: DOJO_NAME },
    defaultStyle: { font: "Roboto", fontSize: 9 },
    styles: {
      title: { fontSize: 18, bold: true },
      subtitle: { fontSize: 9, color: "#666" },
      tableHeader: { bold: true, fontSize: 9, color: "#3a2d52" },
    },
    content: [
      {
        columns: [
          { text: `${title} — ${DOJO_NAME}`, style: "title" },
          {
            text: t("admin.students.export.generated", {
              date: intl.formatDate(new Date(), { dateStyle: "long" }),
              count: String(students.length),
            }),
            style: "subtitle",
            alignment: "right",
            margin: [0, 6, 0, 0],
          },
        ],
        margin: [0, 0, 0, 14],
      },
      {
        table: {
          headerRows: 1,
          widths: [18, "*", "*", "auto", "auto", "auto", "auto", "auto"],
          body: [headers, ...rows],
        },
        layout: {
          fillColor: (rowIndex) =>
            rowIndex === 0
              ? HEADER_FILL
              : rowIndex % 2 === 0
                ? ROW_STRIPE_FILL
                : null,
          hLineWidth: (i, node) =>
            i === 0 || i === node.table.body.length ? 0 : 0.5,
          vLineWidth: () => 0,
          hLineColor: () => LINE_COLOR,
          paddingTop: () => 5,
          paddingBottom: () => 5,
        },
      },
    ],
    footer: (currentPage, pageCount) => ({
      text: `${currentPage} / ${pageCount}`,
      alignment: "right",
      fontSize: 8,
      color: "#999",
      margin: [32, 12, 32, 0],
    }),
  };
};

/**
 * Builds and downloads the student roster as a PDF. pdfmake (and its bundled
 * Roboto font, which covers Romanian diacritics) is loaded on demand so it
 * stays out of the main bundle.
 */
export const exportStudentsPdf = async (
  students: Student[],
  intl: IntlShape
) => {
  const [{ default: pdfMake }, { default: vfs }] = await Promise.all([
    import("pdfmake/build/pdfmake"),
    import("pdfmake/build/vfs_fonts"),
  ]);
  pdfMake.addVirtualFileSystem(vfs);

  const filename = `${intl.formatMessage({
    id: "admin.students.export.filename",
  })}-${isoDate(new Date())}.pdf`;

  await pdfMake
    .createPdf(buildStudentsPdfDocument(students, intl))
    .download(filename);
};
