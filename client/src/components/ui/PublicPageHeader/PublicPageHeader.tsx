import { Box, Divider, Typography } from "@mui/material";

import FadeIn from "@components/ui/FadeIn/FadeIn";
import FormattedMessage from "@components/ui/FormattedMessage/FormattedMessage";
import type { IntlMessageID } from "i18n/messages";

import {
  descriptionSx,
  dividerSx,
  eyebrowSx,
  pageHeaderSx,
  pageKanjiSx,
  pageTitleSx,
} from "./PublicPageHeader.style";

interface PublicPageHeaderProps {
  titleId: IntlMessageID;
  /** Japanese subtitle shown under the title. */
  kanji: string;
  descriptionId?: IntlMessageID;
}

/** Eyebrow, h1, kanji subtitle, divider and optional lead text of a public page. */
const PublicPageHeader = ({
  titleId,
  kanji,
  descriptionId,
}: PublicPageHeaderProps) => (
  <Box sx={pageHeaderSx}>
    <FadeIn>
      <Typography sx={eyebrowSx}>Senshinkan · Romania</Typography>
      <Typography component="h1" sx={pageTitleSx}>
        <FormattedMessage id={titleId} />
      </Typography>
      <Typography sx={pageKanjiSx}>{kanji}</Typography>
      <Divider sx={dividerSx(!!descriptionId)} />
      {descriptionId && (
        <Typography sx={descriptionSx}>
          <FormattedMessage id={descriptionId} />
        </Typography>
      )}
    </FadeIn>
  </Box>
);

export default PublicPageHeader;
