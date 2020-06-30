# React
A Mini Diary By React

## React项目搭建过程记录

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

11 

