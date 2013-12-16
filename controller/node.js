/**
 * Created with JetBrains WebStorm.
 * User: 乔祝垒
 * Date: 13-12-5
 * Time: 下午2:40
 * To change this template use File | Settings | File Templates.
 */
var home = {},
    userApi = require('../models/userApi.js'),
    nodeApi=require('../models/nodeApi.js');
home.index = function(req, res){
    var userBasic=userApi.isLogin(req,res);
    if(userBasic){
        res.render('node',{user_loginid:userBasic[0],user_loginname:userBasic[1]});
    }
    return;
}

home.page=function(req,res){
    var pid=req.query.pid;
    nodeApi.page(pid,function(err,docs){
        if(err) {
            res.render('404');
            return;
        }
        res.render('ajax/node',{nodes:docs});
        return;
    })
}
module.exports = home;