import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { AppBar, Drawer, IconButton, CssBaseline, 
	Toolbar, List, Typography, Divider, ListItem, ListItemIcon, 
	ListItemText, TextareaAutosize
}from '@material-ui/core/';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import StarIcon from '@material-ui/icons/Star';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
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
  }),
);

export default function Diary() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton color="inherit" aria-label="open drawer"
            onClick={handleDrawerOpen} edge="start">
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Clipped drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            {['我的一天', '事件', '任务计划'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{ index % 3 === 0 ? <WbSunnyIcon /> : index % 3 === 1 ? <StarIcon /> : <AssignmentTurnedInIcon /> }</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
        <h2> 我第一天 </h2>
        <Typography paragraph> 2020年07月20日 </Typography>
        <TextareaAutosize style={{width:"100%", fontSize:"16px"}} rows={20} rowsMax={20} defaultValue="今天是20xx年xx月xx日，星期x，天气雷阵雨..."/>
      </main>
    </div>
  );
}
