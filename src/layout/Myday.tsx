import React, { useState } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { Typography, TextareaAutosize }from '@material-ui/core/';
import { getUrlPara } from '@/utils/commonUtils';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column'
    },
    textarea:{
      width: '70%', 
      fontSize: '16px'
    },
  }),
);

export default function Myday() {
  const classes = useStyles();
  const [curYear, setCurYear] = useState(Number(getUrlPara('curYear')));
  const [curMonth, setCurMonth] = useState(Number(getUrlPara('curMonth')));
  const [curDate, setCurDate] = useState(Number(getUrlPara('curDate')));

  return (
    <div className={classes.root}>
      <h2> 我的一天 </h2>
      <Typography paragraph> {curYear}年{curMonth}月{curDate}日 </Typography>
      <TextareaAutosize className={classes.textarea} rows={20} rowsMax={20} 
        defaultValue={'今天是'+curYear+'年'+curMonth+'月'+curDate+'日，星期x，天气雷阵雨...'}/>
    </div>
  );
}
