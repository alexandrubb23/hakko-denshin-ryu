import MediaItem from '@components/MediaObject/MediaItem';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const AddressMediaItem = () => {
  return (
    <MediaItem
      icon={LocationOnIcon}
      localeId={{
        title: 'page.contact.address.title',
        description: 'page.contact.address.description',
      }}
    />
  );
};

export default AddressMediaItem;
