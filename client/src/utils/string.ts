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
