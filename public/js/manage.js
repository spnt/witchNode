var lodding='<img src="/manage/img/lodding.gif" style="margin-top:10px;" />';
/*左侧菜单折叠函数*/
function disBlock(obj){
		alert("asdasd");

		/*if($(obj).hasClass("menutree_block")){
			$(obj).addClass("menutree_none").removeClass("menutree_block");
			$(obj+" > ul").show();
		}
		else{
			$(obj).addClass("menutree_block").removeClass("menutree_none");
			$(obj+" > ul").hide();
		}*/
	 }

	 var manageNode = new function() {//节点管理相关操作
	     var node = this;
	     var dlg = null;
	     node.deleNode = function(args) {//删除节点
				/*$.dialog.confirm('你确定要删除该节点？', function(){
					$.dialog.tips('执行确定操作');
				}, function(){
					$.dialog.tips('执行取消操作');
				});

	         var dlg = new J.dialog({ id: 'delNode', title: '删除节点', width: 300, height: 200, cover: true, page: '/manage/pages/delnode.aspx?id=' + args });
	         dlg.ShowDialog();*/
	     }
	     node.Cancel = function() {
	         dlg.cancel();
	     }
	     node.UploadImg = function(obj) {//上传图片
		     var b = $.dialog({
			   id:"uploadNode",
			   title:"上传",
			   content:"url:/manage/pages/app/upload.aspx?id=" + obj
         	  });
	     }
	     node.Static = function(nid) {//节点生成静态
	         $.ajax({
	             type: "POST",
	             url: "/manage/pages/ajax/template.aspx",
	             data: "op=static&nid=" + nid,
	             success: function(msg) {
	                 if (msg == "true") {
						lhgdialog.tips("生成成功",1.5,"32x32/i.png");
					  }
					  else{
						lhgdialog.alert("发布失败");
					  }
	             }
	         });
	     }
	     node.StaticIndex = function(){//首页生成静态
	         $.ajax({
	             type: "POST",
	             url: "/manage/pages/ajax/template.aspx",
	             data: "op=staticpage&furl=/index.htm&surl=/file/template/1/index.htm",
	             dataType:'json',
	             success: function(msg) {
	                 if (msg.status == "true") {
	                     lhgdialog.tips("生成成功,系统将自动跳转到首页，请稍后",1.5,"32x32/i.png").time(1.5,setTimeout(function(){document.location.href="/";},1500));
	                 }
	             }
	         });
	     }
 }
