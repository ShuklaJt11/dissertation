import React from 'react';
import { Button } from '@mui/material';

const ResetButton = ({ action = () => {return} }) => {
  return (
    <Button variant="contained" aria-label="New Image" onClick={action} sx={{margin: '10px'}}>
        GET NEW IMAGE
    </Button>
  );
};

export default ResetButton;