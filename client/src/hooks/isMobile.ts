import { useMediaQuery, UseMediaQueryOptions, useTheme } from '@mui/material';

const useIsMobile = (options?: UseMediaQueryOptions) => {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.down('sm'), { ...options });
};

export default useIsMobile;