var manageArticle = new function() {//文章后台操作
    var article = this;
    article.deleArticle = function(aid) {//删除文章
        if (aid == "0") {
            aid = ManageTool.GetAllId('list', 'checkall'); ;
        }
        if (aid == "0" || aid == "") { return; }
		var b=lhgdialog.confirm("您确定要删除文章吗？删除将不可恢复",function(){
				$.ajax({
					type:"post",
					url:"/manage/pages/ajax/article.aspx",
					data:"op=delete&id="+aid,
					success:function(msg){
						if(msg=="True"){
							lhgdialog.tips("执行成功",1.5,"32x32/i.png");
						    var ids=aid.toString().split(",");
							for(var i=0;i<ids.length;i++){
								$("#article_"+ids[i]).remove();
							}
						}
						else{
							lhgdialog.alert("操作失败，请重试");
						}
					}
				});
			},function(){
			}
		);
    }
    article.UploadFile = function(obj) {//上传
	   var b = $.dialog({
			   id:"uploadNode",
			   title:"上传",
			   content:"url:/manage/pages/app/upload.aspx?id=" + obj
         	  });
    }
    article.CloseArticle = function(id, isclosed) {//关闭,0为批量操作
        if (id == "0") {
            id = ManageTool.GetAllId('list', 'checkall'); ;
        }
        if (id == "0" || id == "") { return; }
        $.ajax({
            type: "post",
            url: "/manage/pages/ajax/article.aspx",
            data: "op=close&id=" + id + "&closed=" + (isclosed == "true" ? -9 : 1),
            dataType: "json",
            success: function(msg) {
                if (msg.status == "true") {
                    var ids = id.toString().split(',');
                    for (var i = 0; i < ids.length; i++) {
                        $("#article_" + ids[i]).remove();
                    }
                }
            }
        });
    }
    article.Create = function() {//创建文章
	    var b1=$.dialog({title:'正在执行,请耐心等待'});
        var content = editor.html();
        $.ajax({
            type: "POST",
            dataType: 'json',
            url: "/articleajax/create",
            data: 'nodeid=' + $("#articlenode").val() + '&title=' + escape($("#title").val()) + '&brief=' + $("#Summary").val() + '&content=' +escape(content) + '&source=' + $("#source").val() + '&timg=' + $("#imgurl").val() + '&link=' + $("#linkurl").val() + '&tag=' + $("#tag").val() + '&state=' + $("#state").val()+"&subdate="+$("#adddate").val(),
            success: function(msg) {
				   b1.close();
                if (msg.status == "true") {
                    $("#articleid").val(msg.articleid);
                    $("#linkurl").val(msg.link);
                     lhgdialog.tips("创建成功", 1.5,"32X32/i.png");
                }
                else {
                    lhgdialog.alert("操作失败，请重试");
                }
            }
        });
    }
    article.Update = function(aid) {//更新文章
	    var b1=$.dialog({title:'正在执行,请耐心等待'});
        var cot = editor.html();
        var articleid = aid;
        $.ajax({
            type: "POST",
            url: "/articleajax/update",
            dataType: 'json',
            data: 'articleid=' + articleid + '&nodeid=' + $("#articlenode").val() + '&title=' + escape($("#title").val()) + '&brief=' + escape($("#Summary").val()) + '&content=' + escape(cot) + '&source=' + $("#source").val() + '&timg=' + $("#imgurl").val() + '&link=' + $("#linkurl").val() + '&state=' + $("#state").val() + '&tag=' + $("#tag").val()  + '&subdate='+$("#adddate").val(),
            success: function(msg) {
				b1.close();
                if (msg.status == "true") {
                       lhgdialog.tips("更新成功", 1.5,"32X32/i.png");
                }
                else {
                   lhgdialog.alert(msg.status);
                }
            }
        });
    }
    article.Band = function(aid) {///编辑时绑定
        $.ajax({
            type: "POST",
            url: "/manage/pages/ajax/article.aspx",
            data: "op=get&id=" + aid,
			dataType:'json',
            success: function(msg) {
				if(msg.Status==undefined){
                    editor.html(msg.Content);
                    $("#title").val(msg.Title);
                    $("#linkurl").val(msg.Link);
                    $("#source").val(msg.Source);
                    $("#adddate").val(msg.SubDate);
                    $("#imgurl").val(msg.tImg);
                    $("#Summary").val(msg.Brief);
                    $("#tag").val(msg.Tag);
                    $("#state").val(msg.State);
				}
                else {
                       lhgdialog.alert(msg.Error);
               }
            }
        });
    }
    article.Passed = function(id, ispass) {//审核已选
        if (id == "0") {
            id = ManageTool.GetAllId('list', 'checkall'); ;
        }
        if (id == "0" || id == "") { return; }
        $.ajax({
            type: "POST",
            url: "/manage/pages/ajax/article.aspx",
            dataType: "json",
            data: "op=passed&id=" + id,
            success: function(msg) {
                if (msg.status == "true") {
                    var ids = id.split(',');
                    for (var i = 0; i < ids.length; i++) {
                        $(".articlepass" + ids[i]).remove();
                    }
                }
            }
        });
    }
    article.RecoArticle = function(id, level) {//文章审核，id：文章id，level：推荐等级
        if (id == "0") {
            id = ManageTool.GetAllId('list', 'checkall');
        }
        if (id == "0" || id == "") { return; }
        $.ajax({
            type: "post",
            url: "/manage/pages/ajax/article.aspx",
            dataType: "json",
            data: "op=reco&id=" + id + "&level=" + level,
            success: function(msg) {
                if (msg.status == "true") {
                         lhgdialog.tips("推荐成功", 1.5,"32X32/i.png");
                }
                else {
                       lhgdialog.alert(msg.status);
                }
            }
        });
    }
    article.Page = function(cp, isclear) {
        var genre = document.location.href.indexOf("/manage/pages/article.aspx") > -1 ? 'admin' : 'recycle';
        var fcp = 0;
        if (isclear) {
            fcp = 1;
        }
        else if (cp == 0) {
            fcp = parseInt($("#articlecp").html()) + 1;
        }
        else {
            fcp = cp;
        }
        if (fcp > 10) {
            return;
        }
        var id = $("#articlenode").val();
        var userid = $("#userlist").val();
        $.ajax({
            type: "post",
            url: "/manage/pages/ajax/article.aspx",
            data: "op=page&nodeid=" + id + "&cp=" + fcp + "&mp=20&kw=" + escape($.trim($("#articlekw").val())) + "&genre=" + genre + "&author=" + userid,
            success: function(msg) {
                if (isclear) {
                    $("#list>li").remove();
                }
                if (msg== "") { return; }
                $("#articlecp").html(fcp);
                $("#list").append(msg);
                AutoPage.scroolBind('article');
            }
        });
    }
}
/*文章评论*/
var manageComment = new function() {
    var comment = this;
    comment.ManagePage = function(aid, obj) {//获取评论列表
        if ($("#comment_" + aid).length > 0) {
            $("#comment_" + aid).remove();
            return;
        }
        $.ajax({
            type: "POST",
            url: "/manage/pages/ajax/article.aspx",
            data: "op=pagecomment&aid=" + aid,
            success: function(msg) {
                $("#" + obj).after(msg);
            }
        });
    }
    comment.Create = function(content, listid, url, subid, mp, aid) {//正文id，list id，url跳转,按钮id,mp
        $("#" + subid).attr("disable", "disable");
        $.ajax({
            type: "POST",
            url: "/manage/pages/ajax/comment.aspx",
            data: "op=create&content=" + escape($("#" + content).val()) + "&aid=" + aid + "&closed=false&pass=true",
            success: function(msg) {
                if (msg != "false") {

                    if (url != "") {
                        document.location.href = url;
                    }
                    comment.Page(1, mp, aid, listid);
                    $("#" + content).val("");
                }
                else {

                }
                $("#" + subid).attr("disable", "");
            }
        });
    }
    comment.Pass = function(id, state, ostate, aid) {//审核评论
        $.ajax({
            type: "POST",
            url: "/manage/pages/ajax/article.aspx",
            dataType: "json",
            data: "op=passcomment&id=" + id + "&state=" + state + "&ostate=" + ostate + "&aid=" + aid,
            success: function(msg) {
                if (msg.status == "true") {
                    if ($("#comment_" + aid).length > 0) {
                        $("#comment_" + aid).remove();
                    }
                    $.ajax({
                        type: "POST",
                        url: "/manage/pages/ajax/article.aspx",
                        data: "op=pagecomment&aid=" + aid,
                        success: function(msg) {
                            $("#article_" + aid).after(msg);
                        }
                    });
                }

                else {
                    lhgdialog.alert("失败，请检查网络并重试");
                }
            }
        });
    }
    comment.del = function(id, aid) {
		var b=lhgdialog.confirm("您确定要删除该评论吗？",function(){
			 $.ajax({
                type: "post",
                url: "/manage/pages/ajax/article.aspx",
                data: "op=delcomment&id=" + id + "&aid=" + aid,
                dataType: 'json',
                success: function(msg) {
                    if (msg.status == "true") {
                        $("#comment_" + id).remove();
                        $("#comcontent_" + id).remove();
                    }
                }
            });
		},function(){

		});
    }
    comment.mask = function(ip) {
        $.ajax({
            type: "post",
            url: "/manage/pages/ajax/article.aspx",
            data: "op=maskcomment&ip=" + ip,
            dataType: 'json',
            success: function(msg) {
                if (msg.status == "true") {
                   lhgdialog.tips("屏蔽成功", 1.5,"32X32/i.png");
                }
                else {
                    lhgdialog.alert("操作失败");
                }
            }
        });
    }
}

