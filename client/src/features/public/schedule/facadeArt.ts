import src from "@assets/images/dojo-facade.webp";
import type { ArtRect, MoonArt } from "@components/ui/ArcNavMenu/moonArt";
import { wideArtFade } from "@components/ui/MoonCover/MoonCover.style";
import theme from "@style/theme";

// The moon above the roof in dojo-facade.webp
export const FACADE_MOON_ART: MoonArt = {
  src,
  aspect: 1536 / 1024,
  moonX: 0.7754,
  moonY: 0.1538,
  moonDiameter: 0.138,
};

// The insides of the three blank boards between the pillars, left to right
export const FACADE_BOARDS: readonly ArtRect[] = [
  { left: 0.5104, top: 0.5996, width: 0.0716, height: 0.1455 },
  { left: 0.6341, top: 0.5996, width: 0.0716, height: 0.1455 },
  { left: 0.7617, top: 0.5996, width: 0.0677, height: 0.1455 },
];

// The boards sit low on the art, so keep them out of the default bottom fade
export const FACADE_WIDE_FADE = wideArtFade("black 82%, transparent 94%");

/**
 * Where the timetable is written on the boards: wide screens no squarer than
 * 4:3. The art is one screen tall and flush right, so on squarer screens it
 * slides left, under the title. Elsewhere the timetable is listed below.
 */
export const BOARDS_MEDIA = `@media (min-width: ${theme.breakpoints.values.lg}px) and (min-aspect-ratio: 4/3)`;
