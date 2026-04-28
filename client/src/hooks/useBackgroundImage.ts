import { useLocation } from 'react-router';

import { pages } from '../pages';
const useBackgroundImage = () => {
  const { pathname } = useLocation();

  const path = pathname === '/' ? 'home' : pathname;
  return pages.find(page => page.path === path)?.bgImage;
};

export default useBackgroundImage;
