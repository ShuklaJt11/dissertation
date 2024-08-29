import * as React from 'react';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import ThemeSelector from '../theme-selector/ThemeSelector';

const Header = ({gameTheme, toggleTheme}) => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar variant="dense">
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            textAlign: 'center',
                            width: '100%'
                        }}
                    >
                        BEAT THE AI
                    </Typography>
                    <ThemeSelector gameTheme={gameTheme} toggleTheme={toggleTheme} />
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Header;