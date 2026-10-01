import { Box, Typography } from "@mui/material";

import FormattedMessage from "@components/ui/FormattedMessage/FormattedMessage";
import LinkButton from "@components/ui/PageSections/LinkButton";
import { Routes } from "@lib/routes";

import {
  ctaButtonSx,
  ctaDescriptionSx,
  ctaSx,
  ctaTitleSx,
} from "./Schedule.style";

/** Invitation to get in touch, linking to the contact page. */
const ScheduleCta = () => (
  <Box sx={ctaSx}>
    <Box>
      <Typography component="h2" sx={ctaTitleSx}>
        <FormattedMessage id="page.schedule.cta.title" />
      </Typography>
      <Typography sx={ctaDescriptionSx}>
        <FormattedMessage id="page.schedule.cta.description" />
      </Typography>
    </Box>
    <LinkButton to={Routes.contact} sx={ctaButtonSx}>
      <FormattedMessage id="page.schedule.cta.button" />
    </LinkButton>
  </Box>
);

export default ScheduleCta;
