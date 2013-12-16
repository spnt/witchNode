/**
 * Created with JetBrains WebStorm.
 * User: 乔祝垒
 * Date: 13-12-5
 * Time: 下午5:13
 * To change this template use File | Settings | File Templates.
 */
var home = {},
    userApi = require('../models/userApi.js'),
    nodeApi=require('../models/nodeApi.js');

home.index = function(req, res){
    var userBasic=userApi.isLogin(req,res);
    if(userBasic){
        var nodeid=req.query.id;
        nodeApi.get(nodeid,function(err,doc){
            if(err){
                res.send(err);
                return;
            }
            if(doc){
                res.render('editnode',{user_loginid:userBasic[0],user_loginname:userBasic[1],node:doc});
                return;
            }
            res.redirect('/node');

        })
    }
    return;
}


home.edit=function(req,res){
    if(req.method!="POST"){ res.redirect('/node'); return;}
    var nodeInfo={
        nodeName: req.body.nodename,
        nodeImg:req.body.imgurl1,
        nodeDes:req.body.content
    }
    nodeApi.edit(req.body.id,nodeInfo,function(err,istrue){
        if(err) {
            res.render(err);
            return;
        }
        res.redirect('/node');
        return;
    })
}
module.exports = home;