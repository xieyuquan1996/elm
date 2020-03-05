module.exports = {
    publicPath: './',
    outputDir: 'dist',
    devServer:{
        port: 8081,
        proxy: {
            '/api':{
                target: 'http://localhost:8080/',//后端接口地址
                secure: true, // 如果是https接口，需要配置这个参数
                changeOrigin: true,//是否允许跨越
                pathRewrite: {
                    '^/api': '/api',//重写,
                }
            }
        }
    }
}