var manageModule = new function() {
    var module = this;
    module.Dele = function(moduleid) {//删除模块
		if(moduleid==0){
			moduleid=ManageTool.GetAllId('list', 'checkall');
		}
		var b=lhgdialog.confirm("你确定要删除该模块吗？",function(){
		   $.ajax({
				type:"post",
				url:"/manage/pages/ajax/module.aspx",
				data:"op=delete&mid="+moduleid,
				dataType:"json",
				success:function(msg){
					if(msg.status=="true"){
						var ids=moduleid.split(',');
						for(var i=0;i<ids.length;i++){
							$("#module_"+ids[i]).remove();
						}
						lhgdialog.tips("删除成功",1.5,"32x32/i.png");
					}
					else{
						lhgdialog.alert(msg.status);
					}
				}
		   });
		},function(){
		
		});
    }
    module.Page = function(cp, mp) {
        var fcp = 1;
        if (cp == 0) {
            fcp = parseInt($("#fcp").html()) + 1;
        }
        else {
            fcp = cp;
            $("#mainright").scrollTop(0);
        }
        if (fcp == 11) { return; }
        $.ajax({
            type: "post",
            url: "/manage/pages/ajax/module.aspx",
            data: "op=page&nid=1&cp=" + fcp + "&mp=20&kw=" + escape($.trim($("#modulekw").val())) + "&order=" + $("#moduleorder").val(),
            success: function(msg) {
                $("#fcp").html(fcp);
                if (cp == 1) {
                    $("#list>li").remove();
                }
                $("#list>ul").remove();
                $("#list").append(msg);
                AutoPage.scroolBind('module');
            }
        });
    }
    module.Create = function() {//创建模块
        $.ajax({
            type: "post",
            url: "/manage/pages/ajax/module.aspx",
            data: "op=create",
            dataType: "json",
            success: function(msg) {//{status,moduleid}
                if (msg.status == "true") {
                    document.location.href = "/manage/pages/editmodule.aspx?id=" + msg.moduleid;
                }
                else {
                    lhgdialog.alert("系统出错，请检查并重试");
                }
            }
        });
    }
    module.StatusDefault = function(mconid, type, mid) {//更改模块版本操作
        $.ajax({
            type: "post",
            url: "/manage/pages/ajax/module.aspx",
            data: "op=statusmcon&type=" + type + "&mcid=" + mconid,
            dataType: 'json',
            success: function(msg) {
              if (msg.status == "true") {
                   $.ajax({
                      type: "post",
                     url: "/manage/pages/ajax/module.aspx",
                     data: "op=pagecon&mid=" + mid,
                       success: function(msg) {
                           if ($("#modulecon_" + mid).length == 1) {
                              $("#modulecon_" + mid).remove();
                           }
                      $("#module_" + mid).after(msg);
                      }
                  });
              }
              else {
                lhgdialog.alert("更改失败！")
              }
            }
        });
    }
}
/*模板操作*/
var manageTemplate=new function(){
    var template=this;
    template.Create=function(){//创建模版
        $.ajax({
            type:"post",
            url:"/manage/pages/ajax/template.aspx",
            data:"op=create",
            dataType:"json",
            success:function(msg){
                if(msg.status=="true"){
                    document.location.href="/manage/pages/edittemplate.aspx?id="+msg.templateid;
                }
                else{
                   lhgdialog.alert("创建失败，请重试。");
                }
            }
        });
    }
    template.Delete=function(){//删除文件
		var files="";
		$("input:checked").each(function(){
			files+=","+$(this).val();
		});
		if(files==""){
			return;
		}
		$.dialog.confirm('你确定要删除这个文件吗？删除将不可恢复', function(){
			var bb=$.dialog.tips('正在生成，可能需要耗费较多时间，请稍后',600,'loading.gif');
			$.ajax({
				type:"post",
				url:"/manage/pages/ajax/template.aspx",
				data:"op=delete&files="+files+"&templateid="+getPart("templateid"),
				success:function(msg){
					if(msg=="true"){
						$.dialog.tips('生成完毕',1,'success.gif',function(){document.location.reload();});
					}
					else{
						bb.close();
						$.dialog.alert('生成失败！',function(){});
					}
				}
			});
			$.dialog.tips('执行确定操作');
		}, function(){
			
		});
    }
	template.EditTemplateFile=function(file,templateid){//编辑模板文件
		var b=$.dialog({
			id:"edittemplatefile",
			title:"编辑模板",
			content:"url:/manage/pages/app/edittemplatefile.aspx?path="+escape(file)+"&templateid="+templateid,
			width:800,
			height:600
		});
	}
	template.CreateTemplateFile=function(){//生成aspx下文件
		var files="";
		$("input:checked").each(function(){
			files+=","+$(this).val();
		});
		if(files==""){
			return;
		}
		var bb=$.dialog.tips('正在生成，可能需要耗费较多时间，请稍后',600,'loading.gif');
		var templateid=getPart("templateid");
		$.ajax({
			type:"post",
			url:"/manage/pages/ajax/template.aspx",
			data:"op=createfile&files="+files+"&templateid="+templateid,
			success:function(msg){
				if(msg=="true"){
					$.dialog.tips('生成完毕',1,'success.gif',function(){});
				}
				else{
					bb.close();
					$.dialog.alert('生成失败！',function(){});
				}
			}
		});
	}
	template.SelectAll=function(){
		if($("#sela").attr("checked")){
			$("input:checkbox").attr("checked",true);
		}
		else{
			$("input:checkbox").removeAttr("checked");
		}
	}

}

