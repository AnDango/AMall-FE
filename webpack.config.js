/*
* @Author: MingyangWu
* @Date:   2017-09-04 17:24:08
* @Last Modified by:   MingyangWu
* @Last Modified time: 2017-09-07 11:26:07
*/
var webpack           = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
// var path              = require("path");
// path     : path.resolve(__dirname, './dist'),

// 环境变量配置（dev和online）
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';


// 获取html-webpack-plugin参数的方法
var getHtmlConfig = function(name){
	return{
		template : './src/view/' + name + '.html',
        filename : 'view/' + name + '.html',
        inject   : true,
        hash     : true,
        chunks   : ['common' , name]
	};
}
// webpack config
var config = {
	entry: {
        'common' : ['./src/page/common/index.js'],
		'index'  : ['./src/page/index/index.js'],
		'login'  : ['./src/page/login/index.js'],
	},
    output: {
        // 存放文件的路径
        path       : './dist', 
        // 访问文件的路径（访问url的前面一段）
        publicPath : '/dist', 
        filename   : 'js/[name].js'
    },
    devServer: {
        port : 23333,
        hot  : true
    },
    externals: {
    	'jquery' : 'window.jQuery'
    },
    plugins: [
    	// 独立通用模块到js/base.js
        new webpack.optimize.CommonsChunkPlugin({
        	name     : 'common',
        	filename : 'js/base.js'
        }),
        // 把CSS单独打包到文件
        new ExtractTextPlugin("css/[name].css"),
        // 处理Html模板
        /*new HtmlWebpackPlugin({
        	template : './src/view/index.html',
        	filename : 'view/index.html',
        	inject   : true,
        	hash     : true,
        	chunks   : ['common' , 'index']
        }),*/
        new HtmlWebpackPlugin(getHtmlConfig('index')),
        new HtmlWebpackPlugin(getHtmlConfig('login')),
        new webpack.HotModuleReplacementPlugin(),
    ],
    module: {
    	loaders: [{
    		test: /\.css$/ , loader: ExtractTextPlugin.extract("style-loader","css-loader")
    	},
    	{
    		test: /\.(jpg|png|gif|woff|svg|eot|ttf)\??.*$/ , loader: 'url-loader?limit=100&name=resource/[name].[ext]'
    	}
    	]
    },
};

if('dev' == WEBPACK_ENV){
    config.entry.common.push('webpack-dev-server/client?http://localhost:23333/');
}

module.exports = config;