const webpackConfig = require('./webpack.config')

module.exports = {
    publicPath: './',    // 公共路径
    configureWebpack: {
        ...webpackConfig
    }
}
