import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router';

const useBlur = () => {
  const [blur, setBlur] = useState(true);

  const location = useLocation();
  const prevLocation = useRef(location);

  useEffect(() => {
    if (prevLocation.current.pathname !== location.pathname) {
      setBlur(true);
      prevLocation.current = location;
    }
  }, [location]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setBlur(false);
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, [blur]);

  return blur;
};

export default useBlur;
