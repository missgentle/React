import React, { useState } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { Typography, ListItem, ListItemIcon, ListItemText, Button, List
}from '@material-ui/core/';
import StarIcon from '@material-ui/icons/Star';
import AddIcon from '@material-ui/icons/Add';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import RadioUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { getUrlPara } from '@/utils/commonUtils';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column'
    },
    addBtn:{
      width: '120px',
    },
    eventContainer: {
      width: '70%',
    },
  }),
);

const events = [
    {
      key: 'event1',
      title: '晨练',
      mark: true,
      finish: true,
    },
    {
      key: 'event2',
      title: '早饭',
      mark: false,
      finish: true,
    },
    {
      key: 'event3',
      title: '晨读',
      mark: true,
      finish: false,
    }
]

export default function Events() {
  const classes = useStyles();
  const [curYear, setCurYear] = useState(Number(getUrlPara('curYear')));
  const [curMonth, setCurMonth] = useState(Number(getUrlPara('curMonth')));
  const [curDate, setCurDate] = useState(Number(getUrlPara('curDate')));

  return (
    <div className={classes.root}>
        <h2> 今日事件 </h2>
        <Typography paragraph> {curYear}年{curMonth}月{curDate}日 </Typography>
        <Button className={classes.addBtn} variant="outlined" color="primary" 
          disableElevation startIcon={<AddIcon />}>添加事件</Button>
        <div className={classes.eventContainer}>
          <List>
            {events.map((event, index) => (
              <ListItem button key={event.key}>
                <ListItemIcon>{ event.finish?<CheckCircleIcon color="primary"/>:<RadioUncheckedIcon/> }</ListItemIcon>
                <ListItemText primary={event.title} />
                <ListItemIcon>{ event.mark?<StarIcon color="primary"/>:<StarBorderIcon/> }</ListItemIcon>
              </ListItem>
            ))}
          </List>
        </div>
    </div>
  );
}
