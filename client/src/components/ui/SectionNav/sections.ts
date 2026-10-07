import type { IntlMessageID } from "i18n/messages";

import type { TocRow } from "./TocList";

/** Pages with at least this many chapters get the floating navigation */
export const SECTION_NAV_MIN_SECTIONS = 4;

/**
 * One chapter of a page. `id` is its `SectionHeading`'s: the heading, not the
 * whole section, because a target several screens tall never reaches the
 * observer's threshold and its row would never light up.
 */
export type SectionNavSection = { id: string } & (
  | { title: string }
  | { titleId: IntlMessageID }
);

/** The table of contents' rows, titles already translated */
export const sectionNavRows = (
  sections: readonly SectionNavSection[],
  translate: (id: IntlMessageID) => string
): TocRow[] =>
  sections.map((section) => ({
    id: section.id,
    title: "title" in section ? section.title : translate(section.titleId),
  }));
