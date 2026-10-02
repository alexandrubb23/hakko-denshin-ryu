import FacebookIcon from "@mui/icons-material/Facebook";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import YouTubeIcon from "@mui/icons-material/YouTube";

// Ways of reaching the dojo; the displayed address, phone and e-mail live in
// the locales

const PHONE = "+40735538558";

const WHATSAPP_TEXT = "Hi, I contacted you through your website.";

/** Answers the phone listed on the contact page and in the footer */
export const SENSEI_NAME = "Sensei Alexandru Barbulescu";

export const PHONE_HREF = `tel:${PHONE}`;

export const EMAIL_HREF = "mailto:contact@senshinkan.ro";

export const MAP_URL =
  "https://www.google.com/maps/search/?api=1&query=Aleea+Paradisul+Verde+2,+Corbeanca,+Romania";

export const SOCIAL_LINKS = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61573820020885",
    icon: FacebookIcon,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@HakkoDenshinRyuJuJutsuRomania",
    icon: YouTubeIcon,
  },
  {
    label: "WhatsApp",
    // wa.me takes the number as digits only
    href: `https://wa.me/${PHONE.slice(1)}?text=${encodeURIComponent(WHATSAPP_TEXT)}`,
    icon: WhatsAppIcon,
  },
] as const;
