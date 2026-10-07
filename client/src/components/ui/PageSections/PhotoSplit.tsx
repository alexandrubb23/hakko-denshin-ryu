import { Grid } from "@mui/material";

import FadeIn from "@components/ui/FadeIn/FadeIn";

import MistPhoto, { type MistPhotoProps } from "./MistPhoto";

const HALF = { xs: 12, md: 6 };
// The second column fades in just after the first
const SECOND_DELAY = 0.15;

interface Props {
  photo: MistPhotoProps;
  /** Put the photo on the left on wide screens; it always follows the text on narrow ones */
  photoFirst?: boolean;
  children: React.ReactNode;
}

/** Text and a photo side by side */
const PhotoSplit = ({ photo, photoFirst = false, children }: Props) => (
  <Grid container spacing={{ xs: 5, md: 8 }} sx={{ alignItems: "center" }}>
    <Grid size={HALF} sx={{ order: { md: photoFirst ? 1 : 0 } }}>
      <FadeIn delay={photoFirst ? SECOND_DELAY : 0}>{children}</FadeIn>
    </Grid>

    <Grid size={HALF}>
      <FadeIn delay={photoFirst ? 0 : SECOND_DELAY}>
        <MistPhoto {...photo} />
      </FadeIn>
    </Grid>
  </Grid>
);

export default PhotoSplit;
