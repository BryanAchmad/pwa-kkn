import { Box, CircularProgress } from '@mui/material';

const LoaderComponent = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>
  );
};

export default LoaderComponent;
