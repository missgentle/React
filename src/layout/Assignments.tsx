import React, { useState } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { IconButton, Typography, Divider, TextareaAutosize, 
  TextField, InputBase, Paper, Button }from '@material-ui/core/';
import DatePicker from '@/components/DatePicker';
import SaveIcon from '@material-ui/icons/Save';

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
    nameInput: {
      width: '70%',
    },
    dateInput: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
    dateContainer: {
      padding: '8px 0px',
      display: 'flex',
      alignItems: 'center',
      width: 400,
    },
    dateMargin:{
      padding: '8px',
    },
    saveBtn:{
      width: '80px',
      height: '35px',
      padding: '0px'
    },
    titleContainer:{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '70%'
    }
  }),
);

function datePickerChangeHandler(){}

export default function Assignments() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.titleContainer}>
      <h2> 任务计划 </h2>
      <Button className={classes.saveBtn} variant="contained" color="primary" 
          disableElevation startIcon={<SaveIcon />}>保存</Button>
      </div>
      <TextField label="任务名称" className={classes.nameInput} type="search" variant="outlined" />
      <div className={classes.dateContainer}>
        <DatePicker value="2020/08/13" onChange={datePickerChangeHandler}/>
        <Typography className={classes.dateMargin}> ~ </Typography>
        <DatePicker value="2020/08/13" onChange={datePickerChangeHandler}/>
      </div>
      <TextareaAutosize className={classes.textarea} rows={15} 
        rowsMax={15} placeholder="任务描述"/>
    </div>
  );
}
