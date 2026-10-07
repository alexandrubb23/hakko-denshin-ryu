import { Box, Typography } from "@mui/material";

import LogoIcon from "@assets/images/logo.webp";
import FormattedMessage from "@components/ui/FormattedMessage/FormattedMessage";
import SocialLinks from "@components/ui/SocialLinks/SocialLinks";
import { roundIconLinkSx } from "@components/ui/SocialLinks/SocialLinks.style";
import TransitionLink from "@components/ui/TransitionLink/TransitionLink";
import { DOJO_KANJI, DOJO_NAME } from "@constants/brand";
import { Routes } from "@lib/routes";

import {
  brandKanjiSx,
  brandLinkSx,
  brandLogoSx,
  brandNameSx,
  brandTaglineSx,
  socialListSx,
} from "./Footer.style";

const FooterBrand = () => (
  <Box>
    <Box
      component={TransitionLink}
      to={Routes.home}
      aria-label={DOJO_NAME}
      sx={brandLinkSx}
    >
      <Box component="img" src={LogoIcon} alt="" sx={brandLogoSx} />
      <Box>
        <Typography sx={brandNameSx}>Senshinkan</Typography>
        <Typography sx={brandKanjiSx} lang="ja">
          {DOJO_KANJI} · Romania
        </Typography>
      </Box>
    </Box>
    <Typography sx={brandTaglineSx}>
      <FormattedMessage id="page.home.subtitle" />
    </Typography>
    <SocialLinks sx={socialListSx} linkSx={roundIconLinkSx} />
  </Box>
);

export default FooterBrand;
