import React, { useState } from 'react';
import {
  Grid,Typography, GridList, GridListTile, ListSubheader,
  GridListTileBar, IconButton, Paper, Button, MenuItem, Menu
} from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import HomeIcon from '@material-ui/icons/Home';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import GrainIcon from '@material-ui/icons/Grain';
import EditIcon from '@material-ui/icons/Edit';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import TodayIcon from '@material-ui/icons/Today';
import Img from '@/imgs/img.jpg';

export default function Calendar() {

  const curTime = new Date();
  const weekEn = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
  const weekCn = ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
  const month = ["Jan","Feb","Mar","Apr","May","June","July","Aug","Sept","Oct","Nov","Dec"];
  const ITEM_HEIGHT = 48;

  const [curYear, setCurYear] = useState(curTime.getFullYear());
  const [curMonth, setCurMonth] = useState(curTime.getMonth() + 1);
  const [curDate, setCurDate] = useState(curTime.getDate());
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  function monthSwitchBtnClickHandler(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    switch ((event.currentTarget as HTMLButtonElement).id) {
      case "lastMonthBtn":
        if(curMonth < 2){
          setCurMonth(12);
          setCurYear(curYear-1);
        }else{
          setCurMonth(curMonth-1);
        }
        break;
      case "nextMonthBtn":
        if(curMonth > 11){
          setCurMonth(1);
          setCurYear(curYear+1);
        }else{
          setCurMonth(curMonth+1);
        }
        break;
    }
  }

  const openDatePicker = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event: React.MouseEvent<HTMLElement>, year: number) => {
    setCurYear(year);
    setAnchorEl(null);
  };

  const closeDatePicker = () => {
    setAnchorEl(null);
  };


  function getDaysNum():number {
    let leapFlag: boolean = (curYear%400 === 0) || ((curYear%4 === 0) && (curYear%100 !== 0)) ? true : false ;
    let dNum: number;
    switch(curMonth){
      case 2:
        dNum = leapFlag ? 29 : 28;
        break;
      case 4: 
      case 6:
      case 9:
      case 11:
        dNum = 30;
        break;
      default:
        dNum = 31;
    }
    return dNum;
  }

  function getFirstDay():number { return (new Date(curYear, curMonth - 1, 1).getDay()); }

  function renderCalendar() {
    let daysNum = getDaysNum();
    let firstDay = getFirstDay();
    let calendarDom = [];
    for(let j = 1; j < daysNum+1; j++ ){
      calendarDom.push(
        <GridListTile style={{ border: (j===curDate) ? "5px solid #4d9660" : "" }} 
            key={curYear+"/"+curMonth+"/"+j} >
          <img src={Img} style={{ height:"100%", width:"auto" }} onClick={() => setCurDate(j)}/>
            <GridListTileBar
              title={curMonth+"/"+j}
              subtitle={<span>by: { weekCn[(j+firstDay-1)%7] }</span>}
              actionIcon={
                <IconButton aria-label={`Record today`} href="#/Diary">
                  <EditIcon />
                </IconButton>
              }
            />
        </GridListTile>
      )
    }
    return calendarDom;
  }

  function renderDatapicker() {
    let datapickerDom = [];
    for(let i:number = curYear - 50; i <curYear + 50; i++ ){
      datapickerDom.push(
        <MenuItem key={i} selected={i === curYear} onClick={(event) => handleMenuItemClick(event, i)}>
          {i}
        </MenuItem>
      )
    }
    return datapickerDom;
  }


  return (
    <div>
      <Grid container spacing={2}>
        <Grid container item xs={12} justify="center" alignItems="center" style={{ backgroundColor: '#4d9660' }}>
          <Grid container item xs={10} justify="center" alignItems="center">
            <Typography component="div" color="textPrimary" style={{fontSize:32}}>
                💗 - Mini Diary - 💗 
            </Typography>
          </Grid>
        </Grid>
        <Grid container item xs={12} justify="center" alignItems="center"  style={{ backgroundColor: '#4d9660' }}>
          <Grid container item xs={10} justify="center" alignItems="center">
            <Typography component="div" color="textSecondary" >
              An achievable goal: Be happy today ❤ And next step: Be happy everyday
            </Typography>
          </Grid>
        </Grid>
        
        <Grid container item xs={12} justify="center" alignItems="center" >
          <Grid container item xs={10} justify="center" alignItems="center">
            <Grid container item xs={4} justify="flex-start" alignItems="center">
              <Button id="lastMonthBtn" onClick={monthSwitchBtnClickHandler} color="primary" startIcon={<ArrowBackIosIcon />}>
                {curMonth < 2 ? "Dec" : month[curMonth - 2]}
              </Button>
            </Grid>
            <Grid container item xs={4} justify="center" alignItems="center">
              <Typography component="div" color="textPrimary" style={{fontSize:24}}>
                { month[curMonth-1] + " " + curYear }
              </Typography>
              <IconButton aria-label={`Jump to a day`} color="primary" onClick={openDatePicker}>
                  <TodayIcon />
              </IconButton>
              <Menu anchorEl={anchorEl} keepMounted open={open} onClose={closeDatePicker} 
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }} 
                PaperProps={{
                  style: {
                    maxHeight: ITEM_HEIGHT * 4.5,
                    width: '10ch',
                  },
                }}
              >
                { renderDatapicker() }
              </Menu>
            </Grid>
            <Grid container item xs={4} justify="flex-end" alignItems="center">
              <Button id="nextMonthBtn" onClick={monthSwitchBtnClickHandler} color="primary" endIcon={<ArrowForwardIosIcon />}>
                {curMonth > 11 ? "Jan" : month[curMonth]}
              </Button>
            </Grid>
          </Grid>
        </Grid>

        <Grid container item xs={12} justify="center" alignItems="center">
          <Grid item xs={10}>
            <GridList cellHeight={120} cols={7}>
                {weekEn.map((item)=>(
                  <GridListTile cols={1} key={item} style={{ height: 'auto' }}>
                    <ListSubheader component="div" style={{ textAlign:"center" }}>
                      {item}
                    </ListSubheader>
                  </GridListTile>
                ))}
                <GridListTile cols={ getFirstDay() === 1 ? 7 : getFirstDay() === 0 ? 6 : getFirstDay()-1 } style={{ height: 'auto' }}></GridListTile>
                { renderCalendar() }
            </GridList>
          </Grid>
        </Grid>
      </Grid>

    </div>
  )
}