/*留言板操作*/
var manageGuestBook=new function(){
	var guestBook=this;
		guestBook.Addguestbook=function(gid,op){//添加/编辑--回复
	    if(gid==0){
			var b=$.dialog({
				id:"addguestbook0",
				title:"添加留言",
				content:"url:/manage/pages/app/addguestbook.aspx",
				width:500,
				height:300
			});
		}
		else{
			var b=$.dialog({
				id:"addguestbook"+gid,
				title:"修改回复",
				content:"url:/manage/pages/app/addguestbook.aspx?gid="+gid+"&op="+op,
				width:500,
				height:300
			}); 
		}
	}
	guestBook.PageGuestbook=function(cp,mp){//查看留言
	    var gcp=1;
	    if(cp==0){
	        gcp=parseInt($("#gcp").html())+1;
	    }
	    else{
	        gcp=cp; 
	        $("#mainright").scrollTop(0);
	    }
	    var count = $("#guestbookcount").val();
        if(gcp>count && $("#lastgb").length==1){return;}
	    $.ajax({
			type:"post",
			url:"/manage/pages/ajax/guestbook.aspx",
			data:"op=page&cp="+gcp+"&mp=20&gid=0&kw="+escape($.trim($('#guestbookkw').val()))+"&status="+$("#statusgb").val(),
			success:function(msg){
			    $("#gcp").html(gcp);
			    $("#guestbookcount").remove();
			    if(cp==1){
			        $("#list>li").remove();
			    }
			    $("#list>ul").remove();
                $("#list").append(msg);
			    $("#ctl00_ContentPlaceHolder1_gcount").html($("#guestbookcount").val());
                AutoPage.scroolBind('guestbook');
			}
		});
	}
    guestBook.PageReply=function(gid,gbname,isadd){//查看回复
		if(isadd){//是添加回复后执行的获取操作
			var api = frameElement.api, W = api.opener;//获取弹窗对象
		}
		else if($("#list_"+gid).length==1){
			$("#list_"+gid).remove();
			return;
		}
	    $.ajax({
			type:"post",
			url:"/manage/pages/ajax/guestbook.aspx",
			data:"op=pagereply&gid="+gid+"&kw=&status=0&mp=500",
			success:function(msg){
				if(isadd){
					W.$("#list_"+gid).remove();
					W.$("#"+gbname).after(msg);
					api.close();
				}
			    else if($("#list_"+gid).length==1){
			        $("#list_"+gid).remove();
			    }
			    else{
			        $("#"+gbname).after(msg);
			    }
			}
		});
	}
	guestBook.Passed=function(id,state){//审核留言
		if(id=="0"){
			id=ManageTool.GetAllId('list','checkall');
		}
		if(id=="0"||id==""){return;}
		$.ajax({
			type:"post",
			url:"/manage/pages/ajax/guestbook.aspx",
			data:"op=status&gids="+id+"&status="+state,
			dataType:"json",
			success:function(msg){
				if(msg.status=="true"){
					var ids=id.split(',');
					if(state==1){//审核
						for(var i=0;i<ids.length;i++){
							$("#guest_"+ids[i]+">span").remove();
							$("#guestpass_"+ids[i]+"").html("取消审核").attr("href","javascript:manageGuestBook.Passed('"+ids[i]+"',0);");
						}
					}
					else{
						for(var i=0;i<ids.length;i++){
							$("#guest_"+ids[i]+">a").after('<span style="color:red;">[未审核]</span>');
							$("#guestpass_"+ids[i]+"").html("审核").attr("href","javascript:manageGuestBook.Passed('"+ids[i]+"',1);");
						}
					}
				}
			}
		});
	}
	guestBook.Del=function(id){//删除留言
		if(id=="0"){
			id=ManageTool.GetAllId('list','checkall').replace(",0","");
		}
		if(id=="0"||id==""){return;}
		var b=$.dialog.confirm("您确定要删除该留言吗",function(){
			$.ajax({
				type:"post",
				url:"/manage/pages/ajax/guestbook.aspx",
				data:"op=delete&id="+id,
				success:function(msg){
					if(msg=="true"){
						id=id+",0";
						var ids=id.split(',');
						for(var i=0;i<ids.length;i++){
							$("#guest_"+ids[i]).remove();
							$("#list_"+ids[i]).remove();
						}
						lhgdialog.tips("删除成功");
					}
					else{
						lhgdialog.alert("删除失败，请重试");
					}
				}
			})
		},function(){
		
		});
	}
	guestBook.DelReply=function(id){//删除回复
		if(id=="0"||id==""){return;}
		var dlg=$.dialog.confirm('您确定要删除此回复吗？',function(){
			$.ajax({
				type:"post",
				url:"/manage/pages/ajax/guestbook.aspx",
				data:"op=delete&id="+id,
				success:function(msg){
					$("#guest_"+id).remove();
					$("#replyguest_"+id).remove();
					$.dialog.tips("删除成功");
				}
			})
		});
	}

}
/*投票管理*/
var manageVote=new function(){
    var vote=this;
    vote.Page=function(cp,mp){//打印投票列表
        var vcp=1;
        if(cp==0){
            vcp=parseInt($("#vcp").html())+1;
        }
        else{
            vcp=cp;
            $("#mainright").scrollTop(0);
        }
        var count=$("#votecount").val();
        if(vcp>count && $("#lastvote").length==1){return;}
        $.ajax({
            type:"post",
            url:"/manage/pages/ajax/vote.aspx",
            data:"op=page&cp="+vcp+"&mp=20&kw="+escape($.trim($('#votekw').val()))+"&uid=0&nid=0&order=",
            success:function(msg){
                $("#vcp").html(vcp);
                $("#votecount").remove();
                 if(cp==1){
			        $("#list>li").remove();
			    }
			    $("#list>ul").remove();
                $("#list").append(msg);
			    //alert($("#ctl00_ContentPlaceHolder1_gcount").length+"#####"+$("#guestbookcount").val())
			    $("#ctl00_ContentPlaceHolder1_vcount").html($("#guestbookcount").val());
                AutoPage.scroolBind('vote');
            }
        }); 
    }
    vote.PageOption=function(vid,isupdate){//打印选项列表1
		 if($("#list_"+vid).length==1&&!isupdate){//选项列表存在并且不需要刷新
			$("#list_"+vid).remove();
			return;
		 }
         $.ajax({
            type:"post",
            url:"/manage/pages/ajax/vote.aspx",
            data:"op=pageoption&cp=1&mp=50&id="+vid,
            success:function(msg){
				if(isupdate){//需要刷新 
					var api = frameElement.api, W = api.opener;
					W.$("#list_"+vid).remove();
					W.$("#vote_"+vid).after(msg);
					api.close();
				}
                if($("#list_"+vid).length==1){
			        $("#list_"+vid).remove();
			    }
			    else{
			        $("#vote_"+vid).after(msg);
			    }
            }
        }); 
    }
    vote.PassedOption=function(id,closed,vid,vvoid){//修改投票选项状态
         var resoption="";
         $.ajax({
            type:"post",
            url:"/manage/pages/ajax/vote.aspx",
            data:"op=statusoption&id="+id+"&closed="+closed,
            dataType:'json',
            success:function(msg){
                if(msg.status=="true"){
					if(closed=="true"){
						$('#voteoption_'+id+'>a').after('<span id="voptionstatus_'+id+'" style="color:red;">[已关闭]</span>');
						$("#voptionsop_"+id).attr("href","javascript:manageVote.PassedOption(4,'false')");
						$("#voptionsop_"+id).html("开启");
					}
					else{
						$('#voteoption_'+id+'>span').remove();
						$("#voptionsop_"+id).attr("href","javascript:manageVote.PassedOption(4,'true')");
						$("#voptionsop_"+id).html("关闭");
					}
                }
            }
        });
    }
    vote.AddVote=function(vid){//添加编辑投票1
         if(vid==0){
			var b=$.dialog({
				id:"addvote",
				title:"添加投票",
				content:"url:/manage/pages/app/addvote.aspx",
				width:500,
				height:303
			});
		}
		else{
			var b=$.dialog({
				id:"editvote",
				title:"编辑投票",
				content:"url:/manage/pages/app/addvote.aspx?id="+vid,
				width:500,
				height:303
			});
		}
    }
     vote.AddVoteOption=function(id,vid,isadd){//添加投票选项1
         if(isadd){//添加投票选项
			var b=$.dialog({
				id:"addvoteoption",
				title:"添加投票选项",
				content:"url:/manage/pages/app/addvoteoption.aspx?vid="+vid,
				width:500,
				height:260
			});
		}
		else{//编辑投票选项
			var b=$.dialog({
				id:"editvoteoption",
				title:"编辑投票选项",
				content:"url:/manage/pages/app/addvoteoption.aspx?id="+id+"&vid="+vid+"&op=edit",
				width:500,
				height:260
			});
		}
    }
    vote.DelVote=function(vid){
        if(vid=="0"){
            vid=ManageTool.GetAllId('list','checkall');
        }
        if(vid=="0"||vid==""){return;}
     	var b=$.dialog.confirm("您确定要删除该投票吗",function(){
			$.ajax({
				type:"post",
				url:"/manage/pages/ajax/vote.aspx",
				data:"op=delete&id="+vid,
				success:function(msg){
					if(msg=="true"){
						vid=vid+",0";
						var ids=vid.split(',');
						for(var i=0;i<ids.length;i++){
							$("#vote_"+ids[i]).remove();
						}
						lhgdialog.tips("删除成功");
					}
					else{
						lhgdialog.alert("删除失败，请重试");
					}
				}
			})
		},function(){
		
		});
    }
    vote.DelOption=function(id){
		var b=$.dialog.confirm("您确定要删除该选项吗？",function(){
			$.ajax({
				type:"post",
				url:"/manage/pages/ajax/vote.aspx",
				data:"op=deleteoption&id="+id,
				success:function(msg){
					if(msg=="true"){
						$("#voteoption_"+id).remove();
					}
				}
			});
		},function(){
		
		
		});
    }
}
/*系统设置*/
var manageSystem=new function(){
	var sys=this;
	sys.Edit=function(obj,ty){
		var htm=$("#system_value_"+obj).html();
		if(htm.indexOf("<input")==-1){
			$("#system_value_"+obj).html('<input type="text" value="'+$("#system_value_"+obj).html()+'" style="width:293px;" id="system_value_'+obj+'_1"/>');
			$("#system_value_"+obj+"_1").bind("blur",function(){
				if($("#system_value_"+obj+"_1").val()==htm){
					$("#system_value_"+obj).html(htm);
				}
				else{
				   sys.PostEdit(obj,ty,$("#system_value_"+obj+"_1").val());
			    }
			}); 
			$("#system_value_"+obj+"_1").focus();
		}
	}
	sys.PostEdit=function(obj,ty,va){
		$.ajax({
			type:"POST",
			url:"/manage/pages/ajax/system.aspx",
			data:"op=edit&type="+ty+"&value="+escape(va),
			success:function(msg){
				if(msg=="true"){
					$("#system_value_"+obj).html(va);
				}
				else{
					alert("修改失败");
				}
			}
		});
	}
}
///管理员管理
var manageAdminUser=new function(){
	var user=this;
	this.AddUser=function(){
		var b=$.dialog({
				id:"adduser",
				title:"添加用户",
				content:"url:/manage/pages/app/adduser.aspx",
				width:500,
				height:260
		});
	}
	user.disUserEditMenu=function(obj){//显示右上角用户菜单
		$("#"+obj).css("display","block");
		$("#manage_usertip_left").removeClass();
		$("#manage_usertip_left").addClass("manage_usertip_left_hong");
		$("#manage_usertip_right").removeClass();
		$("#manage_usertip_right").addClass("manage_usertip_right_hong");
		$("#manage_usertip_center").css("background-color","#bd1926");
	}
	user.hideUserEditMenu=function(obj){//隐藏右上角用户菜单
		$("#"+obj).css("display","none");
		$("#manage_usertip_left").removeClass();
		$("#manage_usertip_left").addClass("manage_usertip_left_hui");
		$("#manage_usertip_right").removeClass();
		$("#manage_usertip_right").addClass("manage_usertip_right_hui");
		$("#manage_usertip_center").css("background-color","#4C5A6F");
	}
	user.EditUser=function(uid){//编辑用户信息
				var b=$.dialog({
				id:"adduser",
				title:"添加用户",
				content:"url:/manage/pages/app/adduser.aspx?id="+uid,
				width:500,
				height:260
		});
	}
}

