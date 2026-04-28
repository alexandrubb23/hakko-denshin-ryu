import { useEffect } from 'react';

import useLangStore from '@store/useLangStore';
import useMenuStore from '@store/useMenuStore';

const useCloseMenuOnLangChange = () => {
  useEffect(() => {
    const unsubscribe = useLangStore.subscribe(() => {
      useMenuStore.setState({ isOpen: false });
    });

    return unsubscribe;
  }, []);
};

export default useCloseMenuOnLangChange;
