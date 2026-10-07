// Brand names, shown as-is in every language

export const SITE_NAME = "Hakko Denshin Ryu Jujutsu";

export const DOJO_NAME = "Senshinkan Romania";

/** Senshinkan, "the hall where you purify the heart" */
export const DOJO_KANJI = "洗心館";

/** A document title, signed by the brand: "Events - Senshinkan Romania" */
export const brandedTitle = (
  title: string,
  brand: typeof SITE_NAME | typeof DOJO_NAME = DOJO_NAME
) => `${title} - ${brand}`;
