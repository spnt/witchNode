/**
 * Created with JetBrains WebStorm.
 * User: 乔祝垒
 * Date: 13-12-5
 * Time: 上午9:48
 * To change this template use File | Settings | File Templates.
 */

//用户数据 mongodb 访问层
var mongo = require('../../lib/mongo.js'),
    schema=mongo.mongoose.Schema;

var userSchema=new schema({//数据模型定义
        userName:String,
        password:String
    });

var user=mongo.mongoose.model('users',userSchema);//实际意义的数据模型

var User= {
       generr:'user id generate error'
    };
/**
 * 创建新用户
 * @param userInfo
 * @param callback
 */
User.insert = function(userInfo, callback){
    var instan=new user(userInfo);//根据模型创建实体
    instan.save(function(err){
       callback(err);
    });
}

/*
 获取某个用户的注册信息
 需要提供参数 userId
 */
User.findone=function(userId,callback){
   user.findOne({_id:schema.ObjectId(userId)},function(err,doc){
       callback(err,doc);
   })
}

/*
    用户登录
 */
User.login=function(uname,callback){
    user.findOne({userName:uname},function(err,doc){
        callback(err,doc);
    });
}


module.exports = User;