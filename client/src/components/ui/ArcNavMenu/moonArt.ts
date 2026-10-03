import type { SxProps, Theme } from "@mui/material";

/** Which way the arc fans out from the moon */
export type ArcDirection = "left" | "right";

/** A painting with a moon the arc menu can sit on */
export interface MoonArt {
  src: string;
  /** width / height */
  aspect: number;
  /** Moon centre, as fractions of the width and the height */
  moonX: number;
  moonY: number;
  /** Moon diameter, as a fraction of the height */
  moonDiameter: number;
  /**
   * How far down the moon must sit on wide screens, as a fraction of the
   * screen height, so the menu fits above it; lower it for art whose
   * subject sits low and would otherwise drop off the screen
   */
  minMoonTop?: number;
}

/** A rectangle painted on the art, as fractions of its width and height */
export interface ArtRect {
  left: number;
  top: number;
  width: number;
  height: number;
}

/** Places an element (absolutely) exactly over `rect` on the art */
export const rectOnArt = ({ left, top, width, height }: ArtRect) =>
  ({
    position: "absolute",
    left: `${left * 100}%`,
    top: `${top * 100}%`,
    width: `${width * 100}%`,
    height: `${height * 100}%`,
  }) as const;

/** A painting behind the arc menu, with its own styles (fade, visibility…) */
export interface Painting {
  art: MoonArt;
  sx?: SxProps<Theme>;
  /**
   * Laid exactly over the painting, in front of the menu, and shown, faded
   * and clipped as the painting is, e.g. petals drifting down over it
   */
  overlay?: React.ReactNode;
}

/** CSS width of the art when it is `height` tall */
export const artWidth = (art: MoonArt, height: string) =>
  `calc(${height} * ${art.aspect.toFixed(4)})`;

/** CSS height of the art whose moon is `moonSize` wide */
export const artHeight = (art: MoonArt, moonSize: string) =>
  `calc(${moonSize} / ${art.moonDiameter})`;

/**
 * The menu's moon is its first flex item (the last when fanning left), so
 * it sits on the menu's left (right) edge. Returns that edge and how far
 * from it the painted moon lies, as a fraction of the art's width.
 */
export const moonEdge = (art: MoonArt, direction: ArcDirection) =>
  direction === "left"
    ? { edge: "right" as const, fromEdge: (1 - art.moonX).toFixed(4) }
    : { edge: "left" as const, fromEdge: art.moonX.toFixed(4) };

/**
 * Sizes and places the menu (absolutely) so its moon lies on the painted
 * moon of an art `height` tall, `top` from the top and flush with the
 * container's edge on the moon's side.
 */
export const menuOnArt = (
  art: MoonArt,
  direction: ArcDirection,
  height: string,
  top = "0px"
) => {
  const { edge, fromEdge } = moonEdge(art, direction);

  return {
    "--moon-size": `calc(${height} * ${art.moonDiameter})`,
    position: "absolute",
    top: `calc(${top} + ${height} * ${art.moonY})`,
    [edge]: `calc(${artWidth(art, height)} * ${fromEdge} - var(--moon-size) / 2)`,
    translate: "0 -50%",
  } as const;
};
