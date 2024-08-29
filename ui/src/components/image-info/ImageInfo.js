import React from 'react';
import { Grid, Typography } from '@mui/material';

import ImageInfoTable from '../../image-info-table/ImageInfoTable';

const ImageInfo = ({imageData}) => {
  return (
    <>
    {imageData.attackedTable ?
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={6} sx={{padding: '10px'}}>
                <Typography variant='body1'>Original Image:</Typography>
                <ImageInfoTable tableData={imageData.originalTable} />
            </Grid>
            <Grid item xs={6} sx={{padding: '10px'}}>
                <Typography variant='body1'>Attacked Image:</Typography>
                <ImageInfoTable tableData={imageData.attackedTable} />
            </Grid>
        </Grid> :
        <ImageInfoTable tableData={imageData.originalTable} />   
    }
    </>
  );
};

export default ImageInfo;