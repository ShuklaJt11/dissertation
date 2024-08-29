import React from 'react';
import { Card, CardActionArea, CardContent, Typography } from '@mui/material';

const AttackButton = ({action=() => {return}}) => {
    return (
        <Card sx={{flexGrow: 1}}>
            <CardActionArea onClick={action}>
                <CardContent sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <Typography variant="body1" component="div" sx={{marginLeft: "5px"}}>
                        Attack
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default AttackButton;