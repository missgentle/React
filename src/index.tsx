import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
	Button,Grid,Typography,Breadcrumbs,Link,
	GridList,GridListTile,ListSubheader,GridListTileBar,
	IconButton,Paper
} from '@material-ui/core';
import {Alert} from '@/components/Alert';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import HomeIcon from '@material-ui/icons/Home';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import GrainIcon from '@material-ui/icons/Grain';
import InfoIcon from '@material-ui/icons/Info';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Img from '@/imgs/img.jpg';

const curTime = new Date();
const curYear = curTime.getFullYear(),
    curMonth = curTime.getMonth() + 1,
    curDate = curTime.getDate();

const initState = {
    alertOpen: false,
    alertTitle: "提示",
    alertText: "",
    curYear: curYear,
    curMonth: curMonth,
    curDate: curDate,
};

const weekEn = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
const weekCn = ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
const month = ["Jan","Feb","Mar","Apr","May","June","July","Aug","Sept","Oct","Nov","Dec"];

interface CalendarState extends React.HTMLAttributes<HTMLElement>{
    alertOpen: boolean,
    alertTitle: string,
    alertText: string,
    curYear: number,
    curMonth: number,
    curDate: number,
}

let diaryData = [];
let firstDay:number;


class App extends React.Component<any, CalendarState> {

	constructor(props){
		super(props);
		this.state = initState;
	}

	btnClickHandler = () => {
		this.setState({
			alertOpen: true,
			alertText: "确定要删除吗？"
		})
	}

	alertCloseHandler = () => {
		this.setState({
			alertOpen: false
		});
	}

	handleClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
		event.preventDefault();console.info('You clicked a breadcrumb.');
	}

  renderDiaryData = (curYear: number, curMonth: number) => {
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

	render(){
    this.renderDiaryData(this.state.curYear, this.state.curMonth);
		return (
			<div>
			<Grid container spacing={2}>
				<Grid container item xs={12} justify="center" alignItems="center" style={{ backgroundColor: '#4d9660' }}>
				<Grid container item xs={10} justify="center" alignItems="center">
		          <FavoriteBorderIcon fontSize="small"/>
		          <Typography component="div" color="textPrimary" >
		          	Mini Diary
			      </Typography>
			      <FavoriteBorderIcon fontSize="small"/>
		        </Grid>
		        </Grid>
		        <Grid container item xs={12} justify="center" alignItems="center"  style={{ backgroundColor: '#4d9660' }}>
		        <Grid container item xs={10} justify="center" alignItems="center">
			      <Typography component="div" color="textSecondary" >
		          	An achievable goal
			      </Typography>
		        </Grid>
		        </Grid>
		        <Grid container item xs={12} justify="center" alignItems="center"  style={{ backgroundColor: '#4d9660'}}>
				<Grid container item xs={10} justify="center" alignItems="center">
				  <Breadcrumbs aria-label="breadcrumb">
			      <Link color="inherit" href="/" onClick={this.handleClick} >
			        <HomeIcon />Material-UI
			      </Link>
			      <Link color="inherit" href="/getting-started/installation/" onClick={this.handleClick} >
			        <WhatshotIcon  />Core
			      </Link>
			      <Typography color="textPrimary" >
			        <GrainIcon />Breadcrumb
			      </Typography>
			    </Breadcrumbs>
        		</Grid>
        		</Grid>
        		<Grid container item xs={12} justify="center" alignItems="center" >
        		<Grid container item xs={10} justify="center" alignItems="center">
		          <Typography color="textPrimary" >
		          { month[this.state.curMonth] + " " + this.state.curYear}
              </Typography>
		        </Grid>
		        </Grid>
		        <Grid container item xs={12} justify="center" alignItems="center">
		        <Grid item xs={10}>
		          <GridList cellHeight={120} cols={7}>
		          	{weekEn.map((item)=>(
		          		<GridListTile cols={1} style={{ height: 'auto' }}>
				          <ListSubheader component="div" style={{textAlign:"center"}}>
				          	{item}
				          </ListSubheader>
				        </GridListTile>
		          	))}
                <GridListTile cols={firstDay-1} style={{ height: 'auto' }}></GridListTile>
                {diaryData.map((item) => (
			          <GridListTile key={item.year+"/"+item.month+"/"+item.day}>
			            <Paper />
                  <img src={item.img} alt={item.img} />
			            <GridListTileBar
			              title={item.month+"/"+item.day}
			              subtitle={<span>by: {weekCn[item.week]}</span>}
			              actionIcon={
			                <IconButton aria-label={`info about ${item.year}`}>
			                  <InfoIcon />
			                </IconButton>
			              }
			            />
			          </GridListTile>
			        ))}
			      </GridList>
		        </Grid>
		        </Grid>
      		</Grid>
      		<Grid container item xs={12} justify="center" alignItems="center" >
        	<Grid container item xs={5} justify="flex-start" alignItems="center">
	      		<Link color="inherit" href="/" onClick={this.handleClick} >
				    <ArrowBackIosIcon />{month[this.state.curMonth - 1]}
				</Link>
			</Grid>
			<Grid container item xs={5} justify="flex-end" alignItems="center">
	      		<Link color="inherit" href="/" onClick={this.handleClick} >
				    {month[this.state.curMonth + 1]}<ArrowForwardIosIcon />
				</Link>
			</Grid>
		    </Grid>
		    <Grid container item xs={12} justify="center" alignItems="center" >
				<Alert open={this.state.alertOpen} title={this.state.alertTitle} text={this.state.alertText} cancelHandler={this.alertCloseHandler} commitHandler={this.alertCloseHandler}/>
				<Button size='small' variant="contained" color="primary" startIcon={<DeleteForeverIcon />} onClick={this.btnClickHandler}>Show Alert</Button>
			</Grid>
			</div>
		)
	}
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
