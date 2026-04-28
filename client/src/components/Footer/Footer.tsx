import FormattedMessage from '@components/FormattedMessage/FormattedMessage';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      id='footer'
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <Typography
        variant='body2'
        color='text.secondary'
        sx={{ padding: '20px', textAlign: 'center' }}
      >
        &copy; 2025, Senshinkan Romania{' '}
        <FormattedMessage id='footer.copyrights' />
      </Typography>
    </Box>
  );
};

export default Footer;
