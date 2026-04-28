import WebAssetIcon from '@mui/icons-material/WebAsset';
import { Box, SvgIcon } from '@mui/material';

import MediaItem from '@components/MediaObject/MediaItem';
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import YouTubeIcon from '@mui/icons-material/YouTube';

const items = [
  {
    href: 'https://www.facebook.com/profile.php?id=61573820020885',
    icon: FacebookIcon,
  },
  {
    href: 'https://www.youtube.com/@HakkoDenshinRyuJuJutsuRomania',
    icon: YouTubeIcon,
  },
  {
    href: 'https://api.whatsapp.com/send?phone=+40735538558&text=Hi, I contacted you Through your website."',
    icon: WhatsAppIcon,
  },
];

const SocialMediaItem = () => {
  return (
    <MediaItem
      icon={WebAssetIcon}
      localeId={{
        title: 'page.contact.social.title',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          marginTop: 1,
        }}
      >
        {items.map(item => (
          <a href={item.href} target='_blank' key={item.href}>
            <SvgIcon component={item.icon} fontSize='small' />
          </a>
        ))}
      </Box>
    </MediaItem>
  );
};

export default SocialMediaItem;
