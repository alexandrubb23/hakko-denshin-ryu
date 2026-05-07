import { Box, SvgIcon } from '@mui/material';
import { PropsWithChildren } from 'react';

export interface MediaObjectProps {
  icon: React.ElementType;
}

const MediaObject = ({
  children,
  icon,
}: PropsWithChildren<MediaObjectProps>) => {
  return (
    <Box style={{ display: 'flex', gap: 15 }}>
      <Box
        sx={{
          borderRadius: '50%',
          backgroundColor: '#312b49',
          padding: 2,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: 40,
          height: 40,
        }}
      >
        <SvgIcon component={icon} color='primary' fontSize='medium' />
      </Box>
      <Box>{children}</Box>
    </Box>
  );
};

export default MediaObject;
