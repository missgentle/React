import React, { useState, useEffect } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { Drawer, CssBaseline, Toolbar, List, ListItem, ListItemIcon, ListItemText
}from '@material-ui/core/';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import StarIcon from '@material-ui/icons/Star';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {getUrlPara} from '@/utils/commonUtils';
import Appbar from '@/layout/Appbar';
import Events from '@/layout/Events';
import Myday from '@/layout/Myday';
import Assignments from '@/layout/Assignments';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerContainer: {
      overflow: 'auto',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    active: {
      color: theme.palette.primary.main,
      '& $icon': {
        color: theme.palette.primary.main
      }
    }
  }),
);

const pages = [
  {
    key: 'assignments',
    title: '任务计划',
    main: <Assignments />,
    icon: <AssignmentTurnedInIcon />
  },
  {
    key: 'events',
    title: '今日事件',
    main: <Events />,
    icon: <StarIcon />
  },
  {
    key: 'myday',
    title: '我的一天',
    main: <Myday />,
    icon: <WbSunnyIcon />
  }
]

export default function Diary() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [curYear, setCurYear] = useState(Number(getUrlPara('curYear')));
  const [curMonth, setCurMonth] = useState(Number(getUrlPara('curMonth')));
  const [curDate, setCurDate] = useState(Number(getUrlPara('curDate')));
  const [curPage, setCurPage] = useState(pages[0]);

  useEffect(()=>{
    const curTime = new Date(curYear,curMonth-1,curDate);
    if(curTime > new Date()){
      console.log('未来')
    }else if(curTime < new Date()){
      console.log('过去')
    }
  },[])

  function pageListClickHandler(page){
    setCurPage(page); 
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Appbar />
      <Drawer className={classes.drawer} variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            {pages.map((page) => (
              <ListItem button key={page.key} onClick={()=>pageListClickHandler(page)}
                className={curPage.key==page.key?classes.active:''} >
                <ListItemIcon>{ page.icon }</ListItemIcon>
                <ListItemText primary={page.title} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
        {curPage.main}
      </main>
    </div>
  );
}
