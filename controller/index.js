
var home = {},
    redisCache=require('../lib/redisApi.js'),
    tools=require('../lib/tools.js'),
    userApi=require('../models/userApi.js'),
    config=require('../config/config.js'),
    async=require('async');

home.index = function(req, res){//默认35M的内存
    //这是一个把模版内容写入redis缓存的例子
    redisCache.get('index',function(err,doc){
        if(err){
            res.send(err+"]]");
            return;
        }
        if(doc){//如果doc存在
            res.send(doc+"]]");
            return;
        }
        res.render('index',{cuo:'',err:''},function(err,html){
            if(err){
                res.send(err);
                return;
            }
            redisCache.set('index',html,100);
            res.send(html);
            return;
        });
    })
    return;
}

home.login=function(req,res){
    if(!tools.checkCSRF(req,'POST')){//此方法检测了是否是csrf攻击
        res.send('没有reffer或者csrf参数不正确');
        return;
    }
     var uname=req.body.username,
        psd=req.body.password;//生产中传输过来的密码应该加密，而且应该提高密码复杂度，防止碰撞
    async.waterfall([
        function(callback){
          redisCache.get(uname,function(err,docs){
                callback(err,docs);
          });
        },
        function(arg1,callback){
            if(!arg1){arg1=0;}
            else{arg1=parseInt(arg1);}
            if(arg1<=config.loginTimes){//可以登录
                userApi.login(uname,psd,function(err,doc){
                    if(err) {
                        if(arg1==config.loginTimes){
                            redisCache.set(uname,(arg1+1),300);//设置过期为5分钟
                        }
                        else{
                            redisCache.set(uname,(arg1+1),config.lockUserTime);//设置过期为30分钟
                        }
                       return callback('密码错误');
                    }
                    res.cookie('username',doc.userName);
                    res.cookie('id',doc._id.toString());
                    res.cookie('ckey',tools.md5(doc._id.toString()+config.keySalt));//最好也添加ip和User-Agent
                    redisCache.del(uname);
                    callback(null,true);//登录成功
                });
            }
            else{
                callback('已锁定')
            }

        }
    ],function(err,result){
        if(err){
            res.render('index',{cuo:'密码错误',err:err});
            return;
        }
        res.redirect('/default');
        return;
    });
}

/**
 * 临时方法，创建一个登录用户
 */
home.insert=function(req,res){
   var userInfo={
       userName:'root',
       password:tools.md5('123456'+config.md5Salt)//默认前台传输过来的密码(123456)需要加密，这里就省略了
   };
    userApi.insert(userInfo,function(err){
        if(err){
            res.send(err);
            return;
        }
        res.send('创建成功');
        return;
    })
}


module.exports = home; 