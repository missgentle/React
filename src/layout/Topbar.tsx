import React, { useState } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { Grid, Typography }from '@material-ui/core/';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    topBar: {
      backgroundColor: '#4d9660',
      padding: '10px'
    },
    logo: {
      fontSize: 32
    }
  }),
);

export default function Topbar() {
  const classes = useStyles();

  return (
    <Grid xs={12}>
      <Grid className={classes.topBar} container item xs={12} justify="center" alignItems="center" >
        <Grid container item xs={10} justify="center" alignItems="center">
          <Typography component="div" className={classes.logo} >
               - Mini Diary -  
          </Typography>
        </Grid>
      </Grid>
      <Grid className={classes.topBar} container item xs={12} justify="center" alignItems="center" >
        <Grid container item xs={10} justify="center" alignItems="center">
          <Typography component="div" >
            An achievable goal: Be happy today 💗 And next step: Be happy everyday
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}
