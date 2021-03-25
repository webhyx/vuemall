/* 路径起别名 */
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        // '@': 'src' 默认有的别名
        'assets': '@/assets',
        'common' : '@/common',
        'components' : '@/components',
        'network' : '@/network',
        'views' : '@/views'
      }
    },
  }
}