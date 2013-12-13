var tools = {},
	crypto = require('crypto'),
	fs = require('fs'),
    xss=require('xss'),
    path=require('path');

/*************************************************************
 * 校验相关的操作
 * @param str
 * @returns {boolean}
 */
tools.checkEmail = function(str){
	var reg = /^\w+((-|\.)\w+)*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
	return reg.test(str);
}

/**
 * 校验数据类型合法性
 * @type {{}}
 */
tools.check_data = {}
/**
 * 数据是否为整型
 * @param d  待校验值
 * @param defint  默认值
 * @returns {*}
 */
tools.check_data.check_int = function(d,defint){
	if(parseInt(d) != d) return defint;
	return d;
}
tools.check_data.check_len = function(d, exlen){
	if(d.length != exlen) return false;
	return true;
}
tools.check_data.check_maxlen = function(d, maxlen){
	if(d.length > maxlen) return false;
	return true;
}
/****************************************************************************
 * 工具相关的操作
 */

/**
 * Return md5 hash of the given string and optional encoding,
 * defaulting to hex.
 *
 *     utils.md5('wahoo');
 *     // => "e493298061761236c96b02ea6aa8a2ad"
 *
 * @param {String} str
 * @param {String} encoding
 * @return {String}
 * @api public
 */
tools.md5 = function(str, encoding){
  return crypto
    .createHash('md5')
    .update(str)
    .digest(encoding || 'hex');
}
/**
 * 获取字符串长度，区分中英文
 * @param str
 * @returns {Number}
 */
tools.getCharLen=function(str){
    return str.replace(/[^\x00-\xff]/g,"rr").length;
}
/**
 * 截取字符串
 * @param s
 * @param l   长度
 * @param st   补充的结尾字符
 * @returns {*}
 */
tools.subStr=function(s,l,st){
    var T = false;
    if (tools.getCharLen(s) > l) {
        st = st ? st : '';
        l -= tools.getCharLen(st);
        var S = escape(s);
        var M = S.length;
        var r = '';
        var C = 0;
        for (var i = 0; i < M; i++) {
            if (C < l) {
                var t = S.charAt(i);
                if (t == '%') {
                    t = S.charAt(i + 1);
                    if (t == 'u') {
                        r += S.substring(i, i + 6);
                        C += 2;
                        i += 5;
                    }
                    else {
                        r += S.substring(i, i + 3);
                        C++;
                        i += 2;
                    }
                }
                else {
                    r += t;
                    C++;
                }
            }
            else {
                T = true;
                break;
            }
        }
    }
    return T ? unescape(r) + st : s;
}
/**
 * 计算时间差，返回秒数
 * @param time1
 * @param time2
 * @returns {number}
 */
tools.subTime=function(time1,time2){
    var t1=new Date(time1),t2;
    if(time2==undefined){
        t2=new Date();//当前时间
    }
    else{
        t2=new Date(time2);
    }
    return (t2.getTime()-t1.getTime())/1000;//时间差的秒数
}
/**
 * 格式化时间
 * @param format
 * @returns {string}
 */
tools.fdate = function(format){
    var format = typeof format === 'undefined'?false:format.toLowerCase(),
        now = new Date(),
        time = now.getFullYear()+"-"+(now.getMonth()+1)+"-"+now.getDate();
    if(format === 'y-m-d h:m:s'){
        time += ' '+now.getHours()+":"+now.getMinutes()+":"+now.getSeconds();
    }
    return time;
};
/**
 * 过滤xss攻击代码
 * 属性参考：https://github.com/leizongmin/js-xss
 * @param str
 */
tools.xssFilter=function(str,movehtml){
    str=xss(str);
    if(movehtml){
        str= tools.htmlToString(str);
    }
    return str;
}
/**
 * html和sql字符过滤
 * @param text
 * @returns {XML}
 */
