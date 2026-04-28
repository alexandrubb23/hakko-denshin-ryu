import { Box, Grid, Typography } from "@mui/material";

import hakkoDenshinRyuLowQualityImage from "@assets/images/200-small.webp";
import hakkoDenshinRyuHighQualityImage from "@assets/images/200.webp";
import BlurredUpImage from "@components/Image/BlurredUpImage";
import Strong from "@components/Layout/Strong";

const Dojo = () => {
  return (
    <Grid container spacing={2} alignItems="center">
      {/* Image first on mobile */}
      <Grid size={{ xs: 12, md: 6 }} order={{ xs: 0, md: 1 }}>
        <BlurredUpImage
          lowQualitySrc={hakkoDenshinRyuLowQualityImage}
          highQualitySrc={hakkoDenshinRyuHighQualityImage}
          sx={{
            aspectRatio: "auto 360 / 240",
          }}
        />
      </Grid>

      {/* Text content */}
      <Grid size={{ xs: 12, md: 6 }} order={{ xs: 1, md: 0 }}>
        <Typography color="primary" variant="h1" gutterBottom data-aos="fade">
          Senshinkan Romania (洗心館)
        </Typography>

        <Typography
          variant="body1"
          color="text.primary"
          align="left"
          data-aos="fade"
          sx={{ mb: 2 }}
        >
          <Strong>Senshinkan Romania</Strong> (洗心館) is the official Romanian
          dojo dedicated to the practice and teaching of{" "}
          <Strong>Hakko Denshin Ryu Jujutsu</Strong>. The name{" "}
          <Strong>"Senshinkan"</Strong> translates to{" "}
          <Strong>"Hall of Heart Purification"</Strong>
          or <Strong>"Place of Spiritual Cleansing"</Strong>, reflecting our
          commitment to both physical training and spiritual development.
        </Typography>

        <Typography
          variant="body1"
          color="text.primary"
          align="left"
          data-aos="fade"
          sx={{ mb: 2 }}
        >
          Our dojo follows the traditional teachings of{" "}
          <Strong>Hakko Denshin Ryu</Strong>, emphasizing the principles of{" "}
          <Strong>datsuryoku</Strong> (effortless power) and&nbsp;
          <Strong>harmony</Strong> in both technique and daily life. We maintain
          direct lineage connections to{" "}
          <Strong>Menkyo Kaiden Shihan Leempoels Eric San Dai Kichu</Strong>,
          ensuring authentic transmission of the art.
        </Typography>

        <Typography
          variant="body1"
          color="text.primary"
          align="left"
          data-aos="fade"
          sx={{ mb: 2 }}
        >
          At <Strong>Senshinkan Romania</Strong>, we offer comprehensive
          training in:
        </Typography>

        <Box
          component="ul"
          sx={{ pl: 3, mb: 2 }}
          display="flex"
          flexDirection="column"
          gap={1}
        >
          <Typography
            component="li"
            variant="body1"
            color="text.primary"
            data-aos="fade"
          >
            <Strong>Hakko Denshin Ryu Jujutsu</Strong> techniques and forms
          </Typography>
          <Typography
            component="li"
            variant="body1"
            color="text.primary"
            data-aos="fade"
          >
            <Strong>Traditional weapons training</Strong> (tambo, jo, katana,
            tanto, sensu)
          </Typography>
          <Typography
            component="li"
            variant="body1"
            color="text.primary"
            data-aos="fade"
          >
            <Strong>Shiatsu</Strong> therapeutic massage techniques
          </Typography>
          <Typography
            component="li"
            variant="body1"
            color="text.primary"
            data-aos="fade"
          >
            <Strong>Goshin Taiso</Strong> health and fitness exercises
          </Typography>
          <Typography
            component="li"
            variant="body1"
            color="text.primary"
            data-aos="fade"
          >
            <Strong>Meditation</Strong> and breathing practices
          </Typography>
        </Box>

        <Typography
          variant="body1"
          color="text.primary"
          align="left"
          data-aos="fade"
          sx={{ mb: 2 }}
        >
          Our training environment emphasizes <Strong>respect</Strong>,{" "}
          <Strong>discipline</Strong>, and <Strong>mutual growth</Strong>.
          Students learn not only effective self-defense techniques but also
          develop <Strong>mental clarity</Strong>,{" "}
          <Strong>emotional balance</Strong>, and{" "}
          <Strong>spiritual awareness</Strong> through consistent practice.
        </Typography>

        <Typography
          variant="body1"
          color="text.primary"
          align="left"
          data-aos="fade"
        >
          Whether you are a beginner seeking to learn the fundamentals of
          martial arts or an experienced practitioner looking to deepen your
          understanding,&nbsp;
          <Strong>Senshinkan Romania</Strong> provides a welcoming and
          traditional environment for your martial arts journey. We honor the
          legacy of our predecessors while adapting the teachings to serve the
          needs of modern practitioners.
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Dojo;
