var url = commonUrl + '/v2/yhhd/help-gold/';

var user_token = GetQueryString("user_token");

//领取
function receive() {
    $.post(url, {"user_token": user_token}, function(data) {
        var parsedJson = $.parseJSON(data);
        var errorMsg = parsedJson.errorMsg;
        var receive_money = parsedJson.receive_money;
        if (receive_money !== undefined){
            new jBox('Modal', {
                animation: 'zoomOut',
                draggable: 'title',
                width:300,
                title: '<div style="font-size: 15px;">提示信息</div>',
                closeButton: 'title',
                color: 'red',
                content: '<div style="font-size: 15px;">成功领取'+'<div style="font-size: 15px;color: red;">'+receive_money+'</div>元</div>',
            }).open();
        }else{
            new jBox('Modal', {
                animation: 'zoomOut',
                draggable: 'title',
                width:300,
                title: '<div style="font-size: 15px;">提示信息</div>',
                closeButton: 'title',
                color: 'red',
                content: '<div style="font-size: 15px;">'+errorMsg+'</div>',
            }).open();
        }
    });
}

if (user_token !== null && user_token !=="" && user_token !== undefined){
    $('#type').empty();
    $('#type').html('<a href="javascript:receive();" class="yh-tip yh-tip-red">请领取</a>');
}