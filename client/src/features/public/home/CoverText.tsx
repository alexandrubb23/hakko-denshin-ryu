import FormattedMessage from "@components/ui/FormattedMessage/FormattedMessage";
import KanjiRule from "@components/ui/KanjiRule/KanjiRule";
import Quotes from "@components/ui/Quotes/Quotes";
import { Box, Typography, type SxProps, type Theme } from "@mui/material";
import { coverTaglineSx } from "@style/art";
import { mergeSx } from "@utils/sx";

import {
  coverCaptionSx,
  coverCountrySx,
  coverQuotesStartSx,
  coverQuotesSx,
  coverRuleSx,
  coverTitleSx,
} from "./CoverText.style";

const CENTERED_SX = { mx: "auto" };

/** Caption, "Senshinkan" and "Romania"; follows the parent's `textAlign` */
export const CoverTitle = () => (
  <>
    <Typography sx={coverCaptionSx}>Hakko Denshin Ryu Jujutsu</Typography>
    <Typography component="h1" sx={coverTitleSx}>
      Senshinkan
    </Typography>
    <Typography sx={coverCountrySx}>Romania</Typography>
  </>
);

interface CoverMottoProps {
  align: "start" | "center";
  /** Overrides for the cycling quotes, e.g. their height */
  quotesSx?: SxProps<Theme>;
}

/** 八光伝心流柔術 rule, the tagline and the cycling quotes */
export const CoverMotto = ({ align, quotesSx }: CoverMottoProps) => {
  const isCentered = align === "center";

  return (
    <>
      <KanjiRule sx={mergeSx(coverRuleSx, isCentered && CENTERED_SX)} />

      <Typography sx={mergeSx(coverTaglineSx, { textAlign: align })}>
        <FormattedMessage id="page.home.subtitle" />
      </Typography>

      <Box
        sx={mergeSx(
          coverQuotesSx,
          isCentered ? CENTERED_SX : coverQuotesStartSx,
          quotesSx
        )}
      >
        <Quotes />
      </Box>
    </>
  );
};
