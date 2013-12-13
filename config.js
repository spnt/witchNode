var path = require('path'),
    processPath = path.dirname(process.argv[1]);//运行node的目录，这里可以方便替换下面baseDir的__dirname,方便用户自己搭建目录，利用node_modules加载rrestjs
module.exports = {
//自定义配置
//通用配置
    /*
     * 注意，所有的路径配置的前面请加‘/’而后面不要加'/'！
     */
    listenPort:3000,//监听端口，如果配合clusterplus监听多个端口，这里也可以使用[3000, 3001, 3002, 3003]数组形式，rrestjs会智能分析
    baseDir: path.join(__dirname, '/..'), //绝对目录地址，下面的目录配置都是根据这个目录的相对地址，这里是根据config文件进行配置地址
    //baseDir:processPath,//这里是根据启动nodejs的命令目录来设置baseDir
    staticParse:true,//是否开启静态文件压缩整合功能
    staticParseName:'parse',//压缩整合功能的名称，例如用户可以'/static/?parse=/index.body.css|/index.user.css|/user.face.css'压缩整合成一个css响应给客户端
    staticParseCacheTime:1000*60*60,//压缩整合缓存时间，1小时
    staticParseCacheFolder:'/tmp/static',//缓存整合功能的缓存文件夹
    staticParseMaxNumber:10,//整合压缩css或js文件的最大上限，建议不要超过15
    uploadFolder:'/tmp/upload', //文件上传的临时目录
    postLimit:1024*1024*100,//限制上传的postbody大小，单位byte
//web属性配置
    webTitle:'左盐的node',//网站标题
//cluster配置
    isCluster:false, //是否开启多进程集群
    isClusterAdmin:false,//进程监听管理功能是否开启
    CLusterLog:false,//是否打开cluster自带的控制台信息，生产环境建议关闭
    adminListenPort:20910,//管理员监听端口号
    adminAuthorIp:/^10.1.49.223$/,//允许访问管理的IP地址
    ClusterNum:2, //开启的进程数
    ClusterReload:'/controller',//只有当进程数为1时，进入开发模式，可以监听此文件夹下的改动，包括子文件夹，不用重复 ctrl+c 和 上键+enter
//静态文件配置
    staticMaxAge : 86400000*7, //静态文件的缓存周期，建议设置为7天
    staticGetOnly : true, //静态是否只能通过get获取
    staticLv2MaxAge : 1000*60*60, //静态文件2级缓存更新周期，建议设置为1小时
    staticLv2Number : 10000,//静态文件2级缓存数量，可以根据内存的大小适当调整
//session配置
    isSession:false, //是否开启session，开启会影响性能。
    syncSession:true,//当多进程时是否开启session同步，开启会影响性能。
    sessionName:'rrSid', //保存session id 的cookie 的name
    sessionExpire:false, //false表示会话session，否则填入1000*60，表示session有效1分钟
    clearSessionSetInteval:1000*60*60, //自动清理垃圾session时间，建设设置为1小时
    clearSessionTime:1000*60*60*24*7,//会话session超时，建议设置为1天
//session内存存储
    sessionDbStore:false,//是否使用mongodb数据库存储session，如果设置为true，则不需要同步session
//deflate和gzip配置
    isZlib:true, //是否开启delate和gizp压缩，大并发压缩虽然可以减少传输字节数，但是会影响性能
    ZlibArray:['text/plain', 'application/javascript', 'text/css', 'application/xml', 'text/html'], //只压缩数组中的content-type响应
//logger log4js 配置
    isLog:false, //是否开启日志，过多的记录日志会影响性能，但是能记录系统运行情况
    logLevel:'info',//['trace','debug','info','warn','error', 'fatal'] 日志等级
    logPath:'/mylogs/console.log', // "/mylogs/console.log" 日志存放目录
    logMaxSize:1024*1024*10, //单个日志文件大小
    logFileNum:10, //当单个日志文件大小达标时，自动切分，这里设置最多切分多少个日志文件
//Template
    tempSet:'ejs', //使用哪种页面模版：jade或者ejs
    tempFolder :'/view/template', //默认读取模版的根目录
    tempHtmlCache:false, //是否开启模版的html缓存，当输出模版需要大量数据库或缓存I/O操作，且实时性要求不高时可以使用
    tempCacheTime:1000*60*60,//模版缓存时间
    tempCacheFolder:'/tmp/template', //模版缓存 存放目录
//mongodb 配置
    MongodbConnectString:'mongodb://192.168.1.207:10000,192.168.1.207:20000,192.168.1.207:30000/?safe=true&replicaSet=Friend&slaveOk=true&w=2&wtimeoutMS=2000', //MongoDB连接字符串
//redis配置
    redisPort:'6379',
    redisIp:'192.168.1.207',
    redisMaxPoll:300,//redis最大连接池
    redisDataBase:'zuoyan',//默认使用的redis数据库

}