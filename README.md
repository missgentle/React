# React
A Mini Diary By React

## React项目搭建过程记录

> (虽然很有可能没人会看😓但还是要码的字：)
> 声明在先：如果是和我一样之前React完全0基础的同学，那官方文档是一定要撸的，以下是我的学习建议(当然有更适合自己的思路更好)：    
> 建议先跟着官网做个小例子体会一下react的思想 https://reactjs.org/tutorial/tutorial.html     
> 然后去看理论，特别是 Main Concepts 部分 https://reactjs.org/docs/hello-world.html     
> 但我的项目并没有用官网推荐的脚手架启，所以还需要没基础的同学去了解一下webpack：    
> 喜欢边做边学的墙裂推荐看这里 https://webpack.js.org/guides/getting-started/     
> 学习能力不是很强的可以先简单看下很基础的概念 https://webpack.js.org/concepts/    
> 然后因为还使用了UI框架Material-UI，所以你懂的 https://material-ui.com/zh/getting-started/installation/    
> 我现在自己看看都感叹，想不到做个项目要学这么多，但不要怕，我有现在的水平花了整整两年，虽然很菜，但一点一点的积累总会有质的飞跃。

1 在想要创建项目的路径下cmd依次运行以下各条命令：    
```
mkdir React_Mini_Diary
cd React_Mini_Diary
npm init -y

npm install --save react react-dom
npm install --save-dev webpack webpack-cli webpack-dev-server  //一定要一起同时安装!!
npm install --save-dev typescript ts-loader @types/react @types/react-dom
npm install --save-dev html-webpack-plugin
```

2 项目根目录下新建webpack的配置文件webpack.config.js，其内容如下：    
```
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.tsx',
  devServer: { 
    disableHostCheck: true,
    host: '0.0.0.0',
    port: '8888',
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
        title: "MiniDiary",
        filename: "main.html", 
        template: "src/index.ejs" , 
        chunks: [ 'main' ],
    })
  ],
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
    alias: {
      '@': path.join(__dirname, "src"),
    }
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
```

3 项目根目录下新建webpack的配置文件tsconfig.json，其内容如下：    
```
{
    "compileOnSave": false,
    "compilerOptions": {
        "allowSyntheticDefaultImports": true,
        "experimentalDecorators": true,
        "lib": [
            "dom",
            "esnext",
        ],
        "target": "esnext",
        "module": "esnext",
        "moduleResolution": "node",
        "jsx": "react",
        "allowJs": true,
        "noImplicitAny": false,
        "sourceMap": true,
        "skipLibCheck": true,
        "baseUrl": ".",
        "paths": {
          "@/*": [
            "*",
            "src/*"
          ]
        },
        "types" : [],
       
    }
}
```

4 创建文件夹src，src下添加index.ejs，其内容如下：    
```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
  </head>
  <body>
    <div id="root" ></div>
  </body>
</html>
```

5 src下添加index.tsx，其内容如下：    
```
import * as React from 'react';
import * as ReactDOM from 'react-dom';

ReactDOM.render(
  <p>呵！ React</p>,
  document.getElementById('root')
);
```

6 package.json文件 "scripts"：{}中添加：    
`"server": "webpack-dev-server --mode=development --http"`    
`npm run server `   

7 访问 http://127.0.0.1:8888/webpack-dev-server 可查看打包后的结构    
访问 http://127.0.0.1:8888/main.html 查看页面    

**遇到的问题：**    

**Q：** 起初没有install webpack-cli，运行npm run server时提示： `Please install 'webpack-cli' in addition to webpack itself to use the CLI.`    
安装完后又提示：`Cannot find module 'webpack-cli/bin/config-yargs'`    
**A：**  https://www.cnblogs.com/zixuan00/p/10974970.html    
将 webpack，webpack-cli，webpack-dev-server都卸载掉然后重新一起安装。    

8 为了快速构筑页面引如一个UI框架Material-UI：    
`npm install --save @material-ui/core @material-ui/icons`    

9 src下添加components文件夹，components下新增Alert.tsx，内容如下：
```
import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper, { PaperProps } from '@material-ui/core/Paper';
import Draggable from 'react-draggable';

function PaperComponent(props: PaperProps) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

export interface AlertProps { 
  open: boolean;
  text: string; 
  title: string;
  cancelHandler: any;
  commitHandler: any;
}

export const Alert = (props: AlertProps) => {
  const [open, setOpen] = React.useState(false);

  return (
      <Dialog
        open={props.open}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          {props.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {props.text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={props.cancelHandler} color="primary">
            取消
          </Button>
          <Button onClick={props.commitHandler} color="primary">
            确定
          </Button>
        </DialogActions>
      </Dialog>
  );
}

```
这段代码是从Material-UI官网拷过来改吧改吧的，官网源码：https://material-ui.com/zh/components/dialogs/#draggable-dialog 可拖动的对话框

