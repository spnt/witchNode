
/*
 * 整站路由
 * 此方法接管所有非静态请求
 * 获取到url后把路径拆分，如
 * /:[index,index]
 * /test:[test,index]
 * /article/add:[article,add]
 * /article/get/articleid:[article,get,id]
 * 第一个参数为模块，第二个参数为模块中的方法，其他的是自定义
 */
module.exports=function(app){
    app.all('*',function(req,res){
      /* try{*/
           var upath=req.path,
               urlpath=upath.split('/');
           urlpath.shift();
        if(urlpath[urlpath.length-1]==''){
            urlpath.pop();
        }
       // console.log('['+req.path+']');
       // console.log('['+urlpath.join('/')+']');
           if(upath=='/'){
               urlpath=new Array('index','index');
           }
           if(urlpath.length==1){
               urlpath.push('index');
           }
          // console.log('['+urlpath.join('/')+']');
            require('../controller/'+urlpath[0])[urlpath[1]](req, res);
       /* }
        catch(err){
            //restlog.info(req.path.join('/')+'; '+err)
            res.send('cuowu');
        }*/
    });

}