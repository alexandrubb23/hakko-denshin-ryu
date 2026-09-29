import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router";

import FormattedMessage from "@components/ui/FormattedMessage/FormattedMessage";
import { descriptionSx } from "@components/ui/PublicPageHeader/PublicPageHeader.style";
import { Routes } from "@lib/routes";

import { ctaButtonSx, ctaSx, ctaTitleSx } from "./Schedule.style";

/** Invitation to get in touch, linking to the contact page. */
const ScheduleCta = () => (
  <Box sx={ctaSx}>
    <Box>
      <Typography component="h2" sx={ctaTitleSx}>
        <FormattedMessage id="page.schedule.cta.title" />
      </Typography>
      <Typography sx={descriptionSx}>
        <FormattedMessage id="page.schedule.cta.description" />
      </Typography>
    </Box>
    <Button
      component={Link}
      to={Routes.contact}
      variant="outlined"
      endIcon={<ArrowForwardIcon />}
      sx={ctaButtonSx}
    >
      <FormattedMessage id="page.schedule.cta.button" />
    </Button>
  </Box>
);

export default ScheduleCta;
