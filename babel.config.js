// 生产环境下清除console打印
const plugins = []
if (process.env.NODE_ENV === 'production') {
    plugins.push('transform-remove-console')
}
plugins.push([
    '@babel/plugin-transform-modules-commonjs',
    {
        allowTopLevelThis: true,
    },
])
module.exports = {
  presets: [
    '@vue/app'
  ],
  plugins
}