10 index.tsx内容替换如下：
```
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Button} from '@material-ui/core';
import {Alert} from '@/components/Alert';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const initState = {
    alertOpen: false,
    alertTitle: "提示",
    alertText: ""
};

interface CalendarState {
	alertOpen: boolean,
    alertTitle: string,
    alertText: string
}


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

	render(){
		return (
			<div>
			<Alert open={this.state.alertOpen} title={this.state.alertTitle} text={this.state.alertText} 
			cancelHandler={this.alertCloseHandler} commitHandler={this.alertCloseHandler}/>
			<Button size='small' startIcon={<DeleteForeverIcon />} onClick={this.btnClickHandler}>Show Alert</Button>
			</div>
		)
	}
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```

**遇到的问题：**    

**Q：** 生成sourceMap失败，bug定位到bundle.js，无法准确定位到源文件。    
**A：** package.json文件 "scripts"：{}中改成添加：    
`"server": "set GENERATE_SOURCEMAP=true && webpack-dev-server --mode=development --http" `    
webpack.config.js中的`devtool: 'inline-source-map'` 也可以去掉了。    

**Q：** index.tsx中`class App extends React.Component<any, CalendarState>` 这里为什么要加<any, CalendarState>？    
**A：** 因为React.Component定义是这样的 `interface Component<P = {}, S = {}, SS = any>` ，props和state默认值都是{}，
而我们使用的ts编写代码，由于严格的规范不加<any, CalendarState>会导致编译无法通过，在访问this.props.xxx或this.state.xxx时，
报错没有xxx这个属性。为了省事，也完全可以写<any, any>，但既然用了ts那就规范起来，这里定义一个CalendarState接口，props还没用到，暂且先用any填充。    

11 到此，主要的测试已经差不多了，接下来真正开始这个项目UI构筑，index.tsx内容替换如下：    

```
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
	Button,Grid,Typography,Breadcrumbs,Link,
	GridList,GridListTile,ListSubheader,GridListTileBar,
	IconButton,Paper
} from '@material-ui/core';
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
    curYear: curYear,
    curMonth: curMonth,
    curDate: curDate,
};

const weekEn = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
const weekCn = ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
const month = ["Jan","Feb","Mar","Apr","May","June","July","Aug","Sept","Oct","Nov","Dec"];

interface CalendarState extends React.HTMLAttributes<HTMLElement>{
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
		</div>
		)
	}
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```
这里的日历生成逻辑参考了这篇文章：https://www.php.cn/js-tutorial-408941.html    
UI还是抄官网的改一改😓。。。。。。

**遇到的问题：**    

**Q：** 怎么确定是平年还是闰年？   
**A：** 要不是找了篇参考代码，我还真不知道怎么确定，我以为就是单纯的除以4，结果又涨知识了。

**Q：** new Date().getMonth()为什么得到的数字是上个月的月份？   
**A：** 这里不得不说好坑，我纳闷了半天，还以为是哪里计算给我月份值给改了，结果最后查到getMonth()的返回值就是0-11，我心中的神兽又在奔跑了。    

12 这里为了引入了一张图片，可真的是做了不少工作，首先需要添加两个新的包：    

`npm install --save-dev url-loader file-loader`    
其中file-loader应该是url-loader的依赖包，因为install过程中我先只装了url-loader，启动时提示我要装file-loader。    

13 webpack.config.js中添加一点配置：    

```
	{
        test: /\.(png|svg|gif|jpg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 5000,
              name: 'img/[name].[ext]'
            }
          }
        ]
      }
```    

14 还是因为用的ts，还要加声明文件，src下创建types文件夹，创建global.d.ts，内容如下：

```
declare module "*.png" {
  const value: any;
  export = value;
}

declare module "*.jpg" {
  const value: any;
  export = value;
}

declare module "*.gif" {
  const value: any;
  export = value;
}

declare module "*.svg" {
  const value: any;
  export = value;
}
```    

15 src下建个imgs文件夹，图片随便加一个，到此页面布局基本也到位了，后面开始进入页面交互环节。引入图片过程中遇到了一些bug，就是对应上面这几个步骤了。    
期间一个小技巧就是页面图片不显示时，访问 http://127.0.0.1:8888/webpack-dev-server 看打包出来的结构中是否有这个资源。    

