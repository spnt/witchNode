/**
 * Created with JetBrains WebStorm.
 * User: 乔祝垒
 * Date: 13-12-8
 * Time: 下午1:54
 *  redis缓存操作类
 */
var redisCache = {},
   redis = require("redis"),
   poolModule=require('generic-pool'),//连接池
   config=require('../config/config.js'),//配置
    redisDataBase=config.redisDataBase,//该项目所使用的redis数据库名称
    redisPool={
       acquire:function(database,callback){
         if(!this.pools[database]){
             this.pools[database]=this.makePool(database);//创建连接池
         }
          this.pools[database].acquire(function(err,client){//从连接池中获取连接
              callback(client);
          })
       },
       release:function(database,client){//释放数据库database的连接client
           this.pools[database]&&this.pools[database].release(client);
       },
       pools:{},// Cache of pools by database name.
       makePool: function(database){//Factory for pool objects.
          return poolModule.Pool({//构建连接池
            name:'redis',
            create:function(callback){
                var client=redis.createClient(config.redisPort,config.redisIp);
                client.on('connect', function (){
                    client.send_anyway = true;
                    client.select(database);
                    client.send_anyway = false;
                });
                callback(null,client);
            },
            destroy:function(client){//实现释放连接
                return client.quit();
            },
            max:config.redisMaxPoll,
            min:2,
            idleTimeoutMillis: config.redisTimeOut,
            log: false
        });
       }
}

/**
 * 存储数据
 * @param key
 * @param obj
 * @param timeSeconds 单位秒,默认过期时间为一个小时
 */
redisCache.set = function(key,obj,timeSeconds,database){
    timeSeconds=timeSeconds||3600;
    database=database||redisDataBase;
    redisPool.acquire(database,function(client){
        client.set(key,obj);
        client.expire(key,timeSeconds);
        redisPool.release(database,client);
    });
}
/**
 * 获取键值//如果键值不存在reply=null
 * @param key
 * @param callback
 */
redisCache.get=function(key,callback,database){
    database=database||redisDataBase;
    redisPool.acquire(database,function(client){
        client.get(key,function(err,reply){
            if(err){
                redisPool.release(database,client);
                callback(err);
            }
            redisPool.release(database,client);
            return callback(null,reply);
        });
    });
}
/**
 * 删除键值
 * @param key
 * @param database
 */
redisCache.del=function(key,database){
    database=database||redisDataBase;
    redisPool.acquire(database,function(client){
        client.del(key);
    })
}

module.exports = redisCache;//注册模块






