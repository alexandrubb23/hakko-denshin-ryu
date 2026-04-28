import { Box } from '@mui/material';

import Spinner from './Spinner';

const CenterSpinner = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Spinner />
    </Box>
  );
};

export default CenterSpinner;
