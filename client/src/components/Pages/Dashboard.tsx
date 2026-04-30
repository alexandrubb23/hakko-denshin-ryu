import { Paper, Skeleton, Typography } from '@mui/material';

import { authClient } from '@lib/auth-client';

const SKEL = { bgcolor: 'rgba(171,150,255,0.12)' };

const Dashboard = () => {
  const { data: session, isPending } = authClient.useSession();

  return (
    <Paper elevation={3} className='w-full p-8 flex flex-col gap-6'>
      <Typography variant='h5' fontWeight={700}>
        {isPending ? <Skeleton width='60%' sx={SKEL} /> : `Welcome, ${session?.user.name}!`}
      </Typography>

      <Typography variant='body1' color='text.secondary'>
        {isPending ? <Skeleton width='80%' sx={SKEL} /> : session?.user.email}
      </Typography>
    </Paper>
  );
};

export default Dashboard;
