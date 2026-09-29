import { Box, Container, Grid, Typography } from "@mui/material";

import contactLowQualityImage from "@assets/images/254-small.webp";
import contactHighQualityImage from "@assets/images/254.webp";
import FadeIn from "@components/ui/FadeIn/FadeIn";
import FormattedMessage from "@components/ui/FormattedMessage/FormattedMessage";
import BlurredUpImage from "@components/ui/Image/BlurredUpImage";
import KanjiWatermark from "@components/ui/KanjiWatermark/KanjiWatermark";
import PublicPageHeader from "@components/ui/PublicPageHeader/PublicPageHeader";

import AddressMediaItem from "./AddressMediaItem";
import EmailMediaItem from "./EmailMediaItem";
import PhoneMediaItem from "./PhoneMediaItem";
import ScheduleMediaItem from "./ScheduleMediaItem";
import SocialMediaItem from "./SocialMediaItem";

import { contactBlockSx, contactBlockTitleSx, imageSx } from "./Contact.style";

const Contact = () => (
  <Box sx={{ position: "relative", overflow: "hidden" }}>
    {/* Background kanji watermark */}
    <KanjiWatermark kanji="連" />

    <Container maxWidth="lg" disableGutters>
      {/* ── Page header ─────────────────────────────────────────────────── */}
      <PublicPageHeader
        titleId="page.contact.title"
        kanji="連絡先"
        descriptionId="page.contact.description"
      />

      {/* ── Content split ───────────────────────────────────────────────── */}
      <Grid container spacing={{ xs: 4, md: 6 }} alignItems="flex-start">
        {/* Contact items */}
        <Grid size={{ xs: 12, md: 6 }} order={{ xs: 1, md: 0 }}>
          <FadeIn delay={0.1}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Box sx={contactBlockSx}>
                <Typography sx={contactBlockTitleSx}>
                  <FormattedMessage id="page.contact.block.location" />
                </Typography>
                <AddressMediaItem />
                <ScheduleMediaItem />
              </Box>
              <Box sx={contactBlockSx}>
                <Typography sx={contactBlockTitleSx}>
                  <FormattedMessage id="page.contact.block.touch" />
                </Typography>
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
