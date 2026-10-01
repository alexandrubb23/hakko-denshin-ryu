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
