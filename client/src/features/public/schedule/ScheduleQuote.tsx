import { Box, Typography } from "@mui/material";

import FormattedMessage from "@components/ui/FormattedMessage/FormattedMessage";

import {
  quoteAuthorSx,
  quoteMarkSx,
  quoteMoralSx,
  quoteSx,
  quoteTextSx,
} from "./Schedule.style";

const ScheduleQuote = () => (
  <Box component="figure" sx={quoteSx}>
    <Typography sx={quoteMarkSx} aria-hidden>
      “
    </Typography>
    <Typography component="blockquote" sx={quoteTextSx}>
      <FormattedMessage id="page.schedule.quote.text" />
    </Typography>
    <Box component="figcaption">
      <Typography component="cite" sx={quoteAuthorSx}>
        Marcus Aurelius
      </Typography>
      <Typography sx={quoteMoralSx}>
        <FormattedMessage id="page.schedule.quote.moral" />
      </Typography>
    </Box>
  </Box>
);

export default ScheduleQuote;
