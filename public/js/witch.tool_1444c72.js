var tools=new function(){_self=this,_self.randomChar=function(e){for(var t="0123456789qwertyioplkjhgfsazxcvbnm",n="",r=0;e>r;r++)n+=t.charAt(Math.ceil(1e8*Math.random())%t.length);return n},_self.getCharLen=function(e){return e.replace(/[^\x00-\xff]/g,"rr").length},_self.imgCenter=function(e,t){var n=new Image;n.src=e.src;var r=n.height;if(r>0){var a=(t-r)/2;$(e).css("margin-top",a)}},_self.subStr=function(e,t,n){var r=!1;if(_self.getCharLen(e)>t){n=n?n:"",t-=_self.getCharLen(n);for(var a=escape(e),o=a.length,i="",s=0,c=0;o>c;c++){if(!(t>s)){r=!0;break}var u=a.charAt(c);"%"==u?(u=a.charAt(c+1),"u"==u?(i+=a.substring(c,c+6),s+=2,c+=5):(i+=a.substring(c,c+3),s++,c+=2)):(i+=u,s++)}}return r?unescape(i)+n:e},_self.xss=function(e,t){return e=e.replace(/<(script|link|style|iframe)(.|\n)*\/\1>\s*/gi,""),1==t&&(e=e.replace(/<\/?(?!br|\/)[^>]*>/g,"")),e=e.replace(/[ | ]*\n/g,"\n")},_self.getPara=function(e){var t=new RegExp("(^|&)"+e+"=([^&]*)(&|$)"),n=window.location.search.substr(1).match(t);return null!=n?unescape(n[2]):""},_self.subTime=function(e,t){var n,r=new Date(e);return n=void 0==t?new Date:new Date(t),(n.getTime()-r.getTime())/1e3},_self.formatTime=function(e){var t=new Date,n={"M+":t.getMonth()+1,"d+":t.getDate(),"h+":t.getHours(),"m+":t.getMinutes(),"s+":t.getSeconds(),"q+":Math.floor((t.getMonth()+3)/3),S:t.getMilliseconds()};/(y+)/.test(e)&&(e=e.replace(RegExp.$1,(t.getFullYear()+"").substr(4-RegExp.$1.length)));for(var r in n)new RegExp("("+r+")").test(e)&&(e=e.replace(RegExp.$1,1==RegExp.$1.length?n[r]:("00"+n[r]).substr((""+n[r]).length)));return e}},csrfTimeout,pageCookie=new function(){var e=this;e.getCookie=function(e){for(var t,n="0",r=document.cookie,a=r.split(";"),o=0,i=a.length;i>o;o++)t=a[o].split("="),$.trim(t[0])==e&&(n=decodeURI(t[1]));return n},e.setCookie=function(e,t,n,r){var a=e+"="+t;a+=n?"; max-age="+24*d*60*60:"",a+=r?"; path="+r:"; path=/",document.cookie=a},e.csrf=function(){if(clearTimeout(csrfTimeout),"387205c31b2"!=e.getCookie("csrf")){var t=new Date((new Date).getTime()+1e3);document.cookie="csrf=387205c31b2; expires="+t.toGMTString(),csrfTimeout=setTimeout(function(){var e=new Date((new Date).getTime()-2e3);document.cookie="csrf=asd; expires="+e.toGMTString()},1e3)}}};$(document).ajaxStart().ajaxComplete().ajaxSend().ajaxSuccess();var ajaxGlobal=function(){var e=this;e.start=function(){},e.complete=function(){},e.send=function(){},e.success=function(){}};