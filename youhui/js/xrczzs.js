var url = commonUrl + '/v2/activity/xrczzs/';

//获取url后面的参数
function GetQueryString(name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}
//领取
function receive(type) {
    $.post(url+"receive", {"user_token": user_token, "type": type}, function(data) {
        if (data == 1){
            new jBox('Modal', {
                animation: 'zoomOut',
                draggable: 'title',
                width:300,
                title: '<div style="font-size: 15px;">提示信息</div>',
                closeButton: 'title',
                color: 'red',
                content: '<div style="font-size: 15px;">领取成功</div>',
                onClose: function () {
                    location.reload();
                }
                }).open();
        }else{
            new jBox('Modal', {
                animation: 'zoomOut',
                draggable: 'title',
                width:300,
                title: '<div style="font-size: 15px;">提示信息</div>',
                closeButton: 'title',
                color: 'red',
                content: '<div style="font-size: 15px;">领取失败</div>',
                onClose: function () {
                    location.reload();
                }
            }).open();
        }
    });
}

var user_token = GetQueryString("user_token");
//判断是否有领取资格
$.post(url+"check-out", {"user_token": user_token}, function(data) {
    var parsedJson = $.parseJSON(data);
    $.each(parsedJson, function(idx,item){
        var type = item.type;
        var status = item.status;   //1已领取  2未领取    3未完成
        $('#type'+type).empty();
        if(status == 1){
            $('#type'+type).html('<span class="color-g">（已经完成）</span><a href="javascript:;" class="yh-tip yh-tip-g">已领取</a>');
        }else if (status == 2){
            $('#type'+type).html('<span class="color-g">（已经完成）</span><a href="javascript:receive('+type+');" class="yh-tip yh-tip-red">请领取</a>');
        }else if (status == 3){
            $('#type'+type).html('<span class="color-y">（未完成）</span>');
        }
    });
});