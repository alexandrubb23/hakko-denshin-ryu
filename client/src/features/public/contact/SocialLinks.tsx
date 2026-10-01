import FacebookIcon from "@mui/icons-material/Facebook";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Box, SvgIcon } from "@mui/material";

import { socialLinksSx } from "./Contact.style";

const LINKS = [
  {
    href: "https://www.facebook.com/profile.php?id=61573820020885",
    icon: FacebookIcon,
  },
  {
    href: "https://www.youtube.com/@HakkoDenshinRyuJuJutsuRomania",
    icon: YouTubeIcon,
  },
  {
    href: 'https://api.whatsapp.com/send?phone=+40735538558&text=Hi, I contacted you Through your website."',
    icon: WhatsAppIcon,
  },
];

const SocialLinks = () => (
  <Box sx={socialLinksSx}>
    {LINKS.map(({ href, icon }) => (
      <a href={href} target="_blank" key={href}>
        <SvgIcon component={icon} fontSize="small" />
      </a>
    ))}
  </Box>
);

export default SocialLinks;
