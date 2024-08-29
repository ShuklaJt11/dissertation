import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import MainImage from '../main-image/MainImage';
import LoadingAnimation from '../loader/LoadingAnimation';
import AttackArea from '../attack-area/AttackArea';

import { fetchImageApi } from '../../services/utils';

const GameScreen = () => {
    const [loading, setLoading] = useState(true)
    const [imageUrl, setImageUrl] = useState('')
    const [attackedImageUrl, setAttackedImageUrl] = useState('')
    const [imageData, setImageData] = useState('')
    
    const loadNewImage = () => {
        fetch(fetchImageApi, {
            method: "GET"
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setImageUrl(data.image_url)
            setImageData({
                originalTable: data.originalTable
            })
            setLoading(false)
        });
    };
    
    const reset = () => {
        setLoading(true);
        setImageUrl('');
        setAttackedImageUrl('');
        setImageData('');
        loadNewImage();
    };
    
    useEffect(loadNewImage, []);

    return (
        <Box sx={{ width: '100%' }}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={7} sx={{marginLeft: '80px'}}>
                {loading ?
                    <LoadingAnimation /> :
                    <MainImage imageUrl={imageUrl} imageData={imageData} attackedImageUrl={attackedImageUrl} reset={reset} />
                }
                </Grid>
                <Grid item xs={4}>
                    <AttackArea setImageData={setImageData} setLoading={setLoading} imageUrl={imageUrl} setAttackedImageUrl={setAttackedImageUrl} />
                </Grid>
            </Grid>
        </Box>
    );
};

export default GameScreen;