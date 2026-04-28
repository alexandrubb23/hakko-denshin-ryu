import { Box, Grid, Stack, Typography } from '@mui/material';

import contactHighQualityImage from '@assets/images/254.webp';
import contactLowQualityImage from '@assets/images/254-small.webp';

import FormattedMessage from '@components/FormattedMessage/FormattedMessage';
import AddressMediaItem from './AddressMediaItem';
import EmailMediaItem from './EmailMediaItem';
import PhoneMediaItem from './PhoneMediaItem';
import ScheduleMediaItem from './ScheduleMediaItem';
import SocialMediaItem from './SocialMediaItem';
import BlurredUpImage from '@components/Image/BlurredUpImage';

const Contact = () => {
  return (
    <Grid container spacing={2} alignItems='center'>
      {/* Text on the left */}
      <Grid size={{ xs: 12, md: 6 }} order={{ xs: 1, md: 0 }}>
        <Stack
          spacing={4}
          sx={{ padding: 2 }}
          direction={{ xs: 'column', sm: 'column', lg: 'row' }}
          data-aos='fade'
        >
          <Box
            sx={{
              maxWidth: {
                sm: 350,
              },
            }}
          >
            <Typography
              variant='h1'
              color='primary'
              align='left'
              sx={{
                padding: 0,
              }}
            >
              <FormattedMessage id='page.contact.title' />
            </Typography>
            <Typography variant='body1'>
              <FormattedMessage id='page.contact.description' />
            </Typography>
          </Box>
          <Box
            sx={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}
          >
            <AddressMediaItem />
            <ScheduleMediaItem />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <EmailMediaItem />
            <PhoneMediaItem />
            <SocialMediaItem />
          </Box>
        </Stack>
      </Grid>

      {/* Image on the right */}
      <Grid size={{ xs: 12, md: 6 }}>
        <BlurredUpImage
          lowQualitySrc={contactLowQualityImage}
          highQualitySrc={contactHighQualityImage}
          sx={{
            width: '100%',
            aspectRatio: 'auto 360 / 540',
          }}
        />
      </Grid>
    </Grid>
  );
};

export default Contact;
