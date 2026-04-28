import { useQuery } from '@tanstack/react-query';
import { Box, CircularProgress, Container, Paper, Typography } from '@mui/material';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

const fetchHealth = async (): Promise<{ status: string }> => {
  const res = await fetch(`${API_URL}/api/health`);
  if (!res.ok) throw new Error('Server unreachable');
  return res.json();
};

const Login = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['health'],
    queryFn: fetchHealth,
  });

  return (
    <Container maxWidth='xs' className='flex items-center justify-center min-h-dvh'>
      <Paper elevation={3} className='w-full p-8 flex flex-col gap-4'>
        <Typography variant='h5' align='center' fontWeight={700}>
          Log In
        </Typography>

        <Box className='mt-4 flex items-center gap-2'>
          <Typography variant='body2' color='text.secondary'>
            API status:
          </Typography>

          {isLoading && <CircularProgress size={14} />}

          {isError && (
            <Typography variant='body2' color='error'>
              {(error as Error).message}
            </Typography>
          )}

          {data && (
            <Typography variant='body2' color='success.main' fontWeight={600}>
              {data.status}
            </Typography>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
