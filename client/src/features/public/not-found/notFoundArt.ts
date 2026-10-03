import src from "@assets/images/not-found-crossroads.webp";
import type { MoonArt } from "@components/ui/ArcNavMenu/moonArt";
import { wideArtFade } from "@components/ui/MoonCover/MoonCover.style";

// The moon above the lost martial artist's crossroads in not-found-crossroads.webp
export const LANTERN_PATH_MOON_ART: MoonArt = {
  src,
  aspect: 1536 / 1024,
  moonX: 0.7318,
  moonY: 0.2227,
  moonDiameter: 0.172,
};

// The figure stands near the foot of the art; keep it out of the bottom fade
export const LANTERN_PATH_FADE = wideArtFade("black 85%, transparent 100%");
