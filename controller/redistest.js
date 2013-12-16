/**
 * Created with JetBrains WebStorm.
 * User: 乔祝垒
 * Date: 13-12-8
 * Time: 下午2:43
 * To change this template use File | Settings | File Templates.
 */
var home = {},
    redisCache=require('../modules/redisApi.js'),
    userApi = require('../models/userApi.js'),
    articleApi = require('../models/articleApi.js'),
    tools=require('../modules/tools.js');



home.index = function(req, res){

    var redisInfo={
        _id:"54asdasd46",
        title:"12565456466",
        content:'<span class="">读完这本书之后一个总体感觉就是朴灵背后花了很多公司去拜读Node源代码来了解Node中核心模块的工作原理。因此，本书前半部分是作为任何一个使用Node的开发者都应该仔细品读的。后半部分看了下目录本来想跳过了，结果到了玩转进程部分又给了很多实战的经验，非常不错。我不想说太多称赞的话，但这确实是一本不错的书，值得大家拜读。 </span><a class="pl" href="http://book.douban.com/review/6408798/">(<span class="">1回应</span>)</a> <br><br><div class="pl clearfix">         <span class="fleft">             <span class="">2013-11-15 11:22</span> &nbsp; &nbsp;</span></div>'

    }
    var key=tools.fdate('y-m-d h:m:s').toString();
    redisCache.set(key,JSON.stringify(redisInfo),600);
    redisCache.get(key,function(err,doc){
        if(err){
            res.send(err);return;
        }
        res.send(doc);
    })
    return;
}

home.mongodb=function(req,res){//mongodb的测试
        var articleInfo={
            nodeid:1,//parseInt(req.postparam.nodeid),//节点id
            source:"来源",//文章来源
            count:0,//点击量
            link:"连接",//连接地址
            state:1,//文章状态
            title:"文章标题",//文章标题
            tag:"文章标签",//文章标签
            timg:"标题图片",//标题图片
            brief:"文章描述",//文章描述
            content:"文章正文",//文章正文
            subby:1,//发布人id
            subuser:'root',//发布人姓名
            subdate:new Date(),//发布时间
            comment:0
        };
        articleApi.insert(articleInfo,function(err,doc){
            if(err) {
                res.render('false');
                return;
            }
            articleApi.del({_id:doc._id},function(err){
                res.send('true');
                return;
            });

        });
    return;
}

module.exports = home;