import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Box } from "@mui/material";

import FormattedMessage from "@components/ui/FormattedMessage/FormattedMessage";
import {
  EMAIL_HREF,
  MAP_URL,
  PHONE_HREF,
  SENSEI_NAME,
} from "@constants/contact";
import { Routes } from "@lib/routes";

import { addressSx, contactListSx } from "./Footer.style";
import FooterColumnTitle from "./FooterColumnTitle";
import FooterContactItem from "./FooterContactItem";
import FooterMoreLink from "./FooterMoreLink";

const FooterContact = () => (
  <Box>
    <FooterColumnTitle id="footer.contact.title" />
    {/* <address> holds the contact details only, not headings or other links */}
    <Box component="address" sx={addressSx}>
      <Box component="ul" sx={contactListSx}>
        <FooterContactItem
          icon={LocationOnIcon}
          href={MAP_URL}
          external
          note={<FormattedMessage id="footer.contact.directions" />}
        >
          <FormattedMessage id="page.contact.address.description" />
        </FooterContactItem>
        <FooterContactItem
          icon={LocalPhoneIcon}
          href={PHONE_HREF}
          note={SENSEI_NAME}
        >
          <FormattedMessage id="page.contact.phone.description" />
        </FooterContactItem>
        <FooterContactItem icon={EmailIcon} href={EMAIL_HREF}>
          <FormattedMessage id="page.contact.email.description" />
        </FooterContactItem>
      </Box>
    </Box>
    <FooterMoreLink to={Routes.contact} id="footer.contact.link" />
  </Box>
);

export default FooterContact;
