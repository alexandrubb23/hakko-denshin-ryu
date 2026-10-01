import src from "@assets/images/dojo-locked.webp";
import type { ArtRect, MoonArt } from "@components/ui/ArcNavMenu/moonArt";
import { wideArtFade } from "@components/ui/MoonCover/MoonCover.style";

// The moon above the locked dojo door in dojo-locked.webp
export const LOCKED_DOOR_ART: MoonArt = {
  src,
  aspect: 1536 / 1024,
  moonX: 0.8001,
  moonY: 0.1494,
  moonDiameter: 0.105,
  // Lowered less than other covers, so the door stays on screen
  minMoonTop: 0.26,
};

// The plain lower part of the door, below the chain and padlock
export const DOOR_PANEL: ArtRect = {
  left: 0.61,
  top: 0.64,
  width: 0.235,
  height: 0.2,
};

// The door reaches the foot of the art; keep it out of the bottom fade
export const LOCKED_DOOR_FADE = wideArtFade("black 90%, transparent 100%");
