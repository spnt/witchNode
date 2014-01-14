
/*
 * 整站路由
 * 此方法接管所有非静态请求
 */

var config=require('../config/config.js'),
    tools=require('../lib/tools.js');

module.exports=function(app){
    app.all('*',function(req,res){
      try{
          //console.log(req.headers.referer+"]")
           var upath=req.path,
               urlpath=upath.split('/'),
               len=0;

          if(upath.indexOf('.')>-1||urlpath.length>5){
               res.render('error',{'error':'这是一个错误地址'});
              return;
          }
           urlpath.shift();
          len=urlpath.length;
           if(urlpath[len-1]===''){urlpath.pop();}
           if(upath==='/'){urlpath=new Array('index','index');}
           if(urlpath.length===1){ urlpath.push('index');}
          if(urlpath[0]!='index'){//除了index页面，其他页面均需要权限判断//整站安全策略在此处理//需要规定某些页面可在url中添加标识
              var uid =req.cookies.id,
                  key=req.cookies.ckey;
              if(!uid||tools.md5(uid+config.keySalt)!=key) {
                  return  res.redirect('/');
              }
          }
          //console.log(urlpath.join('/'));
          require('../controller/'+urlpath[0])[urlpath[1]](req, res);
        }
        catch(err){
             res.render('error',{'error':err.toString()});
        }
    });
}