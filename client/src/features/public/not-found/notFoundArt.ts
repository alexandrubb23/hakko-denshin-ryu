import src from "@assets/images/contact-path.webp";
import type { MoonArt } from "@components/ui/ArcNavMenu/moonArt";
import { wideArtFade } from "@components/ui/MoonCover/MoonCover.style";

// The moon above the lantern-lit path in contact-path.webp
export const LANTERN_PATH_MOON_ART: MoonArt = {
  src,
  aspect: 1536 / 1024,
  moonX: 0.7533,
  moonY: 0.2222,
  moonDiameter: 0.156,
};

// The path winds down to the foot of the art; keep it out of the bottom fade
export const LANTERN_PATH_FADE = wideArtFade("black 85%, transparent 100%");
