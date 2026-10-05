import { SxProps, Theme } from "@mui/material";

import { mergeSx } from "@utils/sx";

import { lightSx } from "./lanternLight";

// Width over height of training-lantern(-unlit).webp
const LANTERN_ASPECT = 563 / 1497;

// Candlelight through the paper
const GLOW = "rgba(255, 176, 92, 0.55)";

/** Hangs `height` tall, centred on its anchor, from the top of `sx`'s box */
export const lanternSx = (height: string, sx?: SxProps<Theme>) =>
  mergeSx(
    {
      position: "absolute",
      height,
      aspectRatio: LANTERN_ASPECT,
      translate: "-50% 0",
      pointerEvents: "none",
      "& img": {
        position: "relative",
        display: "block",
        width: "100%",
        height: "100%",
      },
    },
    sx
  );

/** The candle's light, laid over the unlit lantern */
export const lanternLightSx = (lit: boolean) =>
  mergeSx(
    {
      position: "absolute",
      inset: 0,
      // The glow spills around the paper body, below the cord
      "&::before": {
        content: '""',
        position: "absolute",
        inset: "15% -90% -25%",
        background: `radial-gradient(closest-side, ${GLOW}, transparent)`,
      },
    },
    lightSx({
      lit,
      name: "lanternFlicker",
      property: "opacity",
      style: (opacity) => ({ opacity }),
      target: "&::before, & img",
    })
  );
