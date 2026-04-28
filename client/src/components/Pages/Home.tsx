import FormattedMessage from '@components/FormattedMessage/FormattedMessage';
import { Grid, Typography } from '@mui/material';

import desktopLowQuality from '@assets/images/108-small.jpg';
import desktopHighQuality from '@assets/images/108.webp';

import mobileLowQuality from '@assets/images/180-small.jpg';
import mobileHighQuality from '@assets/images/180.webp';
import BlurredUpImage from '@components/Image/BlurredUpImage';
import Quotes from '@components/Quotes/Quotes';
import useIsMobile from '@hooks/isMobile';
import useDeviceImageType from '@hooks/useDeviceImageType';

const Home = () => {
  const isMobile = useIsMobile();

  const { imageLowQuality, imageHighQuality } = useDeviceImageType({
    mobileLowQuality,
    desktopLowQuality,
    mobileHighQuality,
    desktopHighQuality,
  });

  return (
    <Grid container>
      <Grid
        size={{ xs: 12, lg: 4, xl: 6 }}
        className='flex flex-col justify-center'
      >
        <Typography
          variant='h1'
          align='left'
          data-aos='fade'
          className='pb-0 text-shadow-lg/30'
        >
          Hakko Denshin Ryu Ju Jutsu Senshinkan Romania
        </Typography>

        <Typography variant='h2Inter' data-aos='fade' align='left'>
          <FormattedMessage id='page.home.subtitle' />
        </Typography>
        <Quotes />
      </Grid>
      <Grid
        size={{ xs: 12, lg: 8, xl: 6 }}
        className={`min-h-dvh top-0 z-[-2] left-0 ${
          isMobile ? 'absolute' : 'relative'
        }`}
      >
        <BlurredUpImage
          animate='none'
          highQualitySrc={imageHighQuality}
          lowQualitySrc={imageLowQuality}
          className={`min-h-dvh`}
          sx={{
            aspectRatio: !isMobile ? 'auto 1372 / 914' : 'auto 360 / 540',
          }}
        />
      </Grid>
    </Grid>
  );
};

export default Home;
