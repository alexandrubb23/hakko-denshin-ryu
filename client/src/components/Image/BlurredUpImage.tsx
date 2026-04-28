import { Box, styled } from "@mui/material";

import useProgressiveImg, {
  type UseProgressiveImg,
} from "@hooks/useProgressiveImg";
import type { SxThemeProps } from "types/style";

type BlurredUpImageProps = UseProgressiveImg & {
  // TODO: Remove sx
  sx?: SxThemeProps;
  className?: string;
  animate?: "fade" | "none";
  aspectRatio?: string;
};

const BoxStyled = styled(Box, {
  shouldForwardProp: (prop) => prop !== "blur",
})<{ blur: boolean; component: React.ElementType; src: string }>(
  ({ blur }) => ({
    backfaceVisibility: "hidden",
    filter: blur ? "blur(10px)" : "none",
    height: "100%",
    maxHeight: "100vh",
    MozBackfaceVisibility: "hidden",
    objectFit: "cover",
    objectPosition: "center",
    transition: blur ? "none" : "filter 0.3s ease-out",
    WebkitBackfaceVisibility: "hidden",
    width: "100%",
    willChange: "filter",
  }),
);

const BlurredUpImage = ({
  animate = "fade",
  className,
  highQualitySrc,
  lowQualitySrc,
  sx,
}: BlurredUpImageProps) => {
  const [src, { blur }] = useProgressiveImg({
    lowQualitySrc,
    highQualitySrc,
  });

  if (!src) return null;

  return (
    <Box
      data-aos={!blur ? animate : "none"}
      sx={{
        ...(sx || {}),
      }}
      margin="auto"
    >
      <BoxStyled blur={blur} component="img" src={src} className={className} />
    </Box>
  );
};

export default BlurredUpImage;
