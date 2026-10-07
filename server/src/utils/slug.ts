// Combining marks left behind once accented letters are decomposed (NFD)
const DIACRITICS = /[̀-ͯ]/g;

/**
 * URL-safe form of a title: "Seminar de vară 2026!" -> "seminar-de-vara-2026".
 * Falls back to `fallback` when nothing URL-safe is left (e.g. only kanji).
 */
export const slugify = (text: string, fallback = "item") =>
  text
    .normalize("NFD")
    .replace(DIACRITICS, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || fallback;

/**
 * The first of `base`, `base-2`, `base-3`… not in `taken`
 */
export const firstFreeSlug = (base: string, taken: Iterable<string>) => {
  const used = new Set(taken);
  if (!used.has(base)) return base;
  let n = 2;
  while (used.has(`${base}-${n}`)) n++;
  return `${base}-${n}`;
};
