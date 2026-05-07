import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

interface DotProps {
  size: number;
  color: string;
}

const Dot = styled(Box, {
  shouldForwardProp: (prop) => prop !== "size" && prop !== "color",
})<DotProps>(({ size, color }) => ({
  width: size,
  height: size,
  borderRadius: "50%",
  backgroundColor: color,
  flexShrink: 0,
}));

export { Dot };
