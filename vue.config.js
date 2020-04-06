module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                '@assets': '@/assets',
                '@components': '@/components',
                '@common': '@/common',
                '@views': '@/views',
                '@images': '/public/images'
            }
        }
    },
    publicPath: './',    // 公共路径
}
