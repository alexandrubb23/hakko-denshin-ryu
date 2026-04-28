import { Typography } from '@mui/material';
import MediaObject from './MediaObject';

import type { MediaObjectProps } from './MediaObject';
import { PropsWithChildren } from 'react';
import type { IntlMessageID } from 'i18n/messages';
import FormattedMessage from '@components/FormattedMessage/FormattedMessage';

interface MediaItemProps extends MediaObjectProps {
  localeId: {
    title: IntlMessageID;
    description?: IntlMessageID;
  };
}

const MediaItem = ({
  children,
  icon,
  localeId,
}: PropsWithChildren<MediaItemProps>) => {
  return (
    <MediaObject icon={icon}>
      <Typography variant='h6'>
        <FormattedMessage id={localeId.title} />
      </Typography>
      {localeId.description && (
        <Typography
          variant='body1'
          sx={{
            span: {
              display: 'block',
            },
          }}
        >
          <FormattedMessage id={localeId.description} />
        </Typography>
      )}
      {children}
    </MediaObject>
  );
};

export default MediaItem;
