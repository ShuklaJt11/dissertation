import React, { useState, useEffect } from 'react';
import { Box, Grid } from '@mui/material';

import MainImage from '../main-image/MainImage';
import LoadingAnimation from '../loader/LoadingAnimation';
import AttackArea from '../attack-area/AttackArea';
import IntroModal from '../intro-modal/IntroModal';

import { fetchImageApi, fetchImageByLevelApi, attackList, maxAttacks } from '../../services/utils';

const GameScreen = () => {
    const [loading, setLoading] = useState(true);
    const [imageUrl, setImageUrl] = useState('');
    const [attackedImageUrl, setAttackedImageUrl] = useState('');
    const [imageData, setImageData] = useState('');
    const [openModal, setOpenModal] = useState(true);
    const [selectedAttacks, setSelectedAttacks] = useState(() => {
        return attackList.map(attack => {
            return {
                id: attack.id,
                count: 0
            }
        })
    });
    const [attackCount, setAttackCount] = useState(0);
    const [disableAdd, setDisableAdd] = useState(false);

    const handleOpen = () => setOpenModal(true);
    
    const handleClose = () => setOpenModal(false);

    const loadNewImage = () => {
        fetch(fetchImageApi, {
            method: "GET"
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setImageUrl(data.image_url);
            setImageData({
                originalTable: data.originalTable
            });
            handleClose();
            setLoading(false);
        });
    };

    const loadNewImageByLevel = level => {
        fetch(fetchImageByLevelApi, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                "level": level
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setImageUrl(data.image_url);
            setImageData({
                originalTable: data.originalTable
            });
            handleClose();
            setLoading(false);
        });
    };

    const selectLevel = level => level > 2 ? loadNewImage() : loadNewImageByLevel(level);
    
    const reset = () => {
        setLoading(true);
        setImageUrl('');
        setAttackedImageUrl('');
        setImageData('');
        setAttackCount(0);
        setSelectedAttacks(() => {
            return attackList.map(attack => {
                return {
                    id: attack.id,
                    count: 0
                }
            })
        });
        handleOpen();
    };

    const toggleAttackStatus = () => {
        if (attackCount < maxAttacks) setDisableAdd(false);
        else setDisableAdd(true);
    }

    useEffect(toggleAttackStatus, [attackCount])

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
                    <AttackArea 
                        setImageData={setImageData} 
                        setLoading={setLoading} 
                        imageUrl={imageUrl} 
                        setAttackedImageUrl={setAttackedImageUrl} 
                        selectedAttacks={selectedAttacks}
                        setSelectedAttacks={setSelectedAttacks}
                        attackCount={attackCount}
                        setAttackCount={setAttackCount}
                        disableAdd={disableAdd} />
                </Grid>
            </Grid>
            <IntroModal open={openModal} selectLevel={selectLevel} />
        </Box>
    );
};

export default GameScreen;