module.exports = {
    publicPath: './',
    outputDir: 'dist',
    devServer:{
        port: 8081,
        proxy: {
            '/v3': {
                target: 'https://restapi.amap.com/',//后端接口地址
                secure: true, // 如果是https接口，需要配置这个参数
                changeOrigin: true,//是否允许跨越
                pathRewrite: {
                    '^/v3': '/v3',//重写,
                }
            },
            '/api':{
                target: 'http://shop.1ice.cn/',//后端接口地址
                secure: true, // 如果是https接口，需要配置这个参数
                changeOrigin: true,//是否允许跨越
                pathRewrite: {
                    '^/api': '/api',//重写,
                }
            },
            '/goods':{
                target: 'http://localhost:9527/',//后端接口地址
                secure: true, // 如果是https接口，需要配置这个参数
                changeOrigin: true,//是否允许跨越
                pathRewrite: {
                    '^/goods': '/goods',//重写,
                }
            },
            '/user':{
                target: 'http://localhost:9527/',//后端接口地址
                secure: true, // 如果是https接口，需要配置这个参数
                changeOrigin: true,//是否允许跨越
                pathRewrite: {
                    '^/user': '/user',//重写,
                }
            },
            '/token':{
                target: 'http://localhost:9527/',//后端接口地址
                secure: true, // 如果是https接口，需要配置这个参数
                changeOrigin: true,//是否允许跨越
                pathRewrite: {
                    '^/token': '/token',//重写,
                }
            },
            '/address':{
                target: 'http://localhost:9527/',//后端接口地址
                secure: true, // 如果是https接口，需要配置这个参数
                changeOrigin: true,//是否允许跨越
                pathRewrite: {
                    '^/address': '/address',//重写,
                }
            },
            '/ratings':{
                target: 'http://localhost:9527/',//后端接口地址
                secure: true, // 如果是https接口，需要配置这个参数
                changeOrigin: true,//是否允许跨越
                pathRewrite: {
                    '^/ratings': '/ratings',//重写,
                }
            },
            '/shop':{
                target: 'http://localhost:9527/',//后端接口地址
                secure: true, // 如果是https接口，需要配置这个参数
                changeOrigin: true,//是否允许跨越
                pathRewrite: {
                    '^/shop': '/shop',//重写,
                }
            }
            
        }
    }
}