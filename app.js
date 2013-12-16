
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');//加载路由
var http = require('http');
var path = require('path');
var config=require('./config');//加载配置文件


var app = express();


// 开发环境
app.configure('development', function() {
    app.use(express.logger('dev'));
    app.use(express.errorHandler());
});

// 生产环境
app.configure('production', function() {
    app.use(express.compress());
    app.use(function(req, resp, next) {
        resp.removeHeader('X-Powered-By');
        next();
    });
});

// all environments
app.set('port', config.listenPort);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.favicon());
app.use(express.json());
app.use(express.cookieParser());//使用cookie
app.use(express.urlencoded());
app.use(express.methodOverride());

app.use(express.static(__dirname+ '/public',{maxAge:config.staticMaxAge}));//设置静态文件夹和静态缓存


http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});

routes(app);
