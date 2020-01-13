const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

process.env.NODE_ENV = 'development';

module.exports = {
  mode: 'development',
  target: 'web',
  devtool: 'cheap-module-source-map', //to see the exact code when debuggin in browser
  entry: './src/index',
  output: {
    //no output file will be generated in dev env but this obj is required
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    stats: 'minimal', // minimal noise while server is running
    overlay: true, // this says that overlay any errors that occurs in the browser
    historyApiFallback: true, // all request will be sent to index.html to be handle with react router
    disableHostCheck: true,
    headers: { 'Access-Control-Allow-Origin': '*' }, // this 3 lines are necesary due to an open issue in last chrome version
    https: false
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.REACT_APP_API_URL': JSON.stringify('http://localhost:3001')
    }),
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      favicon: 'public/favicon.ico'
    })
  ],
  module: {
    // we tell to webpack what files we want to handle, we do that by declaring an array of rules
    rules: [
      {
        // first rule is for js, we tell how to find our js files
        test: /\.(js|jsx)$/,
        exclude: /node_modules/, // ignore node_modules because we don't need it to process any files from this directory
        use: ['babel-loader', 'eslint-loader'] //to tell webpack what to do with js files (run babel on these files)
        // 1 - babel transpile modern JS to run in all browser
        // 2 - babel transiple react JSX to js
      },
      {
        // this second rule is for process css
        test: /(\.css)$/,
        use: ['style-loader', 'css-loader'] // this allow us to import css and webpack will bundle all css into a single file
      }
    ]
  }
};

