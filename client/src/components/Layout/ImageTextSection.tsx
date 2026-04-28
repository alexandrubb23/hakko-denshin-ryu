import { Grid, Typography } from "@mui/material";

import BlurredUpImage from "@components/Image/BlurredUpImage";
import { Section } from "./SectionsList";

export const ImageTextSection = ({
  image,
  children,
  imageFirstOnMobile = true,
  imageFirstOnDesktop = false,
  sectionTitle,
}: Section) => {
  return (
    <Grid container spacing={2} alignItems="center">
      <Grid
        size={{ xs: 12, md: 6 }}
        order={{
          xs: imageFirstOnMobile ? 0 : 1,
          md: imageFirstOnDesktop ? 0 : 1,
        }}
      >
        <BlurredUpImage
          lowQualitySrc={image.lowQualitySrc}
          highQualitySrc={image.highQualitySrc}
          sx={image.sx}
        />
      </Grid>

      <Grid
        size={{ xs: 12, md: 6 }}
        order={{
          xs: imageFirstOnMobile ? 1 : 0,
          md: imageFirstOnDesktop ? 1 : 0,
        }}
        display="flex"
        flexDirection="column"
        gap={2}
        sx={{
          a: { color: "#ab96ff" },
        }}
      >
        <Typography
          color="primary"
          padding="0 16px"
          margin="0"
          variant="h1"
          gutterBottom
        >
          {sectionTitle}
        </Typography>
        {children}
      </Grid>
    </Grid>
  );
};

export default ImageTextSection;
