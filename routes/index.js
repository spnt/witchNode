
/*
 * 整站路由
 * 此方法接管所有非静态请求
 */
module.exports=function(app){
    app.all('*',function(req,res){
      try{
           var upath=req.path,
               urlpath=upath.split('/'),
               len=urlpath.length;
          if(upath.indexOf('.')>-1||urlpath.length>5){
              res.send('这是一个错误地址');
              return;
          }
           urlpath.shift();
           if(urlpath[len-1]==''){urlpath.pop();}
           if(upath=='/'){urlpath=new Array('index','index');}
           if(urlpath.length==1){ urlpath.push('index');}
           require('../controller/'+urlpath[0])[urlpath[1]](req, res);
        }
        catch(err){
            res.send(err);
        }
    });
}