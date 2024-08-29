import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

const ThemeSelector = ({gameTheme, toggleTheme}) => {
    return (
        <Tooltip title="Toggle Dark / Light Mode" arrow>
            <IconButton edge="start" sx={{ mr: 2, color: "inherit" }} onClick={toggleTheme} >
                {gameTheme ?
                    <DarkModeIcon /> :
                    <LightModeIcon />
                }
            </IconButton>
        </Tooltip>
    );
};

export default ThemeSelector;