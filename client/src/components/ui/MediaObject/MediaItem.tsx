import { Typography } from "@mui/material";
import { PropsWithChildren } from "react";
import type { IntlMessageID } from "i18n/messages";

import FormattedMessage from "@components/ui/FormattedMessage/FormattedMessage";
import type { MediaObjectProps } from "./MediaObject";
import MediaObject from "./MediaObject";

const descriptionSx = { span: { display: "block" } };

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
        <Typography variant="body1" sx={descriptionSx}>
          <FormattedMessage id={localeId.description} />
        </Typography>
      )}
      {children}
    </MediaObject>
  );
};

export default MediaItem;
