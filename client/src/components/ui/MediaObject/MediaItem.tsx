import { Typography } from "@mui/material";
import type { IntlMessageID } from "i18n/messages";
import { PropsWithChildren } from "react";

import FormattedMessage from "@components/ui/FormattedMessage/FormattedMessage";
import type { MediaObjectProps } from "./MediaObject";
import MediaObject from "./MediaObject";

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
      <Typography variant="h6">
        <FormattedMessage id={localeId.title} />
      </Typography>
      {localeId.description && (
        <Typography variant="body1">
          <FormattedMessage id={localeId.description} />
        </Typography>
      )}
      {children}
    </MediaObject>
  );
};

export default MediaItem;
