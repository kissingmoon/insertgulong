var url = 'http://192.168.195.164:8081' + '/v2/yhhd/user-charge/';

//function GetQueryString(name) {
//  var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
//  var r = window.location.search.substr(1).match(reg);
//  if(r!=null)return  unescape(r[2]); return null;
//}
var user_token = '64db48147acf16192463b6b6ecd31714';

//=====================================================================================================================
//获取公司入款二级菜单
$.post(url+"get-com-pay-method",{type:2}, function (data) {
    var chargeChannelList = JSON.parse(data);
    for(var i=0;i<chargeChannelList.length;i++){
        var type=parseInt(chargeChannelList[i].type_flag);
        $('.j-dep-3 .secondStage li:eq('+ i+')').css("display", "block");
        getComPayList(type,i);
        //添加金额限制显示
        $('.j-dep-3 .bd li:eq('+i+') .j-step-2 .rechargebox dd:eq(0) .input-one')
            .attr("data-min",chargeChannelList[i].minMoney).attr("data-max",chargeChannelList[i].maxMoney)
            .attr("placeholder",chargeChannelList[i].minMoney+"-"+chargeChannelList[i].maxMoney);
    }
});

//获取收款银行信息列表
function getComPayList(type,index) {
    $.post(url+"get-com-pay-list",{type:type}, function (data) {
        var bankList = JSON.parse(data);
        var bankDiv = '';
        //var index = type-1;
        for(var i=0;i<bankList.length;i++){
            //动态添加节点
            bankDiv += '<dd onclick="act(this)"><div style="display: none">'+bankList[i].id+'</div><p class="cardName">'+bankList[i].type_name+'</p><div class="cardMain"><span class="cardUserName">收款名称: <em>'+bankList[i].sk_people
                + '</em><span onclick="copyData(this)" data-clipboard-text="'+bankList[i].sk_people+'" style=" color: rgb(246, 134, 34); font-weight: normal; position: absolute; right: 45px;">复制</span></span> ' +
                '<em class="cardCode">收款账号: '+bankList[i].account_no+'<span onclick="copyData(this)" data-clipboard-text="'+bankList[i].account_no+'" style="font-size: 14px; color: rgb(246, 134, 34); font-weight: normal; position: absolute; right: 45px;">复制</span></em> <span class="radio_span"><i class="yo-icon icon-radio-no"></i></span></div>'
                + '<p class="cardBranch">开户网点：<em>'+bankList[i].account_kh_address+'</em></p></dd>';
        }
        $('.j-dep-3 .bd li:eq('+index+') .bankCard').append(bankDiv);
    });
}
//选择银行列表的时候的展示样式
function act(node) {
    $(node).parent().find('dd').removeClass("active");
    $(node).addClass("active");
    var i = $(node).find(".yo-icon");
    $(".bankCard dd").removeClass("active").find(".icon-radio-yes").removeClass("icon-radio-yes").addClass("icon-radio-no");
    $(node).addClass("active").siblings();
    if(i.hasClass("icon-radio-no")){
        i.addClass("icon-radio-yes").removeClass("icon-radio-no");
    }
}

function copyData(node) {
   // $("[data-clipboard-text]").each(function(index, el){
        var btn = $(node);
        var text = btn.attr("data-clipboard-text");
        var clip = new Clipboard(node, {
            text: function(){ return text;}
        })
        clip.on('success', function(e) {
            layer.open({
                content: '复制成功',
                style: " background:rgba(0,0,0,.5); border:0 none; color:#fff; width: auto; height: auto; min-height: 0; text-align: center",
                shade: false,
                time: 2
            });
        });

        clip.on('error', function(e) {
            console.log(e);
        });
   // })
}

//=====================================================================================================================
//获取在线入款二级菜单
$.post(url+"get-com-pay-method",{type:1}, function (data) {
    var chargeChannelList = JSON.parse(data);
    for(var i=0;i<chargeChannelList.length;i++){
        var type=parseInt(chargeChannelList[i].type_flag);

        if(i<5){
            $('.j-dep-2 .secondStageWrap .online1 li:eq('+ i+')').css("display", "block");
            $('.j-dep-2 .secondStageWrap .online1 li:eq('+ i+') a').text(chargeChannelList[i].type_name);
            //显示金额限制的显示
            // $('.j-dep-2 .bd li:eq('+i+') .rechargebox dd:eq(0) .specialbox .input-one')
            //     .attr("data-min",chargeChannelList[i].minMoney).attr("data-max",chargeChannelList[i].maxMoney)
            //     .attr("placeholder",chargeChannelList[i].minMoney+"-"+chargeChannelList[i].maxMoney);
        }else{
            $('.j-dep-2 .secondStageWrap .online2 li:eq('+ (i-5)+')').css("display", "block");
            $('.j-dep-2 .secondStageWrap .online2 li:eq('+ (i-5)+') a').text(chargeChannelList[i].type_name);
            //显示金额限制的显示
            // $('.j-dep-2 .bd li:eq('+i+') .rechargebox dd:eq(0) .specialbox .input-one')
            //     .attr("data-min",chargeChannelList[i].minMoney).attr("data-max",chargeChannelList[i].maxMoney)
            //     .attr("placeholder",chargeChannelList[i].minMoney+"-"+chargeChannelList[i].maxMoney);
        }
        getGateFlag(type,i);
    }
});

