$(function(){
	var redPack=$("#red_pack"),
		showRedPack=$("#show_red_pack"),
		query=$("#query"),
		showQuery=$("#show_query"),
		showAccount=$("#show_account"),
		closeBtn=$(".fn-close"),
		shadeGuoup=$(".fn-shade-guoup"),
		changeElm=$(".fn-change-elm"),
		change=true;
	redPack.on('click',function(){
		showRedPack.show();
	});
	query.on('click',function(){
		showQuery.show();
	});
	closeBtn.on('click',function(){
		shadeGuoup.hide();
	});
	function changeBg(){
		setInterval(function(){
			if(change){
				changeElm.addClass('on');
			}else{
				changeElm.removeClass('on');
			}
			change=!change;
		},200);
	};
	changeBg();
	
	function showTip(txt){
		$("#show_tip").html(txt).show().delay(5000).queue(function(){
		    $(this).stop().hide().html('');
		});
	};
	
	showTip('套用于构建用户界面的渐进式框架。与其它大');
	
})