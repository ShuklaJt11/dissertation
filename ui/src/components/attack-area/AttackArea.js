import React from 'react';
import { Box, List, ListItem, ListItemText, IconButton, Typography, ListSubheader } from '@mui/material';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import RefreshIcon from '@mui/icons-material/Refresh';

import AttackButton from '../attack-button/AttackButton';
import GeneralButton from '../general-button/GeneralButton';

import { attackImageApi, fetchAttackedImageApi, attackList, maxAttacks } from '../../services/utils';

const ListArea = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    width: "100%",
}));

const AttackArea = ({
    setImageData, 
    setLoading, 
    imageUrl, 
    setAttackedImageUrl, 
    selectedAttacks, 
    setSelectedAttacks,
    attackCount,
    setAttackCount,
    disableAdd }) => {

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

    const resetAttacks = () => {
        setAttackCount(0);
        setSelectedAttacks(() => {
            return attackList.map(attack => {
                return {
                    id: attack.id,
                    count: 0
                };
            });
        });
    }

    return (
        <Box display="flex" justifyContent="center" alignItems="center" height="calc(100vh - 48px)" flexDirection="column">
            <ListArea>
                <List dense={false} subheader={<ListSubheader><Typography variant='body1' textAlign={"center"} sx={{marginTop: "15px"}}>Attacks: {attackCount} / {maxAttacks}</Typography></ListSubheader>}>
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
            <Box display="flex" margin="15px" width="100%">
                <AttackButton action={attckAI} />
                <GeneralButton label={<RefreshIcon />} action={resetAttacks} extraStyles={{margin: 0, marginLeft: "10px"}} />
            </Box>
        </Box>
    );
};

export default AttackArea;