/*用户管理*/
var manageUser = new function() {
    var users = this;
    users.Page = function(cp, mp) {
        var ucp = 1;
        if (cp == 0) {
            ucp = parseInt($("#ucp").html()) + 1;
        }
        else {
            ucp = cp;
            $("#mainright").scrollTop(0);
        }
        var count = 1;
        if ($('#usercount').length == 1) {
            count = $('#usercount').val();
            if (count == 0) {
                count = 1;
            }
        }
        else {
            count = 1;
        }
        if (ucp > count) { return; }
        $.ajax({
            type: "post",
            url: "/manage/pages/ajax/user.aspx",
            data: "op=page&cp=" + ucp + "&mp=20&order=&kw=" + escape($.trim($("#userkw").val())),
            success: function(msg) {
                $("#ucp").html(ucp);
                if (cp == 1) {
                    $("#list>li").remove();
                    $("#list>input").remove();
                }
                $("#list").append(msg);
                AutoPage.scroolBind('/user');
            }
        });
    }
    users.Delete = function(userid) {
		if(userid=="0"){
			userid=ManageTool.GetAllId('list','checkall');
		}
        $.dialog.confirm("您确定要删除该用户吗？",function() {
            $.ajax({
                type: "post",
                url: "/manage/pages/ajax/user.aspx",
                data: "op=delete&id=" + userid,
                dataType: "json",
                success: function(msg) {
                    if (msg.status == "true") {
						var ids=userid.split(',');
						for(var i=0;i<ids.length;i++){
							$("#user_"+ids[i]).remove();
						}
                    }
                    else {
                        alert("创建失败，请检查网络并重试。");
                    }
                }
            });
        },function(){
		
		});
    }

}
/*清除缓存*/
var manageCache = new function () {
    var cache = this;
    cache.cached = function () {
		var b=$.dialog({
			id:"cache",
			title:"缓存操作",
			width:480,
			height:300,
			content:"url:/manage/pages/app/cache.aspx"
		});
    }
}
/*后台页面UI函数*/
var manageui=new function(){
	var ui=this;
    ui.msgtip=function(msg){
	    $("#managetip").html(lodding+'<span style="color:red;">'+msg+'</span>');
	}
	ui.canceltip=function(){
		$("#managetip").html("");
	}
	ui.dislabel=function(obj){///显示label
		$("#"+obj+">label").css("display","inline");
	}
	ui.hidlabel=function(obj){///隐藏label
		$("#"+obj+">label").css("display","none");
	}
	ui.SetHw=function(){//设置页面高宽
		var width=$(document.body).width();
		var height=$(document.body).height();
		$("#header").width(width); 
		$("#main").width(width);
		$("#main").height(height-44);
		$("#mainleft").height(height-44);
		if($("#dragTip").length==1){
			$("#mainright").width(width-200);
		}
		else if($(".menuchild").length>0){
			$("#mainright").width(width-213);
		}
		else{
		    $("#mainright").width(width-148);
		}
		$("#mainright").height(height-44);
		if($("#dragTip").length==1){
			$(".listmain").width(width-2100-40-450);
			$("#listitem").width(width-2100-40-450);
			$("#listoption").width(width-2100-40-450);
		}
		else{
			$(".listmain").width(width-210-40);
			$("#listitem").width(width-210-40-20);
			$("#listoption").width(width-210-40-20);
		}
		if($(".mainparent").length==1){
			$(".mainparent").width(width-210-40-20);
		}
		$("#mainright").offset({top:44});
	}
	ui.TabMenu=function(menu,node){
		if(menu=="tab"){//列表页菜单
			var listleft=locaData.Get("listleft");
			var child=locaData.Get(node.split('_')[1]);
			if(!child){
				var isleft="false";
				if(listleft==null){isleft="true";}
				$.ajax({
					type:"POST",
					url:"/menu/getmenu",
					data:"menu="+node.split('_')[0]+"&isleft="+isleft,
					success:function(msg){
						var lefthtml="",menuhtml="";
						if(isleft=="true"){
							locaData.Set("listleft",msg.split('$')[0]);
							locaData.Set(node.split('_')[1],msg.split('$')[1]);
						}
						else{
							locaData.Set(node.split('_')[1],msg);
						}
						$("#mainleft").css("background","#8594a9 url(/img/bgleftmenu.png) repeat-y");
						$("#mainleft").css("width","210px");
						$("#mainleft").html(locaData.Get("listleft")+locaData.Get(node.split('_')[0]));
						ui.SetHw();
						if(node.split('_')[0]==node.split('_')[1]){
					      $(".listjiantou").css("top",103);
						}
						else{
							
							$(".listjiantou").css("top",$("#menu_"+node.split('_')[0]).offset().top+6);
						}

						locaData.Set("loca",node);
						$(".choose").removeClass("choose");
						$("#menu_"+locaData.Get("loca").split('_')[1]).addClass("choose");
					}
				});
			}
			else{

				$("#mainleft").css("background","#8594a9 url(/img/bgleftmenu.png) repeat-y");
				$("#mainleft").css("width","210px");
				$("#mainleft").html(locaData.Get("listleft")+locaData.Get(node.split('_')[1]));
				if(node.split('_')[0]==node.split('_')[1]){
					$(".listjiantou").css("top",103);
				}
				else{
					$(".listjiantou").css("top",$("#menu_"+node.split('_')[1]).offset().top+6);
				}
				locaData.Set("loca",node);
				$(".choose").removeClass("choose");
				$("#menu_"+locaData.Get("loca").split('_')[1]).addClass("choose");
				
			}
		}
		else{
			$("#mainleft").css("background","url(/img/bgleftmain.png) repeat-y #8594A9");
			$("#mainleft").css("width","145px");
			$("#mainleft").html(locaData.Get("index"));
		}
		ui.SetHw();
	}
	ui.GetIndexMenu=function(){
		if(locaData.Get("index")==null){
			$.ajax({
				type:"POST",
				url:"/menu/getmenu",
				data:"menu=index",
				success:function(msg){
					locaData.Set("index",msg);
					$("#mainleft").css("background","url(/img/bgleftmain.png) repeat-y #8594A9");
					$("#mainleft").css("width","145px");
					$("#mainleft").html(msg);
				}
			});
		}
		else{
			$("#mainleft").css("background","url(/img/bgleftmain.png) repeat-y #8594A9");
			$("#mainleft").css("width","145px");
			$("#mainleft").html(locaData.Get("index"));
		}
	}
	ui.SetLoca=function(loca){
		locaData.Set("loca",loca);
	}
}
/*拖拽布局相关函数*/
var manageDrag=new function(){
	var drag=this;
	drag.dragForm=function(build){///容器的集合，（垒）,其下的子元素将可拖拽//希望能拖动的元素块，也就是#left（#center||#right）的子元素//元素块拖动的鼠标入口，此参数不存在时默认为target 
		$.baseball({
		   accepter:build,
		   target:".baseball",	
		   handle:".basebat"
		});
	}
}
/*后台拖拽编辑模块--菜单方法*/
function menuOption(select,menuTag){
		var  option=this;
		var sourceText="";
		var endText="";
		var drag='<div class="contextMenu" style="display:none;" id="myMenu1"><ul><li id="delete"><img src="folder.png" /> 删除</li><li id="edit"><img src="email.png" /> 编辑</li></ul></div>';
		option.BindMenu=function(){//绑定菜单
			$(document.body).append($(drag));
			$(menuTag).contextMenu('myMenu1',{
				bindings: {
				  'delete': function(t) {//t为span元素
				   $(t).parent().remove();
				 },
				 'edit': function(t){
					  option.Edit(t);
					}
				  }
			});
		}
		this.Edit=function(t){
			var obj=$(t).parent();
			var attrs=obj.get(0).attributes;
			var widht=obj.width(); 
			var str='<a';
			for(var i=0;i<attrs.length;i++){
			   str+=" "+attrs[i].name+'="'+attrs[i].value+'"';
			}
			str+=obj.html()+"</a>";
			sourceText=str;
			var input = $('<input type="text" style="width:'+widht+'px;"value=\''+str+'\'/>');
            obj.replaceWith(input); 
			$(input).focus();
			$(input).bind("blur", function(){
			  $(input).replaceWith($(input).val());
			  $("p").unbind();
			  option.BindMenu();
			}); 
		}
		option.BindMenu();
}

