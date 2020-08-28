const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

// 打包输入路劲
const dllPath = 'public/vendor'

module.exports = {
    entry: {
        // ddl需要打包的npm模块
        vendor: ['vue', 'vue-router', 'vuex', 'axios', 'element-ui']
    },
    output: {
        path: path.join(__dirname, dllPath),
        filename: '[name].dll.js',
        // vendor.dll.js
        //  webpack.DllPlugin
        library: '[name]_[hash]'
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: 'production'
            }
        }),
        // manifest.json
        new webpack.DllPlugin({
            path: path.join(__dirname, dllPath, '[name]-manifest.json'),
            //  output.library
            name: '[name]_[hash]',
            context: process.cwd()
        })
    ]
}
