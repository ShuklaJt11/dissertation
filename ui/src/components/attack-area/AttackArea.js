import React, { useState, useEffect } from 'react';
import { Box, List, ListItem, ListItemText, IconButton, Typography, ListSubheader } from '@mui/material';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import AttackButton from '../attack-button/AttackButton';

import { attackImageApi, fetchAttackedImageApi, attackList } from '../../services/utils';

const ListArea = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    width: "100%",
}));

const AttackArea = ({setImageData, setLoading, imageUrl, setAttackedImageUrl}) => {
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

    const attckAI = () => {
        setLoading(true)
        const requestPayload = {
            'image': imageUrl,
            'attacks': selectedAttacks
        }
        fetch(fetchAttackedImageApi, {
            headers: {
                'Accept': 'image/jpeg',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(requestPayload)
        })
        .then(response => response.blob())
        .then(imageBlob => {
            const attackedImageUrl = URL.createObjectURL(imageBlob);
            setAttackedImageUrl(attackedImageUrl);
            fetch(attackImageApi, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(requestPayload)
            })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setImageData(data)
                setLoading(false)
            })
            .catch(() => {
                setLoading(false)
            });
        })
        .catch(error => {
            console.error('Error loading image', error)
            setLoading(false)
        });
    };

    const addAttack = attackId => {
        let selectedAttacksList = selectedAttacks;
        let selectedAttack = selectedAttacksList.find(selectedAttack => selectedAttack.id === attackId);
        let attackCountNum = attackCount;

        if (selectedAttack) selectedAttack.count += 1;
        else selectedAttacksList.push({
            id: attackId,
            count: 1
        })
        
        console.log(selectedAttacksList);
        console.log(attackCountNum + 1);
        setAttackCount(attackCountNum + 1);
        setSelectedAttacks(selectedAttacksList);
    }

    const removeAttack = attackId => {
        let selectedAttacksList = selectedAttacks;
        let selectedAttack = selectedAttacksList.find(selectedAttack => selectedAttack.id === attackId);
        let attackCountNum = attackCount;

        if (selectedAttack && selectedAttack.count >= 1) {
            selectedAttack.count -= 1;
            attackCountNum -= 1
        }
        console.log(selectedAttacksList);
        console.log(attackCountNum);
        setAttackCount(attackCountNum)
        setSelectedAttacks(selectedAttacksList);
    }

    const toggleAttackStatus = () => {
        if (attackCount < 5) setDisableAdd(false);
        else setDisableAdd(true);
    }

    useEffect(toggleAttackStatus, [attackCount])

    return (
        <Box display="flex" justifyContent="center" alignItems="center" height="calc(100vh - 48px)" flexDirection="column">
            <ListArea>
                <List dense={false} subheader={<ListSubheader><Typography variant='body1' textAlign={"center"} sx={{marginTop: "15px"}}>Attacks: {attackCount} / 5</Typography></ListSubheader>}>
                {
                    attackList.map(attack => {
                        return (
                            <ListItem
                                key={attack.id}
                                secondaryAction={
                                    <Box display="flex" justifyContent="center" alignItems="center" sx={{width: "100px"}}>
                                        {
                                            selectedAttacks.find(selectedAttack => attack.id === selectedAttack.id).count === 0 ?
                                            <IconButton edge="end" aria-label="Remove Attack" onClick={() => removeAttack(attack.id)} disabled sx={{margin: 0}}>
                                                <RemoveIcon />
                                            </IconButton> :
                                            <IconButton edge="end" aria-label="Remove Attack" onClick={() => removeAttack(attack.id)} sx={{margin: 0}}>
                                                <RemoveIcon />
                                            </IconButton>
                                        }
                                        <Typography variant='body1' flexGrow={1} textAlign={"center"}>{selectedAttacks.find(selectedAttack => attack.id === selectedAttack.id).count}</Typography>
                                        {
                                            disableAdd ?
                                            <IconButton edge="end" aria-label="Add Attack" onClick={() => addAttack(attack.id)} disabled sx={{margin: 0}}>
                                                <AddIcon />
                                            </IconButton> :
                                            <IconButton edge="end" aria-label="Add Attack" onClick={() => addAttack(attack.id)} sx={{margin: 0}}>
                                                <AddIcon />
                                            </IconButton>
                                        }
                                    </Box>
                                    
                                }
                            >
                                <ListItemText
                                primary={attack.name}
                                secondary={attack.description}
                                />
                            </ListItem>
                        )
                    })
                }
                </List>
            </ListArea>
            <AttackButton attackHeading="Attack" attackDescription="" action={attckAI} />
        </Box>
    );
};

export default AttackArea;