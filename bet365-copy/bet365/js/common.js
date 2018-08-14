$(function(){

	// 会员弹窗
	var layerMember = $("#layerMember");
	if(layerMember.hasClass('j-autoshow')){
		var w = $(window).width();
		w = w < 720 ? w : 700;
		layer.tab({
			area: [w + 'px', 'auto'],
			shade: [0.6, '#06632b'],
			content: $("#layerMember"),
			title: false
		})
	}


	// ----------------------------- 首页 ----------------------------- 
	// 我的竞猜 弹窗
	$(".j-btn-my").click(function(){
		var w = $(window).width();
		w = w < 720 ? w : 1000;
		h = w < 720 ? w/1.3 : w/2;
		layer.tab({
			area: [w + 'px', h + 'px'],
			shade: [0.6, '#06632b'],
			tab: [{
				content: $("#layerMyGuess1").html(),
				title: '赛程竞猜'
			},{
				content: $("#layerMyGuess2").html(),
				title: '我的预测'
			}]
		})
	})

	// 赛程轮播
	$(".slide-flow").slide({
		mainCell: '.bd ul',
		titCell: '.hd li',
		trigger: 'click'
	})
	$(".slide-xiaozu").slide({
		mainCell: '.xiaozu-bd',
		titCell: '.xiaozu-hd span',
		trigger: 'click'
	})
	// 赛程提交
	$(".slide-flow form .j-submit").click(function(){
		var form = $(this).parents("form");
		form.submit();
	})


	// 竞猜轮播
	$(".slide-guess").slide({
		mainCell: '.bd ul',
		titCell: '.hd li',
		trigger: 'click'
	})
	// 竞猜提交
	$(".slide-guess form .j-submit").click(function(){
		var form = $(this).parents("form");
		form.submit();
	})
	// 竞猜重置
	$(".slide-guess form .j-reset").click(function(){
		var li = $(this).parents("li");
		var input = li.find("[name=guessArr]");
		var result = li.find(".guess-result");
		result.empty();
		input.val("");
		li.find("dd.active").removeClass("active");
	})
	//竞猜选择
	$(".slide-guess .guess-table dd").click(function(){
		var $this = $(this);
		var li = $this.parents("li");
		var result = li.find(".guess-result");
		var maxlength = result.attr("maxlength");
		var input = li.find("[name=guessArr]");
		var v = $this.find(".in p").eq(0).text();

		// 减
		if($this.hasClass("active")){
			var arr = input.val().split("|");
			var index = arr.indexOf(v);
			arr.splice(index, 1);
			input.val(arr.join("|"))
			$this.removeClass("active")
		}else{
			// 加
			if(input.val().length == 0){
				input.val(v);
				$this.addClass("active");
			}else{
				var arr = input.val().split("|");
				if(arr.length >= maxlength){
					alert("最多选择"+maxlength+"个国家");
					return;
				}
				input.val( input.val() + "|" + v );
				$this.addClass("active");
			}
		}

		

		// 显示
		var vArr = input.val().length > 0 ? input.val().split("|") : [];
		var html = "";
		for (var i = 0; i < vArr.length; i++) {
			html += "<span>" + vArr[i] + "</span>";
		}
		result.html(html);

	})


	// ----------------------------- 详情页 ----------------------------- 
	$(".j-btn-apply").click(function(){
		var w = $(window).width();
		w = w < 720 ? w : 700;
		layer.tab({
			area: [ w + 'px', 'auto'],
			shade: [0.6, '#06632b'],
			content: $("#layerApply"),
			title: false
		})
	})
	$(".j-btn-process").click(function(){
		var w = $(window).width();
		w = w < 720 ? w : 700;
		layer.tab({
			area: [w + 'px', 'auto'],
			shade: [0.6, '#06632b'],
			content: $("#layerProcess"),
			title: false
		})
	})
})