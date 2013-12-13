
/**
 * Module dependencies.
 */

var cluster = require('cluster');//多进程模块
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
//app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());

app.use(express.static(path.join(__dirname, 'public')));//设置静态文件夹


/*var _userCluster = function(callback) {//定义的Cluster使用方法
    var numCPUs = config.ClusterNum;
    if (cluster.isMaster) {
        for (var i = 0; i < numCPUs; i++) {
            cluster.fork();
        }

        cluster.on('exit', function(worker, code, signal) {
            console.log('worker ' + worker.process.pid + ' died');
        });
    } else {
        callback();
    }
};*/

/*if (process.env.NODE_ENV == 'production') {//生产环境
    _userCluster(function(){
        http.createServer(app).listen(app.get('port'), function(){
            console.log('Express server listening on port ' + app.get('port'));
        });
    })
}
else{//开发环境
    http.createServer(app).listen(app.get('port'), function(){
        console.log('Express server listening on port ' + app.get('port'));
    });
}*/
http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});

routes(app);
