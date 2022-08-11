const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;








// 解决开发环境打包后出现分析包网站问题
if (process.env.NODE_ENV === 'production') {// 如果为生产环境时
    module.exports = {
        plugins: [new BundleAnalyzerPlugin()],// 打开分析包网站
        externals: {// 以下插件不再被打包
            vue: 'Vue',
            vuex: 'Vuex',
            'vue-router': 'VueRouter',
            axios: 'axios'
        }
    }
}else{
    module.exports = {}
}
