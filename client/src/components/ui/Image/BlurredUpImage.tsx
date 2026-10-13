import { Box, styled, type SxProps, type Theme } from "@mui/material";

import useProgressiveImg, {
  type UseProgressiveImg,
} from "@hooks/useProgressiveImg";
import { mergeSx } from "@utils/sx";

import { blurUpStyle } from "./blurUp.style";

type BlurredUpImageProps = UseProgressiveImg & {
  sx?: SxProps<Theme>;
  className?: string;
  animate?: "fade" | "none";
  aspectRatio?: string;
  alt?: string;
};

const BoxStyled = styled(Box, {
  shouldForwardProp: (prop) => prop !== "blur",
})<{
  blur: boolean;
  component: React.ElementType;
  src: string;
  alt?: string;
}>(({ blur }) => ({
  ...blurUpStyle(blur),
  backfaceVisibility: "hidden",
  height: "100%",
  maxHeight: "100vh",
  MozBackfaceVisibility: "hidden",
  objectFit: "cover",
  objectPosition: "center",
  WebkitBackfaceVisibility: "hidden",
  width: "100%",
}));

const BlurredUpImage = ({
  alt,
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
      sx={mergeSx({ margin: "auto" }, sx)}
    >
      <BoxStyled
        blur={blur}
        component="img"
        src={src}
        alt={alt}
        className={className}
      />
    </Box>
  );
};

export default BlurredUpImage;
