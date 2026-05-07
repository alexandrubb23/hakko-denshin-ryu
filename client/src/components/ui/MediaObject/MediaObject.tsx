import { Box, SvgIcon } from "@mui/material";
import { PropsWithChildren } from "react";

import { IconWrapper, MediaRow } from "./MediaObject.style";

export interface MediaObjectProps {
  icon: React.ElementType;
}

const MediaObject = ({
  children,
  icon,
}: PropsWithChildren<MediaObjectProps>) => {
  return (
    <MediaRow>
      <IconWrapper>
        <SvgIcon component={icon} color="primary" fontSize="medium" />
      </IconWrapper>
      <Box>{children}</Box>
    </MediaRow>
  );
};

export default MediaObject;
