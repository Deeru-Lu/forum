//该文件其实最终是要在Node环境下执行的
const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack') //组件热更新
const VueLoaderPlugin = require('vue-loader/lib/plugin') // Vue-Loader加载依赖包
//导出一个具有特殊属性配置的对象
module.exports = {
  //通过把入口包裹在数组中,并且添加'babel-polyfill',就可配置完成,实现把Ecmascript6中的API转换成Ecmascript5兼容的
  entry: ['babel-polyfill', path.join(__dirname, './src/main.js')], //打包入口文件模块路径
  //entry:path.join(__dirname,'./src/main.js'), //打包入口文件模块路径
  output: {
    path: path.join(__dirname, './dist'), //打包后出口文件模块所属目录,path必须是个绝对路径
    filename: 'bundle.js',  //打包后的结果文件名
    /*assetsPublicPath: '/',*/
  },

  devtool: 'inline-source-map',

  //这个插件就能自动把index.html的源码打包到dist里面去,而且index.html里面就不要引文件了,bundle.js会自动往index.js里面注入script引用加载链接的,而且引用名称也取决于你的bundle叫什么.
  plugins: [
    new htmlWebpackPlugin({
      template: './index.html'
    }),
    new webpack.NamedChunksPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new VueLoaderPlugin()//Vue-Loader设置
  ],
  mode: 'development',//Vue-Loader设置
  //配置webpack-dev-server的www目录
  //浏览器真正运行查看的是打包之后的结果
  //webpack-dev-server为了提高打包效率,它把打包文件存储在了内存中,你看不见
  //这里只是在告诉webpack-dev-server让你的打包结果运行在虚拟目录dist中
  //那这个时候你的打包结果中的index.html去加载资源时候确实需要相对于dist来找
  //./的话,webpack-dev-server就会直接把资源打包到项目根目录下
  //但注意:你也看不见它
  //那这个时候你在index.html文件中请求的资源就是相对于根目录来说
  devServer: {
    contentBase: './',
    hot: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        ws: true,
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  //第三方包引用是避免被打包的配置,因为第三包打包让文件变得非常大
  externals: {
    //key就是包名
    //value是全局的jquery导出的接口
    jquery: 'jQuery',
    vue: 'Vue',
    'vue-router': 'VueRouter',
    axios: 'axios',
    lodash: '_'
  },

  module: {
    rules: [
      {
        //正则表达式,当你去加载css结尾的文件时,就使用'style-loader','css-loader'来加载转换
        test: /.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {    //正则表达式,当加载jpg,png,gif,svg结尾的图片时,就使用file-loader来加载转换
          test:/\.(jpg|png|gif|svg)$/,
          use: [
              {
                  loader: 'file-loader',
                  options: {
                    outputPath:"./assets/img",
                    publicPath:"./dist/assets/img"
                  }

              }
          ]
      },
     /* {
        test: /\.(jpg|png|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            outputPath: 'img/',
            limit: 100 * 1024
          }
        }]
      },*/
      {
        test: /\.(jpg|png|gif)$/, //打包的文件以jpg,png,gif结尾
        use: {
          loader: 'file-loader',
          options: { //file-loader配置项
            limit:50000,
            //placeholder 占位符
            name: '[name]_[hash].[ext]',//保持打包后的图片名字和原来一样
            outputPath:"./assets/img",
            publicPath:"./dist/assets/img",
            //打包后的图片输出到images文件夹中
          }
        }
      },

      {  //正则表达式,当加载less结尾的文件时,就使用'less-loader''css-loader''style-loader'来加载转换
        test: /.less$/,
        use: [
          'style-loader',//3.再根据模块生成style节点插入head中
          'css-loader',//2.再把css转成JavaScript模块
          'less-loader'//1.先把less转化成css
        ]
      },
      {  //正则表达式,当加载js结尾的文件时,就使用'babel-loader'来加载转换将里面的Ecmascript 6语法转换成ecmascript 5的,为了让浏览器兼容,node-modules中的模块除外
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,//不转换node_modules中的文件模块,因为已经转换过了
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,//配置缓存目录
            presets: ['env'],
            plugins: ['transform-runtime'] //添加babel-transform-runtime配置
          }
        }
      },
      {//正则表达式,当加载vue结尾的文件时,就使用'vue-loader'来加载转换
        test: /.vue$/,
        use: [
          'vue-loader'
        ]
      }
    ]
  }
}