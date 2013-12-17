/**
 * Created with JetBrains WebStorm.
 * User: 乔祝垒
 * Date: 13-12-5
 * Time: 下午2:02
 * To change this template use File | Settings | File Templates.
 */
var home = {},
    md5 =require('../lib/tools.js').md5;

home.getmenu=function(req,res){
    var menu=req.body.menu;
    if(menu=='index'){//获取主菜单
        res.render('leftmenu/index');
    }
    else{//获取子菜单
        res.render('leftmenu/'+menu);
    }
}

module.exports = home;