import { type SxProps, type Theme, Typography } from "@mui/material";

import FormattedMessage from "@components/ui/FormattedMessage/FormattedMessage";
import { mergeSx } from "@utils/sx";

import type { IntlMessageID } from "i18n/messages";

import { bodyTextSx } from "./PageSections.style";

interface Props {
  ids: IntlMessageID[];
  /** Overrides for the body text, e.g. a larger closing line */
  sx?: SxProps<Theme>;
}

/** Body text paragraphs, one per message */
const Paragraphs = ({ ids, sx }: Props) =>
  ids.map((id) => (
    <Typography key={id} sx={mergeSx(bodyTextSx, sx)}>
      <FormattedMessage id={id} />
    </Typography>
  ));

export default Paragraphs;
