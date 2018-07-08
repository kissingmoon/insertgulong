var url = commonUrl + '/v2/yhhd/';

var user_token = GetQueryString("user_token");

// 弹窗温馨提示
function chargeMsg(str){
    t = "<div class='yo-tancen'><p>" + str + "</p></div>";
    layer.open({
        className: "layerConfirm",
        title: '<p><i class="yo-icon icon-bulb"></i>温馨提示</p>',
        content: t,
        btn: ["我知道了"],
        end: function() {

        }
    })
}

//领取
function receive() {
    $.post(url+"open-gold/", {"user_token": user_token}, function(data) {
        var parsedJson = $.parseJSON(data);
        var errorMsg = parsedJson.errorMsg;
        var receive_money = parsedJson.receive_money;
        if (receive_money !== undefined){
            chargeMsg("申请成功");
        }else{
            chargeMsg(errorMsg);
        }
    });
}

/*if (user_token !== null && user_token !=="" && user_token !== undefined){
    //判断是否能领取
    $.post(url+"open-gold-isok", {"user_token": user_token}, function(data) {
        if (data === "1"){
            $('.intro-btn').text("申请");
            $('.intro-btn').attr("href", "javascript:receive();");
        }else if(data === "2"){ // 审核不通过
            $('.intro-btn').text("申请");
            $('.intro-btn').css("background", "gray");
        }else if(data === "3"){ // 审核中
            $('.intro-btn').text("审核中");
        }else if(data === "4"){ //
            $('.intro-btn').text("未达标");
        }else{
            $('.intro-btn').text("已领取");
            $('.intro-btn').css("background", "gray");
        }
    });

}else {
    $('.intro-btn').css("background", "gray");
}*/
$('.intro-btn').text("注册即送");
$('.intro-btn').css("background", "gray");