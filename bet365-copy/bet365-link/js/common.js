$(function(){
	var clipboard01 = new Clipboard('.fn-link-copy01');
	var clipboard02 = new Clipboard('.fn-link-copy02');
    //优雅降级:safari 版本号>=10,提示复制成功;否则提示需在文字选中后，手动选择“拷贝”进行复制
    clipboard01.on('success', function(e) {
    	showTip('复制成功');
        e.clearSelection();
    });
    clipboard01.on('error', function(e) {
        showTip('复制成功');
    });
    
    clipboard02.on('success', function(e) {
    	showTip('复制成功')
        e.clearSelection();
    });
    clipboard02.on('error', function(e) {
        showTip('复制成功');
    });

    setInterval(function(){
        var num01=Math.ceil(Math.random()*150);
        var num02=Math.ceil(Math.random()*150);
        num01 = num01 < 50 ? (num01+50):num01;
        num02 = num02 < 50 ? (num02+50):num02;
        $('#time01').html(num01);
        $('#time02').html(num02);
    },5000);
    
    function showTip(txt){
    	$("#desc").html(txt);
		$("#show_tip").show().delay(3000).queue(function(){
		    $(this).stop().hide();
		    $("#desc").html('');
		});
		
	};
});
