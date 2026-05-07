import MediaItem from "@components/ui/MediaObject/MediaItem";
import EmailIcon from "@mui/icons-material/Email";

const EmailMediaItem = () => {
  return (
    <MediaItem
      icon={EmailIcon}
      localeId={{
        title: "page.contact.email.title",
        description: "page.contact.email.description",
      }}
    />
  );
};

export default EmailMediaItem;