/*背景颜色改变函数*/
function manageChangeBg(obj){
	$("."+obj+" :input").each(function() {
			$(this).click(function(){$(this).css("background-color","#FFF8E6");});
			$(this).blur(function(){$(this).css("background-color","#ffffff");});
	  });
}
/*Tool 基本函数*/
function getPart(c){
	var v='';
	if (document.location.href.indexOf('?')>-1){
		var u=document.location.href.split('#')[0].split('?')[1];
		var us=u.split('&');
		for (var i=0;i<us.length;i++){
			var ut=us[i].split('=');
			if (ut[0]===c){
				v=ut[1];break;
			}
		}
	}
	return v;
}
/*页面cookie操作*/
var PageCookie=new function(){
	var ckie=this;
	var ckiefrom="PearForum";
	ckie.getCookie=function(c,name){//获取cookie,c:cookie总名称,name:cookie名称//PearForumUser=User=admin&Pass=B49E1F42A57A05E216366FA122C6E8C9B1E3BF42
		var v=0;
		var t=document.cookie;
		var us=t.split(';');
		for (var i=0;i<us.length;i++){
			if(us[i].indexOf(ckiefrom+c)>-1){
				var ut=us[i].replace(ckiefrom+c+"=","").split('&');
				for(var j=0;j<ut.length;j++){
					if($.trim(ut[j].split('=')[0])==name){
						v=unescape(ut[j].split('=')[1]);
						break;
					}
				}
			}
		}
		return v;
	}
	ckie.setCookie=function(c,s,d,p){
		var v=ckiefrom+c+'='+s;
		v+=d?'; max-age='+(d*24*60*60):'';
		v+=p?'; path='+p:'; path=/';
		document.cookie=v;
	}
}

