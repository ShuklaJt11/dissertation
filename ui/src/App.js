import React from 'react';

import Header from './components/header/Header';
import GameScreen from './components/game-screen/GameScreen';
import { ThemeProvider } from '@mui/material/styles';

import DarkTheme from './services/themes';

import './App.css';

function App() {
    return (
        <ThemeProvider theme={DarkTheme}>
            <Header />
            <GameScreen />
        </ThemeProvider>
    );
}

export default App;
