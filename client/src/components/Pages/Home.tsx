import img180 from "@assets/images/180.webp";
import FormattedMessage from "@components/FormattedMessage/FormattedMessage";
import Quotes from "@components/Quotes/Quotes";
import { Box, Container, Divider, Typography } from "@mui/material";

import { motion } from "framer-motion";
import { useEffect } from "react";

import {
  badgeLabelSx,
  badgeSx,
  bottomAccentSx,
  containerSx,
  dividerSx,
  glowBlobSx,
  headingAccentSx,
  headingSx,
  heroWrapperSx,
  overlayGradientSx,
  pulseDotSx,
  subtitleSx,
  tilesBgSx,
  topAccentSx,
} from "./Home.style";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const Home = () => {
  // Prevent page scroll on the full-screen hero
  useEffect(() => {
    document.documentElement.style.overflowY = "hidden";
    return () => {
      document.documentElement.style.overflowY = "";
    };
  }, []);

  return (
    <Box sx={heroWrapperSx}>
      {/* Portrait image tiled horizontally like a filmstrip */}
      <Box
        sx={{ ...tilesBgSx, backgroundImage: `url(${img180})` }}
        role="presentation"
        aria-hidden
      />

      {/* Dark radial vignette to keep content readable */}
      <Box sx={overlayGradientSx} aria-hidden />

      {/* Top purple glow line */}
      <Box sx={topAccentSx} aria-hidden />

      {/* Bottom subtle line */}
      <Box sx={bottomAccentSx} aria-hidden />

      <Container maxWidth="md" sx={containerSx}>
        {/* Ambient purple glow behind the text */}
        <Box sx={glowBlobSx} aria-hidden />

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ width: "100%", position: "relative", zIndex: 1 }}
        >
          {/* Pill badge */}
          <Box sx={badgeSx}>
            <Box sx={pulseDotSx} />
            <Typography variant="caption" sx={badgeLabelSx}>
              Senshinkan Romania
            </Typography>
          </Box>

          {/* Main heading */}
          <Typography variant="h1" align="center" sx={headingSx}>
            Hakko Denshin Ryu{" "}
            <Box component="span" sx={headingAccentSx}>
              Ju Jutsu
            </Box>
          </Typography>

          {/* Subtitle */}
          <Typography variant="h2Inter" align="center" sx={subtitleSx}>
            <FormattedMessage id="page.home.subtitle" />
          </Typography>
        </motion.div>

        {/* Animated horizontal rule */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.55, delay: 0.5, ease: "easeOut" }}
          style={{ width: 80, marginTop: 16, marginBottom: 8 }}
        >
          <Divider sx={dividerSx} />
        </motion.div>

        {/* Cycling martial arts quotes */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          style={{
            width: "100%",
            maxWidth: 580,
            position: "relative",
            zIndex: 1,
          }}
        >
          <Quotes />
        </motion.div>
      </Container>
    </Box>
  );
};

export default Home;
