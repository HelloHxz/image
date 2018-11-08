const path = require('path');
const webpack = require('webpack');
var fs = require('fs');
// var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');


function getEntryAndHtmlPlugin(siteArr,isBuild){
  var re = {entry:{},htmlplugins:[]};
  for(var i=0,j=siteArr.length;i<j;i++){
    var siteName = siteArr[i];
    re.entry[siteName] = "./"+siteName+"/index.js";//js多入口字典对象
    re.htmlplugins.push(new HtmlWebpackPlugin({
        // 打包的时候将html输出到git根目录下面 方便发布
        // 正常的：filename: siteName+'.html', //打包出来的html名字
        filename: (siteName)+'.html', //打包出来的html名字
        template: './'+siteName+'/index.html', //模版路径
        inject: 'body' ,
        chunks:[siteName],//js注入的名字
        hash:true
      }));
  }
  return re;
}


var rmdirSync = (function(){
  function iterator(url,dirs){
      var stat = fs.statSync(url);
      if(stat.isDirectory()){
          dirs.unshift(url);//收集目录
          inner(url,dirs);
      }else if(stat.isFile()){
          fs.unlinkSync(url);//直接删除文件
      }
  }
  function inner(path,dirs){
      var arr = fs.readdirSync(path);
      for(var i = 0, el ; el = arr[i++];){
          iterator(path+"/"+el,dirs);
      }
  }
  return function(dir,cb){
      cb = cb || function(){};
      var dirs = [];

      try{
          iterator(dir,dirs);
          for(var i = 0, el ; el = dirs[i++];){
              fs.rmdirSync(el);//一次性删除所有收集到的目录
          }
          cb()
      }catch(e){//如果文件或目录本来就不存在，fs.statSync会报错，不过我们还是当成没有异常发生
          e.code === "ENOENT" ? cb() : cb(e);
      }
  }
})();

module.exports = function (env) {
  const appList = ['index'];
  const nodeEnv =  env.env || 'development';
  const action = env.action||'start';
  const isBuild = action==='build';
  var entryAndHtmlPlugin = getEntryAndHtmlPlugin(appList,isBuild);
  var entry = entryAndHtmlPlugin.entry;
  var plugins= [
      new webpack.NamedModulesPlugin(),
      new webpack.LoaderOptionsPlugin({
          minimize: true
      }),
  ];

  plugins = plugins.concat(entryAndHtmlPlugin.htmlplugins);

  if(isBuild){
    rmdirSync('./dist');
  }else{
    plugins.push(new webpack.HotModuleReplacementPlugin());
    var ip = arguments["1"].host||"localhost";
    var port =   arguments["1"].port||8080;
    var url = "http://"+ip+":"+port;
    entry.dev_patch = 'react-hot-loader/patch';
    entry.dev_client = 'webpack-dev-server/client?'+url;
    entry.dev_server= 'webpack/hot/only-dev-server';
  }



return {
  context: path.resolve(__dirname, 'app'),
  mode:nodeEnv,
  entry:entry,
  output: {
    filename: '[name].[hash:8].js',
    chunkFilename: !isBuild ? '[name].bundle.js' : '[name].[chunkhash:8].min.js',
    // the output bundle

    path: path.resolve(__dirname, 'dist'),
    // 打包的时候将html输出到git根目录下面 方便发布 目录引用 加dist
    publicPath: isBuild?'./':'/'
  },
 
  watchOptions: {
    poll: true
  },
  devtool: isBuild ? 'cheap-module-source-map':'#source-map',
  devServer: {
    hot: true,
    // enable HMR on the server
    contentBase: path.resolve(__dirname, 'dist'),
    // match the output path
    publicPath: isBuild?'./':'/',
    //支持historyState
    //historyApiFallback:true ???
    historyApiFallback:{
      index:isBuild?'./':'/'+appList[0]+'.html',
      // rewrites: [
      //   { from: /^\/admin/, to: 'build/admin.html' }
      // ],
    },
  },
  resolve: {
     mainFiles: ["index.web","index"],
     modules: [path.resolve(__dirname, "src"), "node_modules"]
  },


  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, ''),
        ],
        use: {
          loader:'babel-loader',
          options:{
            "presets": [
              "@babel/preset-react",
              "@babel/preset-env",
            ],
            "plugins": [
              "@babel/plugin-transform-react-jsx",
              "@babel/plugin-proposal-class-properties",
          ]
          }
        },
        
      },
      {
          test: /\.md$/,
          use: [
              {
                  loader: "raw-loader"
              }
          ]
      },
      {
        test: /\.css$/,
       
        use: [ 'style-loader', 
            {
                loader: "css-loader",
              
            },{
              loader:"postcss-loader",
               options: {
                plugins: (loader) => [
                  require('postcss-import')({ root: loader.resourcePath }),
                  require('autoprefixer')(),
                ]
              }
            } ],
      },
      { 
        test: /\.(png|jpg|jpeg|gif|woff)$/, 
        loader: 'url-loader?limit=6144&name=imgs/[path][name].[ext]'
      },
       {
          test: /\.(eot|svg|ttf|woff|woff2)$/,
          loader: 'file-loader?name=fonts/[name].[ext]'
      },
      {
        test: require.resolve('jquery'),
        use: [{
           loader: 'expose-loader',
           options: 'jQuery'
        },{
           loader: 'expose-loader',
           options: '$'
        }]
     },
      {
            test: /\.less$/,
           
            use: [{
                loader: "style-loader" 
            }, {
                loader: "css-loader" ,
                 options:{
                   minimize:true
                },
            }, 
            {
              loader:"postcss-loader",
               options: {
                plugins: (loader) => [
                  require('postcss-import')({ root: loader.resourcePath }),
                  require('autoprefixer')(),
                ]
              }
            },
            {
                loader: "less-loader",
                options: {
                  javascriptEnabled: true
                }
            }]
      }
    ],
  },

  plugins:plugins,
};
}


