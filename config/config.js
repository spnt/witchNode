
module.exports = {
   //web属性配置
    listenPort:3000,//监听端口
    uploadFolder:'/tmp/upload', //文件上传的临时目录
    postLimit:1024*1024*100,//限制上传的postbody大小，单位byte
    webTitle:'左盐的node',//网站标题
    staticMaxAge:604800000, //静态文件的缓存周期，建议设置为7天，单位毫秒
    md5Salt:'XDq-MW.Q',//供后端加密使用的盐
    keySalt:'H0UK*Lwd',//供前端加密使用的盐
    loginTimes:3,//登录次数，超出则锁定
    lockUserTime:1800,//锁定时间，单位秒
    webDomain:'192.168.1.202:3000',//网站主域名，用于判断Referer
//session配置
    sessionExpire:43200000, //session过期时间，12小时，ms
    clearSessionSetInteval:120000, //自动清理垃圾session时间，2小时
	  sessiconSecret: 'H0UK*Lwd', //session加密密匙
//logger log4js 配置
    isLog:false, //是否开启日志，过多的记录日志会影响性能，但是能记录系统运行情况
    logLevel:'info',//['trace','debug','info','warn','error', 'fatal'] 日志等级
    logPath:'/mylogs/console.log', // "/mylogs/console.log" 日志存放目录
    logMaxSize:1024*1024*10, //单个日志文件大小
    logFileNum:10, //当单个日志文件大小达标时，自动切分，这里设置最多切分多少个日志文件
//mongodb 配置
    MongodbConnectString:'mongodb://192.168.1.208:10000,192.168.1.208:20000,192.168.1.208:30000/rrest?safe=true&replicaSet=Friend&slaveOk=true&w=2&wtimeoutMS=2000&maxPoolSize=15', //MongoDB连接字符串
//redis配置
    redisPort:'6379',
    redisIp:'192.168.1.208',
    redisMaxPoll:500,//redis最大连接池
    redisTimeOut:600000,//连接过期时间，过期连接将被删除//单位ms//现在定义为10分钟
    redisDataBase:0//默认使用的redis数据库下标，默认从0开始
}