import { useEffect, useState } from "react";

export type UseProgressiveImg = {
  lowQualitySrc: string;
  /** Empty to stay on `lowQualitySrc`, e.g. while the image is hidden */
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
  // A cached image shows straight away, without a frame of its placeholder
  const cached = loaded.has(highQualitySrc);
  const [src, setSrc] = useState(cached ? highQualitySrc : lowQualitySrc);
  const [isBlurred, setIsBlurred] = useState(!cached);

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
