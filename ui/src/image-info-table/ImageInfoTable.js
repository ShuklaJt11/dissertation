import React from 'react';
import { Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

const ImageInfoTable = ({tableData=[]}) => {
  return (
    <TableContainer component={Paper} sx={{maxWidth: 500}}>
        <Table aria-label="simple table" size='small'>
            <TableHead>
                <TableRow>
                    <TableCell>Category</TableCell>
                    <TableCell align="right">AI Confidence</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            {tableData.map((row) => (
                <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">{row.name.length <= 50 ? row.name : row.name.substr(0, 47) + '...'}</TableCell>
                    <TableCell align="right">{(row.probability * 100).toFixed(3)} %</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
    </TableContainer>
  );
};

export default ImageInfoTable;