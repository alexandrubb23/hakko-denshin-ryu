// Initials are shown in avatars, which render in Jarene (no diacritic glyphs)
export const getInitials = (name?: string): string =>
  name
    ? stripDiacritics(name)
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

/**
 * Removes diacritics (ă â î ș ț …) from a string.
 * Needed for text rendered with the Jarene font, which has no diacritic glyphs.
 */
export const stripDiacritics = (value?: string | null): string =>
  value ? value.normalize("NFD").replace(/[\u0300-\u036f]/g, "") : "";

/** Escapes text for HTML content and attribute values */
export const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/** 1 → "01" */
export const padNumber = (n: number) => String(n).padStart(2, "0");

/** "vineri" → "Vineri" */
export const capitalize = (value: string) =>
  value.charAt(0).toLocaleUpperCase() + value.slice(1);
