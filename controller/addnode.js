/**
 * Created with JetBrains WebStorm.
 * User: 乔祝垒
 * Date: 13-12-5
 * Time: 下午4:07
 * To change this template use File | Settings | File Templates.
 */
var home = {},
    userApi = require('../models/userApi.js'),
    nodeApi=require('../models/nodeApi.js');

home.index = function(req, res){
    var userBasic=userApi.isLogin(req,res);
    if(userBasic||true){
        res.render('addnode',{user_loginid:userBasic[0],user_loginname:userBasic[1]});
    }
    return;
}

/**
 * 创建节点
 * @param req
 * @param res
 */
home.add=function(req,res){
    if(req.method!="POST"){ res.redirect('/'); return;}
    var nodeInfo={
        nodeName: req.body.nodename,
        pid:req.body.pid,
        nodeImg:req.body.imgurl1,
        nodeDes:req.body.content
    }
    nodeApi.insert(nodeInfo,function(err){
        if(err){res.render('/404');return;}
        res.redirect('/node');
    })
}

module.exports = home;