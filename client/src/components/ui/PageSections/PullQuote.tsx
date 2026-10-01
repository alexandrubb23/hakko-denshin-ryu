import { Box, Typography } from "@mui/material";

import FormattedMessage from "@components/ui/FormattedMessage/FormattedMessage";

import type { IntlMessageID } from "i18n/messages";

import { pullQuoteSx, quoteRuleSx } from "./PageSections.style";

interface Props {
  /** The quote, with its quotation marks and without diacritics (display font) */
  id: IntlMessageID;
  /** "blockquote" for a cited quote */
  component?: React.ElementType;
}

/** A quote in the display font, underlined by a short rule */
const PullQuote = ({ id, component = "p" }: Props) => (
  <>
    <Typography component={component} sx={pullQuoteSx}>
      <FormattedMessage id={id} />
    </Typography>
    <Box sx={quoteRuleSx} />
  </>
);

export default PullQuote;
