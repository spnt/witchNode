var tools=new function(){_self=this,_self.randomChar=function(e){for(var t="0123456789qwertyioplkjhgfsazxcvbnm",r="",n=0;e>n;n++)r+=t.charAt(Math.ceil(1e8*Math.random())%t.length);return r},_self.getCharLen=function(e){return e.replace(/[^\x00-\xff]/g,"rr").length},_self.imgCenter=function(e,t){var r=new Image;r.src=e.src;var n=r.height;if(n>0){var a=(t-n)/2;$(e).css("margin-top",a)}},_self.subStr=function(e,t,r){var n=!1;if(_self.getCharLen(e)>t){r=r?r:"",t-=_self.getCharLen(r);for(var a=escape(e),i=a.length,s="",o=0,c=0;i>c;c++){if(!(t>o)){n=!0;break}var g=a.charAt(c);"%"==g?(g=a.charAt(c+1),"u"==g?(s+=a.substring(c,c+6),o+=2,c+=5):(s+=a.substring(c,c+3),o++,c+=2)):(s+=g,o++)}}return n?unescape(s)+r:e},_self.xss=function(e,t){return e=e.replace(/<(script|link|style|iframe)(.|\n)*\/\1>\s*/gi,""),1==t&&(e=e.replace(/<\/?(?!br|\/)[^>]*>/g,"")),e=e.replace(/[ | ]*\n/g,"\n")},_self.getPara=function(e){var t=new RegExp("(^|&)"+e+"=([^&]*)(&|$)"),r=window.location.search.substr(1).match(t);return null!=r?unescape(r[2]):""},_self.subTime=function(e,t){var r,n=new Date(e);return r=void 0==t?new Date:new Date(t),(r.getTime()-n.getTime())/1e3},_self.formatTime=function(e){var t=new Date,r={"M+":t.getMonth()+1,"d+":t.getDate(),"h+":t.getHours(),"m+":t.getMinutes(),"s+":t.getSeconds(),"q+":Math.floor((t.getMonth()+3)/3),S:t.getMilliseconds()};/(y+)/.test(e)&&(e=e.replace(RegExp.$1,(t.getFullYear()+"").substr(4-RegExp.$1.length)));for(var n in r)new RegExp("("+n+")").test(e)&&(e=e.replace(RegExp.$1,1==RegExp.$1.length?r[n]:("00"+r[n]).substr((""+r[n]).length)));return e}},pageCookie=new function(){var e=this;e.getCookie=function(e,t){for(var r="0",n=document.cookie,a=n.split(";"),i=0;i<a.length;i++)if($.trim(a[i].split("=")[0])==e)for(var s=a[i].replace(e+"=","").split("&"),o=0;o<s.length;o++)if($.trim(s[o].split("=")[0])==t){r=decodeURI(s[o].split("=")[1]);break}return r},e.setCookie=function(e,t,r,n,a){var i=e+"="+t+"="+r;i+=n?"; max-age="+24*n*60*60:"",i+=a?"; path="+a:"; path=/",document.cookie=i},e.csrf=function(){if(e.getCookie("","scrf")){var t=new Date((new Date).getTime()+1e3);document.cookie="csrf=387205c31b2; expires="+t.toGMTString()}}};