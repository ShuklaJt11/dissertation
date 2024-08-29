import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const LoadingAnimation = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="calc(100vh - 48px)">
        <CircularProgress />
    </Box>
  );
};

export default LoadingAnimation;