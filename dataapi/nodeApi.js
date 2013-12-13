/**
 * Created with JetBrains WebStorm.
 * User: 乔祝垒
 * Date: 13-12-5
 * Time: 下午3:05
 * To change this template use File | Settings | File Templates.
 */
var nodeApi = {},
    Node= require('../data/node.js'),
    md5 =require('../modules/tools').md5;



var emsg={
    dberr:'数据库连接失败',
    emailerr:'邮箱格式错误',
    pwderr:'密码格式错误',
    pwderr2:'密码错误',
    setpwderr:'设置密码错误',
    setnameerr:'设置昵称错误',
    setdescerr:'设置描述错误',
    setemptyerr:'表单不能为空',
    setuiderr:'用户id错误',
    friendserr1:'已经是好友',
    friendserr2:'不是好友，删除失败',
    loveerr1:'已经喜欢过了',
    loveerr2:'还没喜欢，取消喜欢失败',
    aiderr:'文章id错误'
};
var dmsg={
    name:'WuJB会员',
    desc:'这家伙什么都没写！'
}


/*
 用户登录方法，返回callback(err,doc)
 */
nodeApi.page = function(pid,callback){
    Node.page(pid, function(err, docs){
        if(err) return callback(err);
         return callback(null,docs);
    })
}
/**
 * 创建节点
 * @param nodeInfo
 * @param callback
 */
nodeApi.insert=function(nodeInfo,callback){
    Node.insert(nodeInfo,function(err){
        return callback(err);
    })
}
/**
 * 获取节点属性
 * @param nodeid
 * @param callback
 */
nodeApi.get=function(nodeid,callback){
    Node.get(nodeid,function(err,doc){
        return callback(err,doc);
    })
}

/**
 * 更新节点
 * @param nodeInfo
 * @param callback
 */
nodeApi.edit=function(nodeid,nodeInfo,callback){
    Node.edit(nodeid,nodeInfo,function(err){
        if(err) return callback(err);
        return callback(null,true);
    })
}

module.exports = nodeApi;