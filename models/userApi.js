/**
 * Created with JetBrains WebStorm.
 * User: 乔祝垒
 * Date: 13-12-5
 * Time: 上午9:49
 * To change this template use File | Settings | File Templates.
 */
/*
 *根据session检查是否登录，3个参数，req,res,callback;
 *callback的返回值作为本函数的返回值
 */
var userApi = {},
    User= require('./data/user.js')
    config=require('../config/config.js'),
    md5 =require('../lib/tools').md5;


/*
    检查是否登录
    未登录则跳转到首页
    登录则返回uid
 */
userApi.isLogin = function(req, res){
    var uid =req.cookies.id,
        username=req.cookies.username;
      return new Array(uid,username);
}

/*
 用户登录方法，返回callback(err,doc)
 */
userApi.login = function(userName, password,callback){
    User.login(userName, function(err, doc){
        if(err) return callback(err);
        if(!doc){//如果用户不存在，返回错误
            return callback('用户不存在');
        }
        else{
            var dbpwd = doc.password;
            if(dbpwd!=md5(password+config.md5Salt)) return callback('登录失败');
           return callback(null,doc);
        }
    })
}

userApi.insert=function(userInfo,callback){
    User.insert(userInfo,function(err){
        callback(err);
    })
}


module.exports = userApi;