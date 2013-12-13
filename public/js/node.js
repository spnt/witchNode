/*信息节点树操作*/
var simpleTreeCollection;
$(document).ready(function(){
    simpleTreeCollection = $('.simpleTree').simpleTree({
        autoclose: true,
        afterClick:function(node){                   
          //  alert("您选择了：" + $('span:first',node).text() + "id为：" + $('span:first',node).attr("id").substr(2));//此处为何要“.substr(2)”，是因为特殊原因，稍后可以得到解释.如果你仅仅需要取文字，这里可以不取ID。                
        },
        afterDblClick:function(node){
            //alert("text-"+$('span:first',node).text());//双击事件
        },
        afterMove:function(destination, source, pos){//拖拽事件
            //alert("destination-"+destination.attr('id')+" source-"+source.attr('id')+" pos-"+pos);//拖拽事件
			 moveNode(source.attr('id'),destination.attr('id'));//拖拽事件响应
        },
        afterAjax:function()
        {
            //alert('Loaded');
        },
        animate:true
        //,docToFolderConvert:true
    });
});

//移动节点响应函数
function moveNode(sourceId,destId){
    var recs = $("#moveRecs").val();
    var strs = recs.match(eval("/\\|"+sourceId+",\\w+\\d+\\|/g"));
    if(strs != null){//源id有过一次拖动，则删除之
        recs = recs.replace(strs,"|");
        $("#moveRecs").val(recs);
    }      
    $("#moveRecs").val($("#moveRecs").val() + sourceId + "," + destId + "|");//用栅栏把操作数隔开。
}

$("#btnSaveActions").click(function(){
	$.get("/common/SaveMoveActions.aspx", {
                        "actions":$('#moveRecs').val()
                        }, function (returnvalue){
                        //返回的 data 可以是 xmlDoc, jsonObj, html, text, 等等.                
                        alert(returnvalue);
});
});