import { useEffect, useState } from 'react';

export type UseProgressiveImg = {
  lowQualitySrc: string;
  highQualitySrc: string;
};

export type BlurImg = {
  blur: boolean;
};

const loaded = new Set<string>();

const useProgressiveImg = ({
  lowQualitySrc,
  highQualitySrc,
}: UseProgressiveImg): [src: string, BlurImg] => {
  const [src, setSrc] = useState(lowQualitySrc);
  const [isBlurred, setIsBlurred] = useState(!loaded.has(highQualitySrc));

  useEffect(() => {
    if (!lowQualitySrc || !highQualitySrc) {
      return;
    }

    if (loaded.has(highQualitySrc)) {
      setSrc(highQualitySrc);
      setIsBlurred(false);
      return;
    }

    setSrc(lowQualitySrc);
    setIsBlurred(true);

    const img = new Image();
    img.src = highQualitySrc;

    img
      .decode()
      .then(() => {
        setSrc(highQualitySrc);
        loaded.add(highQualitySrc);
        setIsBlurred(false);
      })
      .catch(() => {
        img.onload = () => {
          setSrc(highQualitySrc);
          loaded.add(highQualitySrc);
          setIsBlurred(false);
        };
      });
  }, [lowQualitySrc, highQualitySrc]);

  return [src, { blur: isBlurred }];
};

export default useProgressiveImg;
