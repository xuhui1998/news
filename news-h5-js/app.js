
var express=require('express');
var { createProxyMiddleware }=require('http-proxy-middleware');
var app=express();
 
app.all("/*", function(req, res, next) {
    // 跨域处理
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next(); // 执行下一个路由
})
 
// 配置代理
app.use("/list",createProxyMiddleware({
	target: 'http://v.juhe.cn/toutiao/index',
	// 转发时重写路径
	pathRewrite: {'^/list' : ''},
	changeOrigin: true 
}));
app.use("/detail",createProxyMiddleware({
	target: 'http://v.juhe.cn/toutiao/content',
	// 转发时重写路径
	pathRewrite: {'^/detail' : ''},
	changeOrigin: true 
}));
app.listen(3000,function(){
    console.log('服务器运行在3000端口');
})