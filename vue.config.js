const path = require('path')

function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                '@assets': '@/assets',
                '@components': '@/components',
                '@common': '@/common',
                '@views': '@/views',
                '@images': '/public/images',
                '@': resolve('src')
            }
        }
    },
    publicPath: './',    // 公共路径
}
