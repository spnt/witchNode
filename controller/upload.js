/**
 * Created with JetBrains WebStorm.
 * User: 乔祝垒
 * Date: 13-12-6
 * Time: 下午3:32
 * To change this template use File | Settings | File Templates.
 */
var home = {},
    fs=require('fs');

home.index = function(req, res){
    var userBasic=("1","1");
    res.render('upload',{user_loginid:userBasic[0],user_loginname:userBasic[1]});
}

home.up = function(req, res){
    //获得文件的临时目录
    var tem_path=req.files.thu.path;
    console.log(tem_path);
    //指定文件上传后的目录
    var target_path='./public/upload/'+req.files.thu.name;
    //移动文件
    fs.rename(tem_path,target_path,function(err){
       if(err){
           console.log(err.toString());
           return;
       }
        //删除临时文件夹文件
       fs.unlink(tem_path,function(){
           if (err) throw err;
           res.send('File uploaded to: ' + target_path + ' - ' + req.files.thu.size + ' bytes');
       })
    });

}


module.exports = home;