var locaData=new function(){
		var loca=this;
		loca.Get=function(key){//获取键值
			if(!CheckStorage()){alert("当前浏览器不支持sessionStorage");return;}
			try{
				return sessionStorage.getItem(key);
			}
			catch(e){

			}
		}
		loca.Set=function(key,value){///设置键值
			if(!CheckStorage()){alert("当前浏览器不支持sessionStorage");return;}
			try{
				sessionStorage.setItem(key,value);
			}
			catch(e){

			}
		}
		loca.Del=function(key){//删除键值
			if(!CheckStorage()){alert("当前浏览器不支持sessionStorage");return;}
			try{
				sessionStorage.removeItem(key);
			}
			catch(e){

			}
		}
		function CheckStorage(){
			if(!window.sessionStorage){
				return false;
			}
			else{
				return true;
			}
		}
}
/*Manage Common Tool*/
var ManageTool=new function(){
	var tool=this;
	tool.SelectAll=function(obj,chbox){
		if($(chbox).attr("checked")){
			$("#"+obj+">li>input").attr("checked","false");
		}
		else{
			$("#"+obj+">li>input").removeAttr("checked"); 
		}
	}
	tool.GetAllId=function(obj,chbox){
		var s='';
		$("#"+obj+">li>input:checked").each(function(){
			s+=$(this).val()+",";
		})
		s+="0";
		return s;
	}
}
/*页面加载执行函数*/
$(document).ready(function(){
		/*清除rights临时数据*/
		locaData.Del("right_right");
		locaData.Del("right_add");
		locaData.Del("right_sub");
		/*执行拖拽函数*/
		if(locaData.Get("Block")=="true"&&$(".listmain").length>0){
			Block.Drag();
		}
		setTimeout(function(){manageui.SetHw();},200);
		//定义页面高宽
		$(window).bind("resize", function () {
            manageui.SetHw();
        });	
})

