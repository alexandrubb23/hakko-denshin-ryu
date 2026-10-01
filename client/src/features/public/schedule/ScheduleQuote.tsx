import { Box, Typography } from "@mui/material";

import FormattedMessage from "@components/ui/FormattedMessage/FormattedMessage";
import { bodyTextSx } from "@components/ui/PageSections/PageSections.style";
import PullQuote from "@components/ui/PageSections/PullQuote";

import { quoteAuthorSx, quoteSx } from "./Schedule.style";

const ScheduleQuote = () => (
  <Box component="figure" sx={quoteSx}>
    <PullQuote id="page.schedule.quote.text" component="blockquote" />
    <Box component="figcaption">
      <Typography component="cite" sx={quoteAuthorSx}>
        Marcus Aurelius
      </Typography>
      <Typography sx={bodyTextSx}>
        <FormattedMessage id="page.schedule.quote.moral" />
      </Typography>
    </Box>
  </Box>
);

export default ScheduleQuote;
