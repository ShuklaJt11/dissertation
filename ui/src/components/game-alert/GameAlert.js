import React from 'react';
import { Alert, Snackbar, Grow } from '@mui/material';

const GrowTransition = props => <Grow {...props} />

const GameAlert = ({open, severity, message, handleClose}) => {
  return (
    <Snackbar autoHideDuration={6000} open={open} onClose={handleClose}>
        <Alert
            anchorOrigin={{vertical: "top", horizontal: "left"}}
            onClose={handleClose}
            severity={severity}
            TransitionComponent={GrowTransition}
            variant="filled"
            sx={{ width: '100%' }}
        >
            {message}
        </Alert>
    </Snackbar>
  );
};

export default GameAlert;