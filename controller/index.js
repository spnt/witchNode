var home = {};

home.index = function(req, res){
    //这是一个把模版内容写入redis缓存的例子
    /*redisCache.get('index',function(err,doc){
        if(err){
            res.send(err);
            return;
        }
        if(doc){//如果doc存在
            res.send(doc);
            return;
        }
        res.render('index',{cuo:'',err:''},function(err,html){
            if(err){
                res.send('模版读取错误');return;
            }
            redisCache.set('index',html,100);
            res.send(html);
            return;
        });
    })*/
    res.send('asd');
    return;
}

home.login=function(req,res){
    if(req.method !== 'POST') return res.redirect('/');
     var uname=req.body.username,
        psd=req.body.password;
    userApi.login(uname,psd,function(err,doc){
        if(err) {
            res.render('/index.ejs',{cuo:'密码错误',err:err});
            return;
        }
        res.cookie('username',doc.userName);
        res.cookie('id',doc._id.toString());
        res.cookie('ckey',tools.md5(doc._id.toString()+"yan"));
        res.redirect('/default');
    });
}


module.exports = home; 