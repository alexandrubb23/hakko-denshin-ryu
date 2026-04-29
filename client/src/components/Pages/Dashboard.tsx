import { Container, Paper, Typography } from '@mui/material';

import { authClient } from '@lib/auth-client';

const Dashboard = () => {
  const { data: session } = authClient.useSession();

  return (
    <Container maxWidth='sm'>
      <Paper elevation={3} className='w-full p-8 flex flex-col gap-6'>
        <Typography variant='h5' fontWeight={700}>
          Welcome, {session!.user.name}!
        </Typography>

        <Typography variant='body1' color='text.secondary'>
          {session!.user.email}
        </Typography>
      </Paper>
    </Container>
  );
};

export default Dashboard;
