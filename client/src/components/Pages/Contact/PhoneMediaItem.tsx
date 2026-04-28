import { Typography } from '@mui/material';

import MediaItem from '@components/MediaObject/MediaItem';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';

const PhoneMediaItem = () => {
  return (
    <MediaItem
      icon={LocalPhoneIcon}
      localeId={{
        title: 'page.contact.phone.title',
        description: 'page.contact.phone.description',
      }}
    >
      <Typography>Sensei Alexandru Barbulescu</Typography>
    </MediaItem>
  );
};

export default PhoneMediaItem;
