/**
 * Created with JetBrains WebStorm.
 * User: 乔祝垒
 * Date: 13-12-12
 * Time: 上午10:25
 * To change this template use File | Settings | File Templates.
 */
var log4js=require('log4js'),
    config=require('../config/config.js');

log4js.configure({//log4js配置
    "appenders": [{//控制台输出
            type:"console",
            category: "console"
        },{//文件输出
            "type": "file",
            "filename": '../logs/log.log',
            "maxLogSize":config.logMaxSize,
            "backups":config.logFileNum,
             "category": 'logger'
        }
    ],
    replaceConsole: true,//替换console.log
    lerels:{
        dateFileLog:'INFO'
    }
})//日志的配置

var dateFileLog = log4js.getLogger('dateFileLog');
exports.logger = dateFileLog;

exports.use = function(app) {
    //页面请求日志,用auto的话,默认级别是WARN
    //app.use(log4js.connectLogger(dateFileLog, {level:'auto', format:':method :url'}));
    app.use(log4js.connectLogger(dateFileLog, {level:'debug', format:':method :url'}));
}