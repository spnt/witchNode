/**
 * Created with JetBrains WebStorm.
 * User: 乔祝垒
 * Date: 13-12-5
 * Time: 下午6:54
 * To change this template use File | Settings | File Templates.
 */
var home = {},
    userApi = require('../models/userApi.js');
home.index = function(req, res){
    var userBasic=userApi.isLogin(req,res);
    if(userBasic){
        res.render('addarticle',{user_loginid:userBasic[0],user_loginname:userBasic[1]});
    }
    return;
}

module.exports = home;