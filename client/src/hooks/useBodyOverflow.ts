import { useEffect } from 'react';

import useMenuStore from '@store/useMenuStore';

const useBodyOverflow = () => {
  const isOpen = useMenuStore(state => state.isOpen);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);
};

export default useBodyOverflow;
