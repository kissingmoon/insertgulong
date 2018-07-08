var url = commonUrl + '/v2/yhhd/user-charge/pay-status/';
var searhInfo = decodeURIComponent(location.search);
var barCode = getValByString(searhInfo, 'barCode', '');
var payType = getValByString(searhInfo, 'payType', '');
var orderMoney = getValByString(searhInfo, 'orderMoney', '');
var orderNumber = getValByString(searhInfo, 'orderNumber', '');

$('titile').text(payType+"支付-小李飞刀")
$('#payType').text("支付方式："+payType);
$('#orderMoney').text("订单金额："+orderMoney+"元");
$('#sao').text("请用"+payType+"扫一扫");

$(function() {
    $('#barCode').qrcode({
        render: "canvas", //table方式
        width: 250, //宽度
        height: 250, //高度
        text: barCode, //任意内容 background: "#ffffff",
        background: "#ffffff",
    });
    //定时请求刷新
    setInterval(runajax,3000);
});

function runajax(){
    $.ajax({
        type: "GET",
        url: url,
        data: "orderNumber="+orderNumber,
        dataType: "json",
        success: function(data){
            if (data == "success") {
                new jBox('Modal', {
                    animation: 'zoomOut',
                    draggable: 'title',
                    title: '<div style="font-size: 15px;">提示信息</div>',
                    closeButton: 'title',
                    width:300,
                    color: 'red',
                    content: '<div style="font-size: 15px;">支付成功！请到个人主页查看您的账户余额</div>'
                }).open();
            }else{

            }
        }
    })
}
