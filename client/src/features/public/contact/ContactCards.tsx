import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WebAssetIcon from "@mui/icons-material/WebAsset";
import { Box, Typography } from "@mui/material";

import MediaItem from "@components/ui/MediaObject/MediaItem";
import CardGrid from "@components/ui/PageSections/CardGrid";
import KanjiCard from "@components/ui/PageSections/KanjiCard";

import type { IntlMessageID } from "i18n/messages";

import SocialLinks from "./SocialLinks";

import { contactItemSx } from "./Contact.style";

interface ContactItem {
  kanji: string;
  icon: React.ElementType;
  localeId: { title: IntlMessageID; description?: IntlMessageID };
  extra?: React.ReactNode;
}

const CONTACT_ITEMS: ContactItem[] = [
  {
    kanji: "所", // tokoro — the place
    icon: LocationOnIcon,
    localeId: {
      title: "page.contact.address.title",
      description: "page.contact.address.description",
    },
  },
  {
    kanji: "話", // hanashi — a talk
    icon: LocalPhoneIcon,
    localeId: {
      title: "page.contact.phone.title",
      description: "page.contact.phone.description",
    },
    extra: <Typography>Sensei Alexandru Barbulescu</Typography>,
  },
  {
    kanji: "文", // fumi — a letter
    icon: EmailIcon,
    localeId: {
      title: "page.contact.email.title",
      description: "page.contact.email.description",
    },
  },
  {
    kanji: "縁", // en — a bond, a connection
    icon: WebAssetIcon,
    localeId: { title: "page.contact.social.title" },
    extra: <SocialLinks />,
  },
];

/** One kanji card per way of reaching the dojo */
const ContactCards = () => (
  <CardGrid size={{ xs: 12 }} stagger={0.08}>
    {CONTACT_ITEMS.map(({ kanji, icon, localeId, extra }) => (
      <KanjiCard key={kanji} kanji={kanji}>
        <Box sx={contactItemSx}>
          <MediaItem icon={icon} localeId={localeId}>
            {extra}
          </MediaItem>
        </Box>
      </KanjiCard>
    ))}
  </CardGrid>
);

export default ContactCards;
