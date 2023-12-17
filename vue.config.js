const productConfig = require("./public/config.json");
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // lintOnSave: false,
  publicPath: "/",
  devServer: {
    host: "0.0.0.0",
    open: false,
    allowedHosts: 'all',
    proxy: {
      //配置代理，解决跨域请求后台数据的问题
      "/api": {
        target: productConfig.baseUrl, //后台接口，连接本地服务
        ws: true, //是否跨域
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/",
        },
      }
    },
  },
})
