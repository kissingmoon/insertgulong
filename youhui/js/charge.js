var url = commonUrl + '/v2/yhhd/user-charge/';

//发起支付的接口
function initiate(userId, money, payType) {
    $.post(url+"to-charge", {"userId": userId, "money": money,"payType":payType}, function(data) {
        var parsedJson = $.parseJSON(data);
        if (parsedJson.code == 0){
            var barCode = parsedJson.barCode;
            if (barCode !== null && barCode !=="" && barCode !== undefined){
                var payType = parsedJson.payType;
                var orderMoney = parsedJson.orderMoney;
                var orderNumber = parsedJson.orderNumber;
                //跳转到二维码页面
                window.location.href =encodeURI('chargeQrCode.html?barCode='+barCode+'&payType='+payType+'&orderMoney='+orderMoney+'&orderNumber='+orderNumber);
            }else {
                window.location.href=parsedJson.info;
            }
        }else{
            new jBox('Modal', {
                animation: 'zoomOut',
                draggable: 'title',
                width:300,
                title: '<div style="font-size: 15px;">提示信息</div>',
                closeButton: 'title',
                color: 'red',
                content: '<div style="font-size: 15px;">'+parsedJson.info+'</div>'
            }).open();
        }
    });
}

//倒计时
var jsq;
function jump(count, userId, money, payType) {
    jsq = window.setTimeout(function(){
        count--;
        if(count > 0) {
            $('.dialog-footer span').text( count);
            jump(count, userId, money, payType);
        } else {
            $('#modal').css("display", "none");
            $('.dialog-footer span').text("");
            initiate(userId, money, payType);
        }
    }, 1000);
}

var tj_money, tj_userId, tj_payType;
//立即充值事件
function userCharge() {
    var money = $("#selfCharge").val();
    if (money==null || money=="" || money === undefined){
        money = $("#chargeForem input[name=chargeValue]:checked").val();
    }
    var payType=$("#chargeForem input[name=payment]:checked").val();
    var userId=$("#userId").text();
    // var userId = 'eden001';
    if (userId === null || userId ==="" || userId === undefined){
        new jBox('Modal', {
            animation: 'zoomOut',
            draggable: 'title',
            title: '<div style="font-size: 15px;">提示信息</div>',
            closeButton: 'title',
            width:300,
            color: 'red',
            content: '<div style="font-size: 15px;">获取用户信息出错</div>'
        }).open();
        return;
    }
    if (payType === null || payType ==="" || payType === undefined){
        new jBox('Modal', {
            animation: 'zoomOut',
            draggable: 'title',
            title: '<div style="font-size: 15px;">提示信息</div>',
            closeButton: 'title',
            width:300,
            color: 'red',
            content: '<div style="font-size: 15px;">请选择充值方式</div>'
        }).open();
        return;
    }
    if(parseInt(money) <= 0 || money === 'on' || money === undefined){
        new jBox('Modal', {
            animation: 'zoomOut',
            draggable: 'title',
            title: '<div style="font-size: 15px;">提示信息</div>',
            closeButton: 'title',
            width:300,
            color: 'red',
            content: '<div style="font-size: 15px;">请输入有效金额(元)</div>'
        }).open();
        $("#selfCharge").focus();
        return;
    }

    var suiji = parseFloat(Math.random().toFixed(2));
    if (parseInt(10*Math.random())%2 === 0){
        money = parseFloat(money) - suiji;
    }else {
        money = parseFloat(money) + suiji;
    }
    $('#tc').text(money);

    //弹出框
    tj_money = tj_payType = tj_userId = '';
    tj_money = money; tj_userId = userId; tj_payType = payType;
    $('.dialog-footer span').text("");
    $('#modal').css("display", "block");

    jump(5, userId, money, payType);
}
//点击倒计时，立即充值
$('.dialog-footer span').click(function () {
    $('#modal').css("display", "none");
    $('.dialog-footer span').text("");
    window.clearInterval(jsq);
    if (tj_payType === '' || tj_userId === '' || tj_money === ''){
        alert("出错");
    }else {
        initiate(tj_userId, tj_money, tj_payType);
    }
});
//关闭弹出框，取消充值
$('#close').click(function () {
    $('.dialog-footer span').text("");
    window.clearInterval(jsq);
    $('#modal').css("display", "none");
})


var user_token = GetQueryString("user_token");
//判断是否登陆
$.post(url+"charge-page", {"user_token": user_token}, function(data) {
    var parsedJson = $.parseJSON(data);
	if(parsedJson.code==0){
		$("#userbalance").html(parsedJson.balance);
		$("#userId").text(parsedJson.userId);
	}else{
		new jBox('Modal', {
                animation: 'zoomOut',
                draggable: 'title',
                width:300,
                title: '<div style="font-size: 15px;">错误提示</div>',
                closeButton: 'title',
                color: 'red',
                content: '<div style="font-size: 15px;">'+parsedJson.info+'</div>'

            }).open();
	}

});

//获取快选金额
$.post(url+"charge-info", function (data) {
    var datalist = JSON.parse(data);
    var chargeMoneyList = datalist.charge_money;//快选金额
    var chargeChannelList = datalist.charge_channel;//充值通道
    var moneyDiv = '';
    for(var i=0;i<chargeMoneyList.length;i++){
        //动态添加节点
        if (chargeMoneyList[i].is_hot == '1'){
            moneyDiv = '<div class="charge-item active"';
        }else {
            moneyDiv = '<div class="charge-item"';
        }
        moneyDiv += 'onclick="changeMoney('+chargeMoneyList[i].money+')">'
                    + '<input type="radio" name="chargeValue" id="chargeValue'+i+'" value="'+chargeMoneyList[i].money+'">'
                    + '<label for="chargeValue'+i+'" class="flex flex-align-center flex-pack-center">'
                    + '<p>￥'+chargeMoneyList[i].money+'元';
        if (chargeMoneyList[i].content !== null && chargeMoneyList[i].content !=="" && chargeMoneyList[i].content !== undefined){
            moneyDiv += '<br>'+chargeMoneyList[i].content+'</p>';
        }
        moneyDiv += '</label></div>';
        $('#moneySelect').before(moneyDiv);
    }

    for(var i=0;i<chargeChannelList.length;i++){
        if (chargeChannelList[i].channel_type === '1'){
            $('.item-yl').css("display", "block");
        }
        if (chargeChannelList[i].channel_type === '2'){
            $('.item-wx').css("display", "block");
        }
        if (chargeChannelList[i].channel_type === '3'){
            $('.item-ali').css("display", "block");
        }
        if (chargeChannelList[i].channel_type === '5'){
            $('.item-qq').css("display", "block");
        }
    }
})

function changeMoney(money) {
    $('.aaa').css("display", "none");
}
	
function aaa() {
    $('.aaa').css("display", "block");
}