/*自动翻页函数*/
var AutoPage = new function() {
    var autop = this;
    autop.scroolBind = function(fun) {//事件绑定函数
        $("#mainright").bind("scroll", function() {
            var bheight = $(".listmain").height();
            var cheight = $("#mainleft").height();
            var stop = $(".listmain").offset().top;
            if ((bheight + stop - cheight) < 200) {
                $("#mainright").unbind();
                if (fun == "module") {
                    manageModule.Page(0, 20);
                }
                else if (fun == "article") {
                    manageArticle.Page(0, false);
                }
                else if (fun == "template") {
                    manageTemplate.Page(0, 20);
                }
                else if (fun == "guestbook") {
                    manageGuestBook.PageGuestbook(0, 20);
                }
                else if (fun == "vote") {
                    manageVote.Page(0, 20);
                }
                else if (fun == "/user") {
                    manageUser.Page(0, 20);
                }
                else if (fun == "recommend") {
                    manageRecommend.Page(0, 20);
                }
                else {
                    alert(1);
                }
            }
        });
    }
}
$(document).ready(function() {
    $("#mainright").unbind("scroll");
    var url = document.location.href;
    if (url.indexOf("/module.aspx") > -1) {
        AutoPage.scroolBind('module');
    }
    else if (url.indexOf("/article.aspx") > -1) {
        AutoPage.scroolBind('article');
    }
    else if (url.indexOf("/template.aspx") > -1) {
        AutoPage.scroolBind('template');
    }
    else if (url.indexOf("/guestbook.aspx") > -1) {
        AutoPage.scroolBind('guestbook');
    }
    else if (url.indexOf("/vote.aspx") > -1) {
        AutoPage.scroolBind('vote');
    }
    else if (url.indexOf("/user.aspx") > -1) {
        AutoPage.scroolBind("/user");
    }
});
/***********/
function fitImg(I, fw, fh) {//按比例缩放图片(对象，宽，高)
    var i = new Image();
    i.src = I.src;
    if (i.width > 0 && i.height > 0) {
        if (i.width / i.height >= fw / fh) {
            if (i.width > fw) {
                I.width = fw;
                I.height = (i.height * fw) / i.width;
            }
            else {
                I.width = i.width;
                I.height = i.height;
            }
        }
        else {
            if (i.height > fh) {
                I.height = fh;
                I.width = (i.width * fh) / i.height;
            }
            else {
                I.width = i.width;
                I.height = i.height;
            }
        }
    }
}