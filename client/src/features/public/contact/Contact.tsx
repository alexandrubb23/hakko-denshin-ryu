import { Box, Container, Divider, Grid, Typography } from "@mui/material";
import { motion } from "framer-motion";

import contactLowQualityImage from "@assets/images/254-small.webp";
import contactHighQualityImage from "@assets/images/254.webp";
import FormattedMessage from "@components/ui/FormattedMessage/FormattedMessage";
import BlurredUpImage from "@components/ui/Image/BlurredUpImage";

import AddressMediaItem from "./AddressMediaItem";
import EmailMediaItem from "./EmailMediaItem";
import PhoneMediaItem from "./PhoneMediaItem";
import ScheduleMediaItem from "./ScheduleMediaItem";
import SocialMediaItem from "./SocialMediaItem";

import {
  bgKanjiSx,
  contactBlockSx,
  contactBlockTitleSx,
  descriptionSx,
  dividerSx,
  eyebrowSx,
  imageSx,
  pageHeaderSx,
  pageKanjiSx,
  pageTitleSx,
} from "./Contact.style";

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];
const fadeUp = { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0 } };

const FadeIn = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-40px" }}
    variants={fadeUp}
    transition={{ duration: 0.7, ease: EASE_OUT, delay }}
  >
    {children}
  </motion.div>
);

const Contact = () => (
  <Box sx={{ position: "relative", overflow: "hidden" }}>
    {/* Background kanji watermark */}
    <Typography sx={bgKanjiSx} aria-hidden>
      連
    </Typography>

    <Container maxWidth="lg" disableGutters>
      {/* ── Page header ─────────────────────────────────────────────────── */}
      <Box sx={pageHeaderSx}>
        <FadeIn>
          <Typography sx={eyebrowSx}>Senshinkan · Romania</Typography>
          <Typography component="h1" sx={pageTitleSx}>
            <FormattedMessage id="page.contact.title" />
          </Typography>
          <Typography sx={pageKanjiSx}>連絡先</Typography>
          <Divider sx={dividerSx} />
          <Typography sx={descriptionSx}>
            <FormattedMessage id="page.contact.description" />
          </Typography>
        </FadeIn>
      </Box>

      {/* ── Content split ───────────────────────────────────────────────── */}
      <Grid container spacing={{ xs: 4, md: 6 }} alignItems="flex-start">
        {/* Contact items */}
        <Grid size={{ xs: 12, md: 6 }} order={{ xs: 1, md: 0 }}>
          <FadeIn delay={0.1}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Box sx={contactBlockSx}>
                <Typography sx={contactBlockTitleSx}>
                  Location &amp; Hours
                </Typography>
                <AddressMediaItem />
                <ScheduleMediaItem />
              </Box>
              <Box sx={contactBlockSx}>
                <Typography sx={contactBlockTitleSx}>Get in touch</Typography>
                <EmailMediaItem />
                <PhoneMediaItem />
                <SocialMediaItem />
              </Box>
            </Box>
          </FadeIn>
        </Grid>

        {/* Portrait image */}
        <Grid size={{ xs: 12, md: 6 }} order={{ xs: 0, md: 1 }}>
          <FadeIn>
            <BlurredUpImage
              lowQualitySrc={contactLowQualityImage}
              highQualitySrc={contactHighQualityImage}
              sx={imageSx}
            />
          </FadeIn>
        </Grid>
      </Grid>
    </Container>
  </Box>
);

export default Contact;
