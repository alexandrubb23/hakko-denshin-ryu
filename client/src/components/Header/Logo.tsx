import { Box, Typography } from '@mui/material';
import { Link } from 'react-router';

import LogoIcon from '@assets/images/logo.webp';

const Logo = () => (
  <Box
    className='logo-box p-4'
    sx={{
      textAlign: 'center',
    }}
  >
    <Link to='/'>
      <Box className='flex flex-col justify-center items-center gap-1.5'>
        <Box component='img' src={LogoIcon} height={50} />
        <Typography
          variant='h1'
          sx={{
            fontWeight: 'bold',
            fontSize: '1rem !important',
            padding: 0,
          }}
        >
          Senshinkan
        </Typography>
      </Box>
    </Link>
  </Box>
);

export default Logo;
