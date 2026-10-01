import { type SxProps, type Theme, Typography } from "@mui/material";
import type { ComponentProps } from "react";

import FormattedMessage from "@components/ui/FormattedMessage/FormattedMessage";
import { mergeSx } from "@utils/sx";

import type { IntlMessageID } from "i18n/messages";

import { bodyTextSx } from "./PageSections.style";

interface Props {
  ids: IntlMessageID[];
  /** Overrides for the body text, e.g. a larger closing line */
  sx?: SxProps<Theme>;
  /** Values (e.g. rich-text tags) for every message */
  values?: ComponentProps<typeof FormattedMessage>["values"];
}

/** Body text paragraphs, one per message */
const Paragraphs = ({ ids, sx, values }: Props) => {
  const textSx = mergeSx(bodyTextSx, sx);
  return ids.map((id) => (
    <Typography key={id} sx={textSx}>
      <FormattedMessage id={id} values={values} />
    </Typography>
  ));
};

export default Paragraphs;
