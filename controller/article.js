/**
 * Created with JetBrains WebStorm.
 * User: 乔祝垒
 * Date: 13-12-5
 * Time: 下午6:37
 * To change this template use File | Settings | File Templates.
 */
var home = {},
    userApi = require('../models/userApi.js'),
    articleApi = require('../models/articleApi.js');
home.index = function(req, res){
    var userBasic=userApi.isLogin(req,res);
    if(userBasic){
        var queryDom={
           nodeid:1
        };
        var sortDom={
            _id:-1
        }
        articleApi.page(queryDom,sortDom,30,function(err,docs){
            if(err) {
                res.render('404');
                return;
            }
            res.render('article',{user_loginid:userBasic[0],user_loginname:userBasic[1],articles:docs});
            return;
        })
    }
    return;
}

module.exports = home;