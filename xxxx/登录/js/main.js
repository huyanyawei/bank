 
    
	jQuery.fn.center = function () {

        this.css("position", "absolute");
        this.css("top", "50%");
		this.css("left", "21%");
        this.css("margin-top", -($(this).height() / 2));
		this.css("margin-left", -($(this).width() / 2));
        return this;
	};
	$(document).ready(function(){
		
		function loadImage(url, callback) {
	    	var img = new Image(); 
	    	if(img.complete) { 
	        	callback.call(img);
	        	return; 
	    	}
	    	img.onload = function () { 
	        	callback.call(img);
	    	};
			img.src = url;
		};
    //屏蔽鼠标滚轮 + shift || ctrl
    document.onmousewheel = function() {
        if (event.shiftKey) event.returnValue = false;
    };
    
    //登录页5张背景图随机切换
	var countLoginImg = 1;
	var _randomNumber = parseInt(Math.random() * countLoginImg + 1);
	$(".content_bg img").attr('src', "images/loginimg/new-bg-" + _randomNumber + ".jpg");
	
 
	
	$(".form_box_head").attr({"background":"url(images/loginimg/zong_" + _randomNumber + ".png","background-repeat":"no-repeat"});
	$(".form_box_n").attr({"background":"url(images/loginimg/biaodan_bottom_" + _randomNumber + ".png","background-repeat":"no-repeat"});

	//错误提示信息部分
	var info = ($("#errorinfo > span").html());
	if (info == "" || info == null) {
		$("#errorinfo").hide();
		$("#blankDiv").show();
	} else {
		$("#blankDiv").hide();
		$("#errorinfo").show();
	}	  
	    
	//标签切换 别名与经办人切换
	$("img").css({background:"transparent"});

    //按钮变色
    $(".sutre").hover(function(){
        $(this).addClass('ce');
    },function(){
        $(this).removeClass('ce');
    });    
    
    function controlHeight(){
		var _H= $("body").height();
		/*$("#safety-tips").height(_H);*/
	}
    
	controlHeight();
	 
	$(window).resize(function(e) {
		controlHeight();
    });
	
	var _H=$("body").height();
    $("#safety-tips").height(_H);
    
    $('#tipsimg-guanbi').show();
    $('#tipsimg-dakai').hide();
        
	var flag = true;
      
	$(".tipscon").toggle(
    	function(){
    		if (true==flag) {
        		flag = false;
    		//$(this).find("#tipsimg").attr("src","images/loginimg/aqts_a.png");
        	$('#tipsimg-guanbi').hide();
        	$('#tipsimg-dakai').show();
    	     var _H = document.body.scrollHeight && document.documentElement.scrollHeight;
	        $("#tips-bg").height(_H).show();
	        $("#tips-bg").css({background:"none"});
	        $("#safety-tips").animate({'width':550},500,function(){
		    	flag = true;
		      });
	        $("#pwdShow1").hide();
	        $("#pwdShow2").show();
    		}
        },function(){
        	if (true==flag) {
        		flag = false;
            //$(this).find("#tipsimg").attr("src","images/loginimg/aqts.png");
        	$('#tipsimg-guanbi').show();
        	$('#tipsimg-dakai').hide();
            $("#safety-tips").animate({'width':32},500,function(){
            	$("#tips-bg").hide();
            	$("#pwdShow1").show();
                $("#pwdShow2").hide();
		    	  flag = true;
		      });
            
        	}
        });
    
    //新旧网银切换
	$(".denglu_xz_n ul li").click(function(){
		$(this).parent().find('li').removeClass('on');
		$(this).addClass('on');
	
		var theZ = $(this).find('a').data('z');
	
		$("#denglu_xz").attr("value",theZ);
	});

	//网银助手提示
	$(".assant").click(function(){
		window.open("http://www.hxb.com.cn/chinese/upload/HXB_Ebank_Ast.exe");
	});

	$(".foot_nav_2").click(function(){
		window.open("http://www.hxb.com.cn/zh/qybzsm.html");
	});

	$(".foot_nav_3").click(function(){
		window.open("http://www.hxb.com.cn/zh/qydtys.html");
	});
	
	var $tishi = $("#wangyinzhushou");

	var tishi_offset = $tishi.offset();

	$(".net_assistant").css({	
		"left": tishi_offset.left - 88,
		"bottom": "50px"
	});

	$(".tishi_guanbi").click(function(){
		$tishi.removeClass('on');	
		$(".net_assistant").hide();
	});

	/**
	var tipTimer = setTimeout(function(){
		$(".net_assistant").show();
		$tishi.addClass('on');	
	},1500);*/

	$tishi.click(function(){
		if($(this).hasClass('on')){
			$(this).removeClass('on');
			$(".net_assistant").hide();
		}else{
			$(this).addClass('on');
			$(".net_assistant").show();
		}
	});

	//“添加桌面”绑定事件
	$('.toDesktop').click(function() {
	    toDesktop();
	});

	//别名登录与经办人切换的时候绑定事件
	$(".login-bm").click(function(){
		clearErrorMessage();
	});

	//别名登录与经办人切换的时候绑定事件
	$(".login-zjm").click(function(){
		clearErrorMessage();
	});

	//给安全提示中的网银助手绑定弹出窗口
	$(".wangyinzhushou1").click(function(){
		window.open("http://www.hxb.com.cn/chinese/upload/HXB_Ebank_Ast.exe");
	});

	//给安全提示中的常见问题绑定弹出窗口
	$("#changjianwenti").click(function(){
		window.open("http://www.hxb.com.cn/zh/qycjwt.html");
	});

	//给安全提示中的病毒专杀工具绑定弹出窗口
	$("#bingdugongju").click(function(){
		window.open("http://www.hxb.com.cn/chinese/upload/KVOnline.exe");
	});

	//限制验证码长度
	$(".yanzhengma").attr("maxlength", 4);
});