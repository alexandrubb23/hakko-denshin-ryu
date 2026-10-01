import moonArt from "@assets/images/hakko-moon-bg.webp";

export { moonArt };

// Locate the moon painted in hakko-moon-bg.webp, as fractions of the image
const ART_ASPECT = 1024 / 1536; // width / height
export const MOON_X = 0.3022; // centre, of the width
export const MOON_Y = 0.4336; // centre, of the height
export const MOON_DIAMETER = 0.1465; // of the height

/** CSS width of the art when it is `height` tall */
export const artWidth = (height: string) =>
  `calc(${height} * ${ART_ASPECT.toFixed(4)})`;
