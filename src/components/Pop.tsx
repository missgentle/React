import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Paper, { PaperProps } from '@material-ui/core/Paper';
import {IconButton, Typography} from '@material-ui/core';
import Draggable from 'react-draggable';
import Box from './Box';
import CloseIcon from '@material-ui/icons/Close';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.default,
      border: '5px solid #2a77ab',
      borderRadius: '5px',
      boxShadow: theme.shadows[5],
    },
  }),
);



export interface PopProps { 
  open: boolean;
  title: string;
  closeHandler: any;
  width?: number;
  height?: number;
  popComponent?: React.ReactNode;
}

const PaperComponent = React.forwardRef( 
  (props:PaperProps, ref) =>  
    <Draggable handle="#draggable-modal" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper ref={ref} {...props} />
    </Draggable>
);

export const Pop = (props: PopProps) => {
  const classes = useStyles();
  const propsClone:PopProps = Object.assign({}, props);
  delete propsClone.closeHandler;
  delete propsClone.popComponent;

  return (
        <Modal {...propsClone} 
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.open}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.open}>
          <Paper className={classes.paper} component={PaperComponent}
            style={{width:`${props.width}px`, height:`${props.height}px`}} >
          <Box height={40}>
            <Box paddingLeft={5} id="draggable-modal" p={11} style={{cursor: "move"}}>
              <Typography variant="subtitle2" >{props.title}</Typography>
            </Box>
            <IconButton style={{paddingRight:5, color:"#fff"}} onClick={props.closeHandler}>
              <CloseIcon />
            </IconButton>
          </Box>
          <div className="pop-page-div" style={{width:`${props.width-12}px`, height:`${props.height-52}px` }}>
            {props.popComponent}
          </div>
          </Paper>
        </Fade>
      </Modal>
  );
}
