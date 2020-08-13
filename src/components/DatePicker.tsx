import React from 'react'
import { KeyboardDatePicker, 
  KeyboardDatePickerProps,
  MuiPickersUtilsProvider
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns'
import zhLocale from 'date-fns/locale/zh-CN';
import {makeStyles,createStyles,Theme} from '@material-ui/core/styles';

export type PickerProps = {
  value: string
} & KeyboardDatePickerProps

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingLeft:4,
      paddingTop:0,
      paddingBottom:0,
      height:'46px',
      border: '1px solid #c0c0c0',
      overflow: 'hidden',
      borderRadius: 4,
      backgroundColor: '#fdfdfe',
      transition: theme.transitions.create(['border-color'], { duration: 300 }),
      '&:hover': {
        backgroundColor: '#fff',
        borderColor: 'rgba(0, 0, 0, 0.87)',
      },
      '&:focused': {
        backgroundColor: '#fff',
        borderWidth: '1px',
        borderStyle: 'solid',
      },
    },
    input:{
      height:'32px',
    },
    error:{
      display:'none'
    },
    iconColor:{
      color:theme.palette.primary.main,
      padding:5
    }
  }),
);
export default function DatePick(props:PickerProps) {

  const classes = useStyles();
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={zhLocale}>
      <KeyboardDatePicker value={props.value} className={classes.root}
        variant="inline" disableToolbar
        inputProps={{className:classes.input}}
        KeyboardButtonProps={{className:classes.iconColor}}
        format="yyyy/MM/dd"
        onChange={props.onChange}/>
    </MuiPickersUtilsProvider>
  )
}
