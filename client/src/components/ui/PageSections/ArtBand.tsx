import { Box, Container } from "@mui/material";

import FadeIn from "@components/ui/FadeIn/FadeIn";

import { artBandContentSx, artBandSx } from "./PageSections.style";

interface Props {
  /** A painting with its subject on the right and its left side dark */
  src: string;
  children: React.ReactNode;
}

/** A full-width strip over a painting, its content on the dark left side */
const ArtBand = ({ src, children }: Props) => (
  <Box sx={artBandSx(src)}>
    <Container maxWidth="lg">
      <Box sx={artBandContentSx}>
        <FadeIn>{children}</FadeIn>
      </Box>
    </Container>
  </Box>
);

export default ArtBand;
