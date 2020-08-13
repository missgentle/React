import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import { Typography, IconButton} from '@material-ui/core';
import TodayIcon from '@material-ui/icons/Today';
import { KeyboardDatePicker, 
  KeyboardDatePickerProps,
  MuiPickersUtilsProvider
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns'
import zhLocale from 'date-fns/locale/zh-CN';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    typography: {
      padding: theme.spacing(2),
    },
  }),
);

export type PickerProps = {
  value: string
} & KeyboardDatePickerProps

export default function PickAday(props:PickerProps) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <IconButton aria-label={`Jump to a day`} color="primary" onClick={handleClick}>
        <TodayIcon />
      </IconButton>
      <Popover open={open} anchorEl={anchorEl} onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={zhLocale}>
          <KeyboardDatePicker value={props.value} 
            variant="static" disableToolbar
            format="yyyy/MM/dd"
            onChange={props.onChange}/>
        </MuiPickersUtilsProvider>
      </Popover>
    </div>
  );
}
