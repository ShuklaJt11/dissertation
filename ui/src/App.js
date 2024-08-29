import React, { useState, useEffect, useMemo } from 'react';
import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import Header from './components/header/Header';
import GameScreen from './components/game-screen/GameScreen';

import './App.css';

const getInitialTheme = () => {
    const theme = JSON.parse(localStorage.getItem('theme'));
    if (theme === null) return true;
    return theme;
};

const App = () => {
    const [gameTheme, setGameTheme] = useState(getInitialTheme);

    const toggleTheme = () => setGameTheme(oldTheme => !oldTheme); 

    const GameTheme = useMemo(() => createTheme({
        palette: {
            mode: gameTheme ? "dark" : "light",
            background: {
                default: gameTheme ? "#282c34" : "#eeeeee"
            }
        }
    }), [gameTheme]);

    useEffect(() => {
        localStorage.setItem('theme', JSON.stringify(gameTheme));
    }, [gameTheme]);

    return (
        <ThemeProvider theme={GameTheme}>
            <CssBaseline />
            <Header gameTheme={gameTheme} toggleTheme={toggleTheme} />
            <GameScreen gameTheme={gameTheme} toggleTheme={toggleTheme} />
        </ThemeProvider>
    );
};

export default App;
