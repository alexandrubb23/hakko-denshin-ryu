import { Box, Button, Container, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router';

import { authClient } from '@lib/auth-client';

const Dashboard = () => {
  const navigate = useNavigate();
  const { data: session } = authClient.useSession();

  const handleSignOut = async () => {
    await authClient.signOut();
    navigate('/login', { replace: true });
  };

  return (
    <Container maxWidth='sm' className='flex items-center justify-center min-h-dvh'>
      <Paper elevation={3} className='w-full p-8 flex flex-col gap-6'>
        <Typography variant='h5' fontWeight={700}>
          Welcome, {session!.user.name}!
        </Typography>

        <Typography variant='body1' color='text.secondary'>
          {session!.user.email}
        </Typography>

        <Box>
          <Button variant='outlined' color='error' onClick={handleSignOut}>
            Sign Out
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Dashboard;
