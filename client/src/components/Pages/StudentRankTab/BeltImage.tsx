import { Box, Tooltip } from "@mui/material";

import beltBlack  from "@assets/belts/black.png";
import beltBlue   from "@assets/belts/blue.png";
import beltBrown  from "@assets/belts/brown.png";
import beltGreen  from "@assets/belts/green.png";
import beltOrange from "@assets/belts/orange.png";
import beltWhite  from "@assets/belts/white.png";
import beltYellow from "@assets/belts/yellow.png";

const BELT_IMAGES: Record<string, string> = {
  white:  beltWhite,
  yellow: beltYellow,
  orange: beltOrange,
  green:  beltGreen,
  blue:   beltBlue,
  brown:  beltBrown,
  black:  beltBlack,
};

interface Props {
  belt: string;
}

const BeltImage = ({ belt }: Props) => (
  <Tooltip title={belt} placement="right">
    <Box
      component="img"
      src={BELT_IMAGES[belt] ?? BELT_IMAGES.white}
      alt={`${belt} belt`}
      sx={{ height: 40, width: "auto", display: "block" }}
    />
  </Tooltip>
);

export default BeltImage;
