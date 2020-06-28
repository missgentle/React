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
