const {createProxyMiddleware} =require('http-proxy-middleware');

module.exports = (app) => {
    app.use(
        createProxyMiddleware('/ckfinder',{
            target:'http://localhost:3002/',
            changeOrigin:true
        })
    )
}