import { Box } from "@mui/material";
import { SxProps, Theme } from "@mui/material/styles";
import { useMemo } from "react";

import { mergeSx } from "@utils/sx";

import {
  petalFallSx,
  petalSwaySx,
  petalSx,
  petalsSx,
} from "./FallingPetals.style";
import { makePetals, type PetalDrift } from "./petals";

interface Props {
  /** How many petals fall at once */
  count?: number;
  /**
   * Which way the breeze carries them: away from the painting's tree, e.g.
   * right for a tree in the upper left; defaults to the left
   */
  drift?: PetalDrift;
  sx?: SxProps<Theme>;
}

/**
 * Blossom petals drifting down over a painted scene, in front of its
 * content; the parent must be `position: relative`. Hidden for reduced motion.
 */
const FallingPetals = ({ count = 50, drift = "left", sx }: Props) => {
  const petals = useMemo(() => makePetals(count, drift), [count, drift]);

  return (
    <Box sx={mergeSx(petalsSx, sx)} aria-hidden>
      {petals.map((style, index) => (
        <Box key={index} sx={petalFallSx} style={style as React.CSSProperties}>
          <Box sx={petalSwaySx}>
            <Box component="span" sx={petalSx} />
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default FallingPetals;
