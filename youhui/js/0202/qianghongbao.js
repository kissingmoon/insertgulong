var url = commonUrl + '/v2/yhhd/charge-day-gold/';

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
                content: '<div style="font-size: 15px;">申请成功</div>',
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
    $('.intro-btn').text("抢红包");
    // $('.intro-btn').attr("href", "javascript:receive();");
}