// showFirstMoneyLimit(1,3);
// showFirstMoneyLimit(1,5);
//显示支付宝和qq的金额限制
function showFirstMoneyLimit(typeData,typeFlagData){
    $.post(url+"get-com-pay-method-detail",{type:1,typeFlag:typeFlagData}, function (data) {
        var chargeChannel = JSON.parse(data);
        var type=parseInt(chargeChannel.type_flag);
        if(type==3){
            //显示金额限制的显示
            $('.j-dep-1 .rechargebox  .specialbox .input-one')
                .attr("data-min",chargeChannel.minMoney).attr("data-max",chargeChannel.maxMoney)
                .attr("placeholder",chargeChannel.minMoney+"-"+chargeChannel.maxMoney);
        }else if(type==5){
            $('.j-dep-4 .rechargebox  .specialbox .input-one')
                .attr("data-min",chargeChannel.minMoney).attr("data-max",chargeChannel.maxMoney)
                .attr("placeholder",chargeChannel.minMoney+"-"+chargeChannel.maxMoney);
        }
    });
}

//获取网关标识
getGateFlag(3);//支付宝
getGateFlag(5);//QQ
function getGateFlag(type,index) {
    $.post(url+"get-gate-flag",{type:type}, function (data) {
        var bankList = JSON.parse(data);
        var bankDiv = '';
        //var index=type -1;
        for(var i=0;i<bankList.length;i++){
            //动态添加节点
            if (i===0){//默认选择第一个
                bankDiv += '<dd gate_flag="'+bankList[i].gate_flag+'" gate_type="'+bankList[i].gate_type+'" min_money="'+bankList[i].min_money+'" max_money="'+bankList[i].max_money+'" onclick="actZfb(this)">'
                    + '<div class="payImg"><img src="'+bankList[i].gate_img+'">'
                    + '</div> <span class="txt-list">'+bankList[i].gate_name
                    + '</span> <span class="radio_span"><i class="yo-icon icon-radio-yes"></i></span></dd>';
                if(type==3){
                    //显示金额限制的显示
                    $('.j-dep-1 .rechargebox  .specialbox .input-one')
                        .attr("data-min",bankList[i].min_money).attr("data-max",bankList[i].max_money)
                        .attr("placeholder",bankList[i].min_money+"-"+bankList[i].max_money);
                }else if(type==5){
                    $('.j-dep-4 .rechargebox  .specialbox .input-one')
                        .attr("data-min",bankList[i].min_money).attr("data-max",bankList[i].max_money)
                        .attr("placeholder",bankList[i].min_money+"-"+bankList[i].max_money);
                }
                if(index != undefined){
                    if(index<5){
                        //显示金额限制的显示
                        $('.j-dep-2 .bd li:eq('+index+') .rechargebox dd:eq(0) .specialbox .input-one')
                            .attr("data-min",bankList[i].min_money).attr("data-max",bankList[i].max_money)
                            .attr("placeholder",bankList[i].min_money+"-"+bankList[i].max_money);
                    }
                }
            }else {
                bankDiv += '<dd gate_flag="'+bankList[i].gate_flag+'" gate_type="'+bankList[i].gate_type+'" min_money="'+bankList[i].min_money+'" max_money="'+bankList[i].max_money+'" onclick="actZfb(this)">'
                    + '<div class="payImg"><img src="'+bankList[i].gate_img+'">'
                    + '</div> <span class="txt-list">'+bankList[i].gate_name
                    + '</span> <span class="radio_span"><i class="yo-icon icon-radio-no"></i></span></dd>';
            }



        }
        if(index != undefined){
            $('.j-dep-2 .bd li:eq('+index+') .paytype .j-other-big').before(bankDiv);
        }else{
            if (type === 3){
                $('.j-dep-1 .paytype .j-other-big').before(bankDiv);
            }
            if (type === 5){
                $('.j-dep-4 .paytype .j-other-big').before(bankDiv);
            }
        }

        /*if (type === 1){
            $('.j-dep-2 .paytype .j-other-big').before(bankDiv);
        }*/
    });
}
function actZfb(node) {
    var $this = $(node);
    var i = $this.find(".yo-icon");

    if(i.hasClass("icon-radio-no")){
        i.addClass("icon-radio-yes").removeClass("icon-radio-no");
        $this.siblings("dd").find(".icon-radio-yes").removeClass("icon-radio-yes").addClass("icon-radio-no");
    }

    // alert($this.attr('min-money'));
    $this.parents('.depositMain').find('.input-one').attr("data-min",$this.attr('min_money')).attr("data-max",$this.attr('max_money'))
        .attr("placeholder",$this.attr('min_money')+"-"+$this.attr('max_money'));
}
// 点击一级菜单的时候，产生随机数
$(".charge-page .firstStage li a").click(function () {
    var rnd="";
    rnd+=Math.floor(Math.random()*10);
    rnd+=Math.floor(Math.random()*10);
    $(".Tspe").html("."+rnd);
    $(".TspeEm").html("0."+rnd);
})


//清空所有input的值
function  clearInputValue() {
    $("input").each(function(){
        $(this).val('');
    });
}

//举例说明，点击公司入款下面的，银行、微信时重置下面的界面
function resetSub(){
    $(".j-dep-3").removeClass("active2");
    $(".j-dep-3").removeClass("active");
}

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

//=====================================================================================================================

//=====================================================================================================================
//判断是否登陆
$.post(url+"charge-page", {"user_token": user_token}, function(data) {
    var parsedJson = $.parseJSON(data);
    if(parsedJson.code==0){
        $("#userId").text('');
        $("#userId").text(parsedJson.userId);
    }else{
        
    }
    // $("#userId").text("test");
});
if (user_token !== null && user_token !=="" && user_token !== undefined){


}