import { Box } from '@mui/material';
import { Outlet, useLocation } from 'react-router';
const Content = () => {
  const location = useLocation();

  const isHomePage = location.pathname === '/';

  return (
    <Box
      sx={{
        padding: isHomePage ? 0 : 2,
        backgroundColor: !isHomePage ? 'var(--body-background)' : 'transparent',
      }}
    >
      <Outlet />
    </Box>
  );
};

export default Content;
