//导入node自带的拼接路径模块
const path = require('path')
    //导入默认预览模块
const HtmlWebpackPlugin = require("html-webpack-plugin");
//创建对象
const htmlPlugin = new HtmlWebpackPlugin({
        //设置生成预览页面的模板文件
        template: "./src/index.html",
        //设置生成的预览页面名称
        filename: "index.html"
    })
    //配置.vue文件的加载器
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const vuePlugin = new VueLoaderPlugin();




//向外导出
module.exports = {
    // 编译模式
    mode: 'development', // development  production
    entry: path.join(__dirname, './src/index.js'), //入口文件
    output: {
        path: path.join(__dirname, './dist'), // 输出文件的存放路径
        filename: 'bundle.js' // 输出文件的名称
    },
    //插件配置
    plugins: [htmlPlugin, vuePlugin],
    //处理模块配置
    module: {
        rules: [{
                //test设置需要匹配的文件类型，支持正则//use表示该文件类型需要调用的loader  调用顺序是从后往前调用
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader']
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            { //匹配路径，或则文件解决配套
                test: /\.jpg|png|gif|bmp|ttf|eot|svg|woff|woff2$/,
                //limit用来设置字节数，只有小于limit值的图片，才会转换
                //为base64图片
                use: "url-loader?limit=16940"
            }, { //配置js中高级语法解决配套
                test: /\.js$/,
                use: "babel-loader",
                //exclude为排除项，意思是不要处理node_modules中的js文件
                exclude: /node_modules/
            },
            { //配置单页面vue文件解决配套
                test: /\.vue$/,
                loader: "vue-loader",
            }
        ]
    }
}