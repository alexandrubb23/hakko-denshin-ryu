import { Box, CircularProgress } from '@mui/material';
import { Navigate, Outlet } from 'react-router';

import { authClient } from '@lib/auth-client';

const ProtectedRoute = () => {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <Box className='flex items-center justify-center min-h-dvh'>
        <CircularProgress sx={{ color: '#AB96FF' }} />
      </Box>
    );
  }

  if (!session) {
    return <Navigate to='/login' replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
