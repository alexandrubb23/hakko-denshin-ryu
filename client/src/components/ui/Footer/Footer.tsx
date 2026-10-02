import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Box, Button, Container, Typography } from "@mui/material";

import FormattedMessage from "@components/ui/FormattedMessage/FormattedMessage";
import KanjiWatermark from "@components/ui/KanjiWatermark/KanjiWatermark";
import { DOJO_KANJI, DOJO_NAME, SITE_NAME } from "@constants/brand";

import {
  backToTopSx,
  bottomBarSx,
  bottomTextSx,
  footerGridSx,
  footerSx,
  footerWatermarkSx,
} from "./Footer.style";
import FooterBrand from "./FooterBrand";
import FooterContact from "./FooterContact";
import FooterExplore from "./FooterExplore";
import FooterHours from "./FooterHours";

const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

const Footer = () => (
  <Box component="footer" id="footer" sx={footerSx}>
    <KanjiWatermark kanji={DOJO_KANJI} sx={footerWatermarkSx} />
    <Container maxWidth="lg">
      <Box sx={footerGridSx}>
        <FooterBrand />
        <FooterExplore />
        <FooterHours />
        <FooterContact />
      </Box>

      <Box sx={bottomBarSx}>
        <Box>
          <Typography sx={bottomTextSx}>
            &copy; {new Date().getFullYear()} {DOJO_NAME} ·{" "}
            <FormattedMessage id="footer.copyrights" />
          </Typography>
          <Typography sx={bottomTextSx}>
            {SITE_NAME} · <FormattedMessage id="footer.affiliation" />
          </Typography>
        </Box>
        <Button
          size="small"
          onClick={scrollToTop}
          endIcon={<KeyboardArrowUpIcon />}
          sx={backToTopSx}
        >
          <FormattedMessage id="footer.backToTop" />
        </Button>
      </Box>
    </Container>
  </Box>
);

export default Footer;
