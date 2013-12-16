/**
 * Created with JetBrains WebStorm.
 * User: 乔祝垒
 * Date: 13-12-6
 * Time: 下午3:32
 * To change this template use File | Settings | File Templates.
 */
var home = {},
    title = _rrest.config.webtitle,
    userApi = require('../models/userApi.js');

home.index = function(req, res){
    var userBasic=userApi.isLogin(req,res);
    if(userBasic||true){
       res.render('/upload.ejs');
    }
    return;
}


home.up = function(req, res){
    var userBasic=userApi.isLogin(req,res);
    if(userBasic||true){
        //res.render('/upload.ejs');
      // res.send('asd');
       _rrest.mod.stools.upload(req.file.image,'',_rrest.config.uploadFolder,function(err,sun){
          // res.send('asd');
       });
        return;
    }
    return;
}


module.exports = home;