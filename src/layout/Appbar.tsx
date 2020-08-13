import React, { useState } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { AppBar, IconButton, Toolbar, Typography }from '@material-ui/core/';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
  }),
);

export default function Appbar() {
  const classes = useStyles();

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <IconButton color="inherit" href="#/">
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6" noWrap>
          日历
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
