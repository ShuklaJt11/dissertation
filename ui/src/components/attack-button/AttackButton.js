import React from 'react';
import { Card, CardActionArea, CardContent, Typography } from '@mui/material';

const AttackButton = ({attackHeading, attackDescription, action=() => {return}}) => {
    return (
        <Card sx={{margin:"15px"}}>
            <CardActionArea onClick={action}>
                <CardContent>
                    <Typography variant="body1" component="div">
                        {attackHeading}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {attackDescription}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default AttackButton;