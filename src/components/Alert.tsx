import React from 'react';
import Dialog, {DialogProps} from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper, { PaperProps } from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { StyleButton } from '@/components/widgets';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    dialogWrap: {
      minWidth: '240px',
    },
    dialogTitle: {
      minHeight:12,
      cursor: 'move',
      padding: 2,
      color: theme.palette.common.white,
      backgroundColor: theme.palette.primary.main,
    },
    dialogContent: {
      margin:'10px',
      fontSize: '16px',
    }
  }),
);

function PaperComponent(props: PaperProps) {
  return (
    <Draggable handle="#draggable-dialog-title" 
      cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

export type AlertProps = { 
  open: boolean;
  text?: string; 
  title?: string;
  optionalType?: boolean;
  commitText?: string;
  cancelText?: string;
  cancelHandler?: ()=>void;
  commitHandler: ()=>void;
} & DialogProps

export const Alert = (props: AlertProps) => {
  const classes = useStyles();
  const propsClone:AlertProps = Object.assign({}, props);
  delete propsClone.open;
  delete propsClone.text;
  delete propsClone.title;
  delete propsClone.optionalType;
  delete propsClone.commitText;
  delete propsClone.cancelText;
  delete propsClone.cancelHandler;
  delete propsClone.commitHandler;

  return (
    <Dialog  {...propsClone} hideBackdrop={true}
      open={props.open} classes={{ paperWidthSm: classes.dialogWrap }} 
      PaperComponent={PaperComponent}
      aria-labelledby="draggable-dialog-title"
    >
      <DialogTitle classes={{ root: classes.dialogTitle }} id="draggable-dialog-title">
        {props.title?props.title:''}
      </DialogTitle>
      <DialogContent>
        <DialogContentText classes={{ root: classes.dialogContent }}>
          {props.text}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {props.optionalType && 
          <StyleButton autoFocus variant="contained" disableElevation 
            onClick={props.cancelHandler} color="primary">
            {props.cancelText ? props.cancelText : '取消'}
          </StyleButton>
        }
        <StyleButton variant="contained" onClick={props.commitHandler} 
          disableElevation color="primary">
          {props.commitText ? props.commitText : '确定'}
        </StyleButton>
      </DialogActions>
    </Dialog>
  );
}
