import { SxProps, Theme } from "@mui/material";

// The petals' colours, sampled from those drifting in the Senshinkan paintings
// (senshinkan-basin.webp, senshinkan-garden.webp): a pale tip, a deeper base
export const PETAL_LIGHT = "#cdb9e4";
export const PETAL_BASE = "#9a82b4";
export const PETAL_DEEP = "#7d6699";

// An almond-shaped petal, barely notched at its tip like the painted ones,
// used as a mask over a gradient
const PETAL_MASK = `url("data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 24"><path d="M10 24C4.5 21 2 15 2.5 9C3 4.5 6 1.5 9 1.6L10 2.6L11 1.6C14 1.5 17 4.5 17.5 9C18 15 15.5 21 10 24Z"/></svg>'
)}")`;

// Covers its parent (which must be `position: relative`) and sizes the fall
// in `cqh`, so a petal crosses the whole of a cover or a band alike
export const petalsSx: SxProps<Theme> = {
  position: "absolute",
  inset: 0,
  zIndex: 2,
  overflow: "hidden",
  pointerEvents: "none",
  containerType: "size",
  "@media (prefers-reduced-motion: reduce)": { display: "none" },

  "@keyframes petalFall": {
    "0%": { translate: "0 0", opacity: 0 },
    "8%": { opacity: "var(--petal-opacity)" },
    "88%": { opacity: "var(--petal-opacity)" },
    "100%": { translate: "var(--petal-drift) 112cqh", opacity: 0 },
  },
  "@keyframes petalSway": {
    from: { translate: "calc(var(--petal-sway) * -1) 0" },
    to: { translate: "var(--petal-sway) 0" },
  },
  // Turning and tumbling: edge-on halfway through each flip, so it glints
  "@keyframes petalTumble": {
    from: { transform: "rotateZ(var(--petal-turn-from)) rotateX(0deg)" },
    to: { transform: "rotateZ(var(--petal-turn-to)) rotateX(720deg)" },
  },
};

// One petal's fall, from just above the top; its timing and path come from
// the custom properties set on it
export const petalFallSx: SxProps<Theme> = {
  position: "absolute",
  top: "-6%",
  left: "var(--petal-x)",
  animation: "petalFall var(--petal-fall) linear var(--petal-delay) infinite",
};

export const petalSwaySx: SxProps<Theme> = {
  animation: "petalSway var(--petal-sway-time) ease-in-out infinite alternate",
};

export const petalSx: SxProps<Theme> = {
  display: "block",
  width: "var(--petal-size)",
  aspectRatio: "20 / 24",
  background: `linear-gradient(170deg, ${PETAL_LIGHT} 0%, ${PETAL_BASE} 55%, ${PETAL_DEEP} 100%)`,
  maskImage: PETAL_MASK,
  maskSize: "contain",
  maskRepeat: "no-repeat",
  filter: "var(--petal-blur)",
  animation: "petalTumble var(--petal-tumble) linear infinite",
};
