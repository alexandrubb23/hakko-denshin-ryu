import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';

const Spinner = () => (
  <Stack sx={{ color: 'grey.500' }} spacing={2} direction='row'>
    <CircularProgress color='primary' />
  </Stack>
);

export default Spinner;
