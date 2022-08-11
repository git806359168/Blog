const { defineConfig } = require('@vue/cli-service')









module.exports = defineConfig({
    transpileDependencies: true,
    devServer: {
        open: true, // 自动打开页面
        port: '8080',
        host: 'localhost',
        proxy: {
            '/api': {
                target: 'http://test.my-site.com'
            }
        }
    },
    configureWebpack: require('./webpack.config')// 解决开发环境打包后出现分析包网站问题
})
