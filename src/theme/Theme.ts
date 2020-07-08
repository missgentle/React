import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { red, orange, green } from '@material-ui/core/colors';

export const OrangeTheme = createMuiTheme({
  palette: {
    primary: {
      main: orange[800],
    },
    secondary: {
      main: green[800],
    },
  },
});

export const GreenTheme = createMuiTheme({
  palette: {
    primary: {
      main: green[800],
    },
    secondary: {
      main: orange[800],
    },
    error:{
      main: red[500],
    },
    tonalOffset: 0.2,
    contrastThreshold: 3,
  },
  typography: {
    fontSize: 16,
  },
  
});
