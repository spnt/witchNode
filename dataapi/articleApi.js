/**
 * Created with JetBrains WebStorm.
 * User: 乔祝垒
 * Date: 13-12-6
 * Time: 上午10:05
 * To change this template use File | Settings | File Templates.
 */
var articleApi = {},
    Article= require('../data/article.js'),
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


/**
 * 创建节点
 * @param articleJson
 * @param callback
 */
articleApi.insert=function(articleJson,callback){
    Article.insert(articleJson,function(err,doc){
        if(err) return callback(err);
        return callback(null,doc);
    })
}
/**
 * 更新文章
 * @param articleInfo
 * @param callback
 */
articleApi.update=function(articleInfo,aid,callback){
    Article.update(articleInfo,aid,function(err,istrue){
        if(err) return callback(err);
        return callback(null,istrue);
    })
}

articleApi.page = function(queryDom,sortDom,mp,callback){
    Article.page(queryDom,sortDom,mp, function(err, docs){
        if(err) return callback(err);
        return callback(null,docs);
    })
}

/**
 * 删除文章
 * @param query
 * @param callback
 */
articleApi.del=function(query,callback){
    Article.del(query,function(err){
        return callback(err);
    });
}

module.exports = articleApi;