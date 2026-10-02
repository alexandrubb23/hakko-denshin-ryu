import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Box } from "@mui/material";
import type { IntlMessageID } from "i18n/messages";

import FormattedMessage from "@components/ui/FormattedMessage/FormattedMessage";
import TransitionLink from "@components/ui/TransitionLink/TransitionLink";

import { moreLinkSx } from "./Footer.style";

interface Props {
  to: string;
  id: IntlMessageID;
}

/** "Full schedule →", closing a column with the page that says more */
const FooterMoreLink = ({ to, id }: Props) => (
  <Box component={TransitionLink} to={to} sx={moreLinkSx}>
    <FormattedMessage id={id} />
    <ArrowForwardIcon />
  </Box>
);

export default FooterMoreLink;
