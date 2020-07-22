import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';

export const BlueTheme = createMuiTheme({
  palette: {
    common: {
      black: "#000",
      white: "#fff"
    },
    primary: {
      main: "#2a77ab",
      contrastText: "#fff",
    },
    secondary: {
      main: "#2468a9",
      contrastText: "#000",
    },
    text:{
      primary: "#000",
      secondary: "#404040",
      disabled: "#a0a0a0",
      hint: "#707070"
    },
    background: {
      default:"#fdfdfe"
    },
    action: {
      active: "#000",
      hover: "#707070",
      selected: "#2468a9",
      disabled: "#a0a0a0",
      disabledBackground: "#000",
      focus: "#2a77ab"
    },
    tonalOffset: 0.2,
    contrastThreshold: 3,
    // type: "dark", // or "light" 
  },

  typography: {
    htmlFontSize: 24,
    fontSize: 16,
    fontFamily: "宋体, Arial",
    subtitle1: {
      fontSize: 16,
      fontFamily: "华文细黑"
    },
    subtitle2: {
      fontSize: 12,
      color: "#3d3e40"
    },
    body1: {
      fontSize: 12,
    },
    button: {
      fontSize: 12,
    },
  },

  spacing: 1,
  
});
