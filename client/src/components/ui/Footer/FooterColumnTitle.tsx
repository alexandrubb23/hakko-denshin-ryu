import { Typography } from "@mui/material";
import type { IntlMessageID } from "i18n/messages";

import FormattedMessage from "@components/ui/FormattedMessage/FormattedMessage";

import { columnTitleSx } from "./Footer.style";

interface Props {
  id: IntlMessageID;
  /** Lets the column point at its title, e.g. with `aria-labelledby` */
  htmlId?: string;
}

const FooterColumnTitle = ({ id, htmlId }: Props) => (
  <Typography component="h2" id={htmlId} sx={columnTitleSx}>
    <FormattedMessage id={id} />
  </Typography>
);

export default FooterColumnTitle;
