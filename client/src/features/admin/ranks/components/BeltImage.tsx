import { Box, Tooltip } from "@mui/material";

import { BELT_IMAGES } from "@assets/beltImages";

interface Props {
  belt: string;
}

const BeltImage = ({ belt }: Props) => (
  <Tooltip title={belt} placement="right">
    <Box
      component="img"
      src={BELT_IMAGES[belt] ?? BELT_IMAGES.white}
      alt={`${belt} belt`}
      sx={{
        height: 24,
        width: "auto",
        minWidth: 96,
        display: "block",
        objectFit: "contain",
      }}
    />
  </Tooltip>
);

export default BeltImage;
