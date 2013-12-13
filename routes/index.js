
/*
 * 整站路由
 * 此方法接管所有非静态请求
 */
module.exports=function(app){
    app.all('*',function(req,res){
      try{
           var upath=req.path,
               urlpath=upath.split('/');
           urlpath.shift();
           if(urlpath[urlpath.length-1]==''){urlpath.pop();}
           if(upath=='/'){urlpath=new Array('index','index');}
           if(urlpath.length==1){ urlpath.push('index');}
           require('../controller/'+urlpath[0])[urlpath[1]](req, res);
        }
        catch(err){
            res.send(err);
        }
    });
}