tools.htmlToString = function(text){
    text = text.replace(/&/g, "&amp;");
    text = text.replace(/"/g, "&quot;");
    text = text.replace(/</g, "&lt;");
    text = text.replace(/>/g, "&gt;");
    text = text.replace(/'/g, "&#146;");
    text=text.replace(/$/g,"");
    return  text;
}
/**
 * 转义json关键词
 * @param str
 * @returns {XML}
 */
tools.jsonFilter=function(str){
    str=str.replace(/\\/g,"\\\\");
    str=str.replace(/\b/g,"\\\b");
    str=str.replace(/\t/g,"\\\t");
    str=str.replace(/\n/g,"\\\n");
    str=str.replace(/\f/g,"\\\f");
    str=str.replace(/\r/g,"\\\r");
    str=str.replace(/"/g,"\"");
    return str;
}
/**
 * 清除文本中的html代码
 * @param str
 * @returns {XML}
 */
tools.removeHtml=function(str){
    str = str.replace(/<\/?[^>]*>/g,''); //去除HTML tag
    str.value = str.replace(/[ | ]*\n/g,'\n'); //去除行尾空白
    //str = str.replace(/\n[\s| | ]*\r/g,'\n'); //去除多余空行
    return str;
}

/*********************************************************
 * 文件相关操作的
 *****************************************************/
/**
 *
 * @param url
 * @param mode
 * @param cb
 */
tools.mkdirSync=function(url,mode,cb){
    var path = require("path"), arr = url.split("/");
    mode = mode || 0755;
    cb = cb || function(){};
    if(arr[0]==="."){//处理 ./aaa
        arr.shift();
    }
    if(arr[0] == ".."){//处理 ../ddd/d
        arr.splice(0,2,arr[0]+"/"+arr[1])
    }
    function inner(cur){
        if(!path.existsSync(cur)){//不存在就创建一个
            fs.mkdirSync(cur, mode)
        }
        if(arr.length){
            inner(cur + "/"+arr.shift());
        }else{
            cb();
        }
    }
    arr.length && inner(arr.shift());
}


/**********************************************************
 * 上传方法
 * @type {{}}
 */
tools.upload=function(img,savepath,uploadFolder,callback){
    var emsg={
            fileerr1:'文件保存失败',
            fileerr2:'文件格式错误',
            fileerr3:'伪造的jpg文件'
        };
    var imgpath = img.file.path;  //获得临时存放的图片地址
    var cb = function(err, suc){//封装了下回调，如果出错则把文件删除
        if(err){
            callback(err);
            if(imgpath) fs.unlink(imgpath, function(){})
        }
        else callback(null, suc)
    };
    path.exists(imgpath, function(isexist){//判断是否存在图片
        if(!isexist) return cb(emsg.fileerr1);//不存在，则报错
        fs.readFile(imgpath, function (err, data) {
            if(err) return cb(emsg.fileerr1);//不存在，则报错
            var fileHead = data.slice(0,3);//获取jpg图片头信息
            if(fileHead.toString('hex') !== 'ffd8ff') return cb(emsg.fileerr3);
            //如果头文件不等于ffd8ff，则不是有效的jpg文件

            var parray = imgpath.split('/'),
                imgname = parray[parray.length-1]+'.'+imgtype;//获得图片的名字
            var parray2 = imgpath.split(uploadFolder),
                relativePath = autoStatic + trueUpload + parray2[parray2.length-1]+'.'+imgtype;//存入数据库的相对路径
            //		console.log(catobj.file.path)
            //		console.log(imgname);
            //		console.log( baseDir+staticFolder+trueUpload+'/'+imgname);
            //		console.log(relativePath);
            fs.link(imgpath, baseDir+staticFolder+trueUpload+'/'+imgname,function(err){
                //使用fs.link将临时上传目录拷贝到真实目录
                if(err) return cb(emsg.fileerr1);
                //TODO:返回操作
            })//fs.link链接结束
        })
    });
}
module.exports = tools;


