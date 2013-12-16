/**
 * Created with JetBrains WebStorm.
 * User: 乔祝垒
 * Date: 13-12-6
 * Time: 上午9:37
 * To change this template use File | Settings | File Templates.
 */
var home = {},
    userApi = require('../models/userApi.js'),
    articleApi = require('../models/articleApi.js'),
    tools=require('../lib/tools.js');

home.index = function(req, res){
    var userBasic=userApi.isLogin(req,res);
    if(userBasic){
        res.render('/article.ejs',{user_loginid:userBasic[0],user_loginname:userBasic[1]});
    }
    return;
}

home.create=function(req,res){
    var userBasic=userApi.isLogin(req,res);
    if(userBasic){
       var articleInfo={
            nodeid:1,//parseInt(req.body.nodeid),//节点id
            source:req.body.source,//文章来源
            count:0,//点击量
            link:req.body.link,//连接地址
            state:parseInt(req.body.state),//文章状态
            title:tools.xssFilter(unescape(req.body.title)),//文章标题
            tag:req.body.tag,//文章标签
            timg:req.body.timg,//标题图片
            brief:req.body.brief,//文章描述
            content:tools.xssFilter(unescape(req.body.content)),//文章正文
            subby:parseInt(userBasic[0]),//发布人id
            subuser:userBasic[1],//发布人姓名
            subdate:new Date(),//发布时间
            comment:0
        };
        articleApi.insert(articleInfo,function(err,doc){
            if(err) {
                res.render('404');
                return;
            }
            res.send('{"status":"true","articleid":"'+doc._id+'","link":"'+doc.link+'"}');
            return;
        });
    }
    return;
}


home.update=function(req,res){
    var userBasic=userApi.isLogin(req,res);
    if(userBasic){
        var articleInfo={
            nodeid:1,//parseInt(req.body.nodeid),//节点id
            source:req.body.source,//文章来源
            link:req.body.link,//连接地址
            state:parseInt(req.body.state),//文章状态
            title:tools.xssFilter(unescape(req.body.title)),//文章标题
            tag:req.body.tag,//文章标签
            timg:req.body.timg,//标题图片
            brief:req.body.brief,//文章描述
            content:tools.xssFilter(unescape(req.body.content))//文章正文
        };
        if(articleInfo.brief==''){
            articleInfo.brief=tools.subStr(tools.removeHtml(articleInfo.content),30,'');
        }
        var aid=req.body.articleid;
        articleApi.update(articleInfo,aid,function(err,istrue){
            if(err) {
                res.render('404');
                return;
            }
            res.send('{"status":"true"}');
            return;
        });
    }
    return;
}



module.exports = home;