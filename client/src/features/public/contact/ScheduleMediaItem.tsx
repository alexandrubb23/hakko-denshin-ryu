import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import MediaItem from '@components/ui/MediaObject/MediaItem';

const ScheduleMediaItem = () => (
  <MediaItem
    icon={CalendarMonthIcon}
    localeId={{
      title: 'page.contact.schedule.title',
      description: 'page.contact.schedule.description',
    }}
  />
);

export default ScheduleMediaItem;
