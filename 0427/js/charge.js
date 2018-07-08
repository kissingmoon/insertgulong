$(function(){
	
    // ------------------------- 充值全局 -------------------------

    // 一级切换
    var slideIndex = getUrlParam("index");
    var defaultIndex = slideIndex == null ? 0 : slideIndex;
    $(".charge-page").slide({
        mainCell: '.depositWrap',
        titCell: '.firstStage li',
        titOnClassName: 'active',
        delayTime: 0,
        trigger: 'click',
        defaultIndex: defaultIndex
    });

    // 其他大额充值GetQueryString
    $(".j-other-big").click(function(){
        // $(".charge-page .firstStage li").eq(2).addClass('active').siblings().removeClass('active');
        // $(".charge-page .depositWrap .depositMain").eq(2).show().siblings().hide();
        $(".firstStage li").eq(2).trigger(".click");
        location.href = changeURLPar(location.href, 'index', '2');
    });

    // 获取url中的参数
    function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg);  //匹配目标参数
        if (r != null) return unescape(r[2]); return null; //返回参数值
    }
    // 修改url参数
    function changeURLPar(destiny, par, par_value)
    {
        var pattern = par+'=([^&]*)';
        var replaceText = par+'='+par_value;
        if (destiny.match(pattern))
        {
            var tmp = '/\\'+par+'=[^&]*/';
            tmp = destiny.replace(eval(tmp), replaceText);
            return (tmp);
        }
        else
        {
            if (destiny.match('[\?]'))
            {
                return destiny+'&'+ replaceText;
            }
            else
            {
                return destiny+'?'+replaceText;
            }
        }
        return destiny+'\n'+par+'\n'+par_value;
    }

    // 选择支付方式radio
    $(".paytype dd").click(function(){
        var $this = $(this);
        var i = $this.find(".yo-icon");

        if(i.hasClass("icon-radio-no")){
            i.addClass("icon-radio-yes").removeClass("icon-radio-no");
            $this.siblings("dd").find(".icon-radio-yes").removeClass("icon-radio-yes").addClass("icon-radio-no");
        }

    });

    // 下方select弹窗
    // 弹出
    $(".j-paytype-select dd").click(function(){
        var select = $(this).parents(".j-paytype-select").siblings(".wrapper2").find(".TipsWindown").clone();
        select.removeAttr("style").addClass("j-bank-select");
        console.log($(this).parents(".j-paytype-select").siblings(".wrapper2"))
        layer.open({
            type: 1,
            content: $("<div></div>").append(select).html(),
            anim: false,
            style: 'position:fixed; bottom:0; left:0; width: 100%; height: 200px; padding:10px 0; border:none;'
        })
    });
    // 选择
    $("body").on('click', '.j-bank-select dl dt', function(){
        console.log("sss")
        var that = $(this);
        var index = that.index();
        var dt = $('.j-bank-select dl dt').eq(index);
        selectBank(that);
        selectBank($(".j-paytype-select:visible").siblings(".wrapper2").find(".TipsWindown dt").eq(index));

        function selectBank(dt){
            dt.find(".yo-icon").addClass("icon-radio-yes").removeClass("icon-radio-no");
            dt.siblings("dt").find(".icon-radio-yes").removeClass("icon-radio-yes").addClass("icon-radio-no");
        }
    });
    // 完成
    $("body").on('click', '.j-bank-select h1 a', function(){
        layer.closeAll();
        var selected = $(this).parents(".j-bank-select").find(".icon-radio-yes").siblings("span");
        $(".j-paytype-select:visible dd .paybankName").html(selected.html());
    });


    // ------------------------- 第二个 -------------------------

    // 在线充值二级切换
    $(".j-dep-2").slide({
        mainCell: '.bd',
        titCell: '.secondStage li',
        titOnClassName: 'active',
        delayTime: 0,
        trigger: 'click',
    });

    // ------------------------- 第三个 -------------------------
    // 公司入款二级切换
    $(".j-dep-3").slide({
        mainCell: '.bd',
        titCell: '.secondStage li',
        titOnClassName: 'active',
        delayTime: 0,
        trigger: 'click',
    });

    // 公司入款，选择账号
    $(".companyDep .bankCard dd").click(function(){
        var $this = $(this);
        var i = $this.find(".yo-icon");
        $(".bankCard dd").removeClass("active").find(".icon-radio-yes").removeClass("icon-radio-yes").addClass("icon-radio-no");

        $this.addClass("active").siblings();
        if(i.hasClass("icon-radio-no")){
            i.addClass("icon-radio-yes").removeClass("icon-radio-no");
        }

    });

    // 刷新小图标
    $(".refreshImg").click(function(){
        var that = $(this);
        that.addClass('lodingPic');
        setTimeout(function(){
            that.removeClass('lodingPic');
        }, 1000)
    })

    // 支付说明弹出
    $(".j-payintro-handler").click(function(){
        layer.open({
            className: "layerPayintro",
            type: 1,
            content: $(".j-payintro").html(),
            anim: false,
            style: 'position:fixed; bottom:0; left:0; width: 100%; height: 100%; padding:10px 0; border:none;',
            success: function(el){
                console.log($(el))
                var swiper = new Swiper('.layermbox .swiper-container',{
                    pagination: '.layermbox .swiper-container .swiper-pagination'
                })

                $(el).on('click', ".yo-anTwo", function(){
                    layer.closeAll()
                })
            }
        })
    });

    // 支付说明2弹出
    $(".j-payintro2-handler").click(function(){
        layer.open({
            className: "layerPayintro",
            type: 1,
            content: $(".j-payintro2").html(),
            anim: false,
            style: 'position:fixed; bottom:0; left:0; width: 100%; height: 100%; padding:10px 0; border:none;',
            success: function(el){
                console.log($(el))
                var swiper = new Swiper('.layermbox .swiper-container',{
                    pagination: '.layermbox .swiper-container .swiper-pagination'
                })

                $(el).on('click', ".yo-anTwo", function(){
                    layer.closeAll()
                })
            }
        })
    });

    // 银行入款下一步
    $(".j-dep-3 .j-step-1 .yo-anOne").click(function(){
        var act = $(this).parent().parent().find('.bankCard .active')[0];
        if (act){
            $(".j-dep-3").addClass("active");
        }else {
            chargeMsg("请您选择入款账号!");
        }
    });
    $(".j-dep-3 .j-step-2 .lastc").click(function(){
        var wrap = $(this).parents(".j-step-2");
        var input1 = wrap.find(".rechargebox dd").eq(0).find(".typeinput");
        var input2 = wrap.find(".rechargebox dd").eq(1).find(".typeinput");
        var input3 = wrap.find(".rechargebox dd").eq(2).find(".typeinput");
        var pay_node = $(this).parent().parent().parent().find('.bankCard .active')[0];
        var userId = $('#userId').text();
        if(!pay_node){
            chargeMsg('请返回第一步选择入款账号');
            return false;
        }
        var pay_id = $(this).parent().parent().parent().find('.bankCard .active div:eq(0)').text();
        if(userId===''){ chargeMsg("请登录再充值"); return false;}
        if(input1.val().length == 0){ chargeMsg("请您输入充值金额!"); return false;}
        if(input2.val().length == 0){ chargeMsg("情输入存款名!"); return false;}

        //追加信息
        var node = $(this).parents('li').find(".j-step-3");
        node.find('span').eq(0).text('');
        node.find('span').eq(0).text(userId);
        node.find('span').eq(1).text('');
        node.find('span').eq(1).text(input1.val());
        node.find('span').eq(2).text('');
        node.find('span').eq(2).text(input2.val());
        node.find('span').eq(3).text('');
        node.find('span').eq(3).text(input3.val());

        var bankNode = $(this).parent().parent().parent().find('.bankCard .active');
        node.find('span').eq(4).text('');
        node.find('span').eq(4).text(bankNode.find('.cardCode').text());
        node.find('span').eq(5).text('');
        node.find('span').eq(5).text(bankNode.find('.cardUserName').find('em').eq(0).text());


        $(".j-dep-3").addClass("active2");
        // var act = $(this).parent().parent().find('.bankCard .active')[0];
        // if (act){
        //     $(".j-dep-3").addClass("active");
        // }else {
        //     chargeMsg("请您选择入款账号!");
        // }
    });
    // 银行入款上一步
    $(".j-dep-3 .j-step-3 .firstc").click(function(){
        $(".j-dep-3").removeClass("active2");
    })
    $(".j-dep-3 .j-step-2 .firstc").click(function(){
        $(".j-dep-3").removeClass("active");
    })

    // 复制功能
    /*$("[data-clipboard-text]").each(function(index, el){
        var btn = $(el);
        var text = btn.attr("data-clipboard-text");
        var clip = new Clipboard(el, {
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
    })*/



    // ------------------------- 表单提示 -------------------------

    // 最大最小值提示
    /*$("input[data-min]").each(function(){
        var input = $(this);
        var min = parseFloat(input.attr("data-min"));
        var max = parseFloat(input.attr("data-max"));
        input.bind('input', function(){
            var val = parseFloat($(this).val());
            var error = 0;
            var msg = "";
            if(val < min){
                msg = "最低金额" + min;
                error = 1;
            }else if(val > max){
                msg = "最高金额" + max;
                error = 1;
            }else{
                msg = "";
                error = 0;
            }

            var tip = input.siblings(".depTips");
            if(error == 1){
                tip.html(msg);
            }else{
                tip.html("");
            }
        })
    })*/

    //发起支付的接口
    function initiate(userId, money, payType, gateFlag) {
        //所有按钮点击后就禁用
        $.post(url+"to-charge-new", {"userId": userId, "money": money,"payType":payType, 'gateFlag':gateFlag}, function(data) {
            var parsedJson = $.parseJSON(data);
            if (parsedJson.code == 0){
                var barCode = parsedJson.barCode;
                if (barCode !== null && barCode !=="" && barCode !== undefined){
                    var payType = parsedJson.payType;
                    var orderMoney = parsedJson.orderMoney;
                    var orderNumber = parsedJson.orderNumber;
                    //跳转到二维码页面
                    window.location.href =encodeURI('../chargeQrCode.html?barCode='+barCode+'&payType='+payType+'&orderMoney='+orderMoney+'&orderNumber='+orderNumber);
                }else {
                    window.location.href=parsedJson.info;
                }
            }else{
                chargeMsg(parsedJson.info);
                $(".yo-anOne").each(function(){
                    $(this).removeAttr("disabled");
                });
            }

        });

    }
    //支付宝确认按钮
    $(".j-dep-1 .yo-anOne").click(function(){
        $(this).attr("disabled","disabled");
        var wrap = $(this).parents(".j-dep-1");
        var money = wrap.find(".typeinput");
        var gateSelect = wrap.find('.paytype .radio_span');
        if(!checkMoney(money)){
            $(this).removeAttr("disabled");
            return;
        }
        if(!checkGate(gateSelect)){
            $(this).removeAttr("disabled");
            return;
        }
        var random=wrap.find(".Tspe").html();
        var chargeMoney=money.val()+random;
        var gate_type = gateSelect.find('.icon-radio-yes').parents('dd').attr('gate_type');
        var gate_flag = gateSelect.find('.icon-radio-yes').parents('dd').attr('gate_flag');
        //提交表单，参照旧版（多提交一个gate_flag）
        initiate($('#userId').text(), chargeMoney, gate_type, gate_flag);
    });
    //网银支付确认按钮
    $(".j-dep-2 .yo-anOne").click(function(){
        $(this).attr("disabled","disabled");
        var wrap = $(this).parents(".needChargeOnline");
        var money = wrap.find(".typeinput");
        var gateSelect = wrap.find('.paytype').eq(0).find('.radio_span');
        if(!checkMoney(money)){
            $(this).removeAttr("disabled");
            return;
        }
        if(!checkGate(gateSelect)){
            $(this).removeAttr("disabled");
            return;
        }
        var random=wrap.find(".Tspe").html();
        var chargeMoney=money.val()+random;
        var gate_type = gateSelect.find('.icon-radio-yes').parents('dd').attr('gate_type');
        var gate_flag = gateSelect.find('.icon-radio-yes').parents('dd').attr('gate_flag');
        //提交表单，参照旧版（多提交一个gate_flag）
        initiate($('#userId').text(), chargeMoney, gate_type, gate_flag);
    });
    //QQ确认按钮
    $(".j-dep-4 .yo-anOne").click(function(){
        $(this).attr("disabled","disabled");
        var wrap = $(this).parents(".j-dep-4");
        var money = wrap.find(".typeinput");
        var gateSelect = wrap.find('.paytype .radio_span');
        if(!checkMoney(money)){
            $(this).removeAttr("disabled");
            return;
        }
        if(!checkGate(gateSelect)){
            $(this).removeAttr("disabled");
            return;
        }
        var random=wrap.find(".Tspe").html();
        var chargeMoney=money.val()+random;
        var gate_type = gateSelect.find('.icon-radio-yes').parents('dd').attr('gate_type');
        var gate_flag = gateSelect.find('.icon-radio-yes').parents('dd').attr('gate_flag');
        //提交表单，参照旧版（多提交一个gate_flag）
        initiate($('#userId').text(), chargeMoney, gate_type, gate_flag);
    });
    $(".j-dep-2 .bd li").each(function(i, el){
        var wrap = $(el);
        var btn = wrap.find(".yo-anOne");
        btn.click(function(){
            var money = wrap.find(".typeinput");
            checkMoney(money);
        })
    });

    //公司入款提交表单
    $(".j-dep-3 .j-step-3 .lastc").click(function(){
        $(this).attr("disabled","disabled");
        var wrap = $(this).parents('li').find(".j-step-2");
        var input1 = wrap.find(".rechargebox dd").eq(0).find(".typeinput");
        var input2 = wrap.find(".rechargebox dd").eq(1).find(".typeinput");
        var input3 = wrap.find(".rechargebox dd").eq(2).find(".typeinput");
        var pay_node = $(this).parent().parent().parent().find('.bankCard .active')[0];
        var userId = $('#userId').text();
        if(!pay_node){
            chargeMsg('请返回第一步选择入款账号');
            $(this).removeAttr("disabled");
            return false;
        }
        var pay_id = $(this).parent().parent().parent().find('.bankCard .active div:eq(0)').text();
        // var input3 = wrap.find(".rechargebox dd").eq(3).find(".typeinput");
        if(userId===''){
            chargeMsg("请登录再充值");
            $(this).removeAttr("disabled");
            return false;
        }
        if(input1.val().length == 0){
            chargeMsg("请您输入充值金额!");
            $(this).removeAttr("disabled");
            return false;
        }
        if(input2.val().length == 0){
            chargeMsg("请输入存款名!");
            $(this).removeAttr("disabled");
            return false;
        }
        /*if(input3.val().length == 0){ chargeMsg("请您输入所属分行!"); return false;}*/

        //提交表单
        $.post(url+"com-pay-submit", {"userId": userId, "money": input1.val(),"payUser":input2.val(),'payRemark':input3.val(),'payId':pay_id}, function(data) {
            var parsedJson = $.parseJSON(data);
            if (parsedJson.code == 0){
                chargeMsg("提交成功");
                clearInputValue();
                resetSub();
            }else{
                chargeMsg(parsedJson.info);
            }

        });
        $(this).removeAttr("disabled");
    });

    /*$(".j-dep-3 .bd li").eq(0).find(".j-step-2 .lastc").click(function(){
        var wrap = $(this).parents(".j-step-2");
        var input1 = wrap.find(".rechargebox dd").eq(0).find(".typeinput");
        var input2 = wrap.find(".rechargebox dd").eq(1).find(".typeinput");
        var input3 = wrap.find(".rechargebox dd").eq(3).find(".typeinput");
        if(input1.val().length == 0){ chargeMsg("请您输入充值金额!"); return false;}
        if(input2.val().length == 0){ chargeMsg("情输入存款名!"); return false;}
        if(input3.val().length == 0){ chargeMsg("请您输入所属分行!"); return false;}
    });
    $(".j-dep-3 .bd li").eq(1).find(".j-step-2 .lastc").click(function(){
        var wrap = $(this).parents(".j-step-2");
        var input1 = wrap.find(".rechargebox dd").eq(0).find(".typeinput");
        var input2 = wrap.find(".rechargebox dd").eq(1).find(".typeinput");
        if(input1.val().length == 0){ chargeMsg("请您输入充值金额!"); return false;}
        if(input2.val().length == 0){ chargeMsg("情输入微信昵称!"); return false;}
    });
    $(".j-dep-3 .bd li").eq(2).find(".j-step-2 .lastc").click(function(){
        var wrap = $(this).parents(".j-step-2");
        var input1 = wrap.find(".rechargebox dd").eq(0).find(".typeinput");
        var input2 = wrap.find(".rechargebox dd").eq(1).find(".typeinput");
        if(input1.val().length == 0){ chargeMsg("请您输入充值金额!"); return false;}
        if(input2.val().length == 0){ chargeMsg("情输入支付宝昵称!"); return false;}
    });*/
    $(".j-dep-4 .yo-anOne").click(function(){
        var wrap = $(this).parents(".j-dep-4");
        var money = wrap.find(".typeinput");
        checkMoney(money);
    });

    function checkMoney(m){
        if(m.val().length == 0){
            chargeMsg("请您输入充值金额!");
            return false;
        }
        return true;
    }

    function checkGate(m){
        var mm = m.find('.icon-radio-yes')[0];
        if(!mm){
            chargeMsg("请您选择支付类型!");
            return false;
        }
        return true;
    }








})