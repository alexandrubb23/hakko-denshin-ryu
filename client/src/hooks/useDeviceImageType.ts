import { useEffect, useState } from 'react';
import useIsMobile from './isMobile';

type ImageSet = {
  mobileLowQuality: string;
  desktopLowQuality: string;
  mobileHighQuality: string;
  desktopHighQuality: string;
};

const useDeviceImageType = ({
  mobileLowQuality,
  desktopLowQuality,
  mobileHighQuality,
  desktopHighQuality,
}: ImageSet) => {
  const isMobile = useIsMobile({ noSsr: true });

  const [imageLowQuality, setImageLowQuality] = useState('');
  const [imageHighQuality, setImageHighQuality] = useState('');

  useEffect(() => {
    setImageLowQuality(isMobile ? mobileLowQuality : desktopLowQuality);
    setImageHighQuality(isMobile ? mobileHighQuality : desktopHighQuality);
  }, [isMobile]);

  return { imageLowQuality, imageHighQuality };
};

export default useDeviceImageType;
