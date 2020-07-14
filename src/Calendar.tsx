import React, { useState } from 'react';
import {
  Grid,Typography,GridList,GridListTile,ListSubheader,
  GridListTileBar,IconButton,Paper,Button
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

const curTime = new Date();

const weekEn = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
const weekCn = ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
const month = ["Jan","Feb","Mar","Apr","May","June","July","Aug","Sept","Oct","Nov","Dec"];

let diaryData = [];
let firstDay:number;

export default function Calendar() {

  const [curYear, setCurYear] = useState(curTime.getFullYear());
  const [curMonth, setCurMonth] = useState(curTime.getMonth() + 1);
  const [curDate, setCurDate] = useState(curTime.getDate());

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

  function renderDiaryData (curYear: number, curMonth: number) {
    diaryData = [];
    let leapFlag: boolean = (curYear%400 === 0) || ((curYear%4 === 0) && (curYear%100 !== 0)) ? true : false ;
    let daysNum: number;
    switch(curMonth){
      case 2:
        daysNum = leapFlag ? 29 : 28;
        break;
      case 4: 
      case 6:
      case 9:
      case 11:
        daysNum = 30;
        break;
      default:
        daysNum = 31;
    }
    firstDay = new Date(curYear, curMonth - 1, 1).getDay();
    for(let j = 1; j < daysNum+1; j++ ){
      diaryData.push({
        img: Img,
        year: curYear,
        month: curMonth,
        day: j,
        week: (j+firstDay-1)%7
      });
    }
  }

  renderDiaryData(curYear, curMonth);

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
              <IconButton aria-label={`Jump to a day`} color="primary">
                  <TodayIcon />
              </IconButton>
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
                <GridListTile cols={ firstDay === 1 ? 7 : firstDay === 0 ? 6 : firstDay-1 } style={{ height: 'auto' }}></GridListTile>
                {diaryData.map((item) => (
                <GridListTile style={{ border: (item.year===curYear&&item.month===curMonth&&item.day===curDate) ? "5px solid #4d9660" : "" }} key={item.year+"/"+item.month+"/"+item.day}>
                  <img src={item.img} style={{ height:"100%", width:"auto" }} alt={item.img}/>
                  <GridListTileBar
                    title={item.month+"/"+item.day}
                    subtitle={<span>by: { weekCn[item.week] }</span>}
                    actionIcon={
                      <IconButton aria-label={`Record today`}>
                        <EditIcon />
                      </IconButton>
                    }
                  />
                </GridListTile>
              ))}
            </GridList>
          </Grid>
        </Grid>
      </Grid>

    </div>
  )
}

