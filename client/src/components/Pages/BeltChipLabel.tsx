import { BELT_IMAGES } from "@assets/beltImages";
import Box from "@mui/material/Box";

interface Props {
  belt: string;
  name: string;
}

const BeltChipLabel = ({ belt, name }: Props) => (
  <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
    <Box
      component="img"
      src={BELT_IMAGES[belt] ?? BELT_IMAGES.white}
      alt={`${belt} belt`}
      sx={{
        height: 12,
        width: "auto",
        maxWidth: 32,
        objectFit: "cover",
        borderRadius: "2px",
        display: "block",
        flexShrink: 0,
      }}
    />
    {name}
  </Box>
);

export default BeltChipLabel;
