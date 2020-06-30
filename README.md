# React
A Mini Diary By React

## React项目搭建过程记录

在想要创建项目的路径下cmd依次运行以下各条命令：    
```
mkdir React_Mini_Diary
cd React_Mini_Diary
npm init -y

npm install --save react react-dom
npm install --save-dev webpack webpack-cli webpack-dev-server  //一定要一起同时安装!!
npm install --save-dev typescript ts-loader @types/react @types/react-dom
npm install --save-dev html-webpack-plugin
```

项目根目录下新建webpack的配置文件webpack.config.js，其内容如下：    
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
项目根目录下新建webpack的配置文件tsconfig.json，其内容如下：    
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
创建文件夹src，src下添加index.ejs，其内容如下：    
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
src下添加index.ejs，其内容如下：    
```
import * as React from 'react';
import * as ReactDOM from 'react-dom';

ReactDOM.render(
  <p>呵！ React</p>,
  document.getElementById('root')
);
```
package.json文件 "scripts"：{}中添加：    
`"server": "webpack-dev-server --mode=development --http"`    
`npm run server `   
访问 http://127.0.0.1:8888/webpack-dev-server 可查看打包后的结构    
访问 http://127.0.0.1:8888/main.html 查看页面    

**遇到的问题：**    

**Q：** 起初没有install webpack-cli，运行npm run server时提示： `Please install 'webpack-cli' in addition to webpack itself to use the CLI.`    
安装完后又提示：`Cannot find module 'webpack-cli/bin/config-yargs'`    

**A：**  https://www.cnblogs.com/zixuan00/p/10974970.html    
将 webpack，webpack-cli，webpack-dev-server都卸载掉然后重新一起安装。    

**Q：** 生成sourceMap失败，bug定位到bundle.js，无法准确定位到源文件。    

**A：** package.json文件 "scripts"：{}中改成添加：    
`"server": "set GENERATE_SOURCEMAP=true && webpack-dev-server --mode=development --http" `    
webpack.config.js中的`devtool: 'inline-source-map'` 也可以去掉了。
