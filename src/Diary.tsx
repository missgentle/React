import React, { useState } from 'react';
import {
  Grid,Typography,GridList,GridListTile,ListSubheader,
  GridListTileBar,IconButton,Paper,Button
} from '@material-ui/core';

export default function Diary() {

	return (
    <div>
      <Grid container spacing={2}>
        <Grid container item xs={12} justify="center" alignItems="center" style={{ backgroundColor: '#4d9660' }}>
          <Grid container item xs={10} justify="center" alignItems="center">
            <Typography component="div" color="textPrimary" style={{fontSize:32}}>
                💗 - Mini Diary - 💗 
            </Typography>
          </Grid>
        </Grid>
        <Grid container item xs={12} justify="center" alignItems="center"  style={{ backgroundColor: '#4d9660' }}>
          <Grid container item xs={10} justify="center" alignItems="center">
            <Typography component="div" color="textSecondary" >
              An achievable goal: Be happy today ❤ And next step: Be happy everyday
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}
