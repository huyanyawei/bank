$(function () 
 {	
	$("#kjcd li").mouseover(function(){
		$(this).css("cursor","pointer");
		$(this).find("em").css("cursor","pointer");
		$(this).css("background","#FFF");
	});

	$("#kjcd li").mouseout(function(){
		$(this).css("background","");
		$(this).find("em").css("display","inline-block");
		$(this).find("em").css("padding-left","15px");
		$(this).find("em").css("background","url(../../images/ui201401/ddd.png) no-repeat center left");
	});
     
    $("#bg_change").on("click",function(){
	$("#skin_container").slideDown(500,function(){
		$("body").on("click",function(){
	      $("#skin_container").slideUp(500,function(){
			$("body").off();	
			});	
			});	
		});
     });
     
     $skin_container = $("#skin_container");
     $skin_container.on("click", "li",
        function() {
            var _this = $(this);
            $skin_container.find("li").removeClass("on");
            _this.addClass("on");
    		
    		$("#skin_container").slideUp(500);
        });
     /*
      *安全提示
      **/
     function controlShow() {
         var _H = $("body").height();
     }
     
     controlShow();

     $(window).resize(function(e) {
         controlShow();
     });
     
     //判断是否为IE6
     var isIE=!!window.ActiveXObject;
     var isIE6=isIE&&!window.XMLHttpRequest;
     
     //左侧菜单最小长度限制：当左侧菜单小于400px时，设置其长度为400px；
     if($("#leftNav")[0]){
    	 var $height = $("#leftNav").css("height");
    	 var $tmpHeight = parseInt($height.substring(0,$height.length-2));
    	 if($tmpHeight<400){
    		 $("#leftNav").css("height","400px");
    	 }
     }
     
     
    //交易页面初期显示的时候调整左侧菜单与页面背景
    if(($("#mainLeftBox")[0]) &&($("#transaction_content")[0])){
    	//弹出页面没有左侧菜单及主页面，为避免js报错，添加if判断
    	var $nav = $("#mainLeftBox").css("height");
     	var $content = $("#transaction_content").css("height");
     	var $navLen = parseInt($nav.substring(0,$nav.length-2));
     	var $contentLen = parseInt($content.substring(0,$content.length-2));
     	var $tishi = 0;
     	var $tishiLen = 0;
//     	$contentLen = $contentLen - 600;
     	var $len = $contentLen+$tishiLen;
     	if($navLen>$contentLen+$tishiLen){
     		$("#transaction_content").css("height",$nav);
     	}else{
     		$("#mainLeftBox").css("height",$len+"px");
     	}
    }
    
  //点击左侧菜单的时候调整左侧菜单与页面背景
 	var chago=$("#transaction_content").css("height");
 	var fhage=parseInt($("#mainLeftBox").css("height"))+23;

 	$("#transaction_content").css("min-height",fhage+"px");
 	$("#transaction_content").css("_height",fhage+"px");
 	
 	var zxkf=parseInt($("#transaction_content").css("height"));
 	$("#zxkf_img").css("top",zxkf+"px");


 	var ch=$("#transaction_content").css("height");	
 	$("#mainLeftBox div").click(function(){
 		var fh=$("#mainLeftBox").css("height");
 		if(parseInt(fh)<(parseInt(ch))){
 			$("#transaction_content").css("height",ch);
 			$("#zxkf_img").css("top",zxkf+"px");
 		}else{
 			var conheight=parseInt(fh);
 			$("#transaction_content").css("height",conheight+"px");	
 			$("#zxkf_img").css("top",conheight+"px");
 		}
 	});
    
  //修改各交易页面'当前位置'中三级菜单高亮显示
 	var currentText = $("#currentpos").text();
 	var currentArray = currentText.split(">>");
 	var newText = "";
 	if(currentArray != null && currentArray != ""){
 		//是否有一级二级三级菜单
 		if(currentArray.length > 2){
 	 		newText += currentText.split(">>")[0];
 	 		newText += "&nbsp;" + ">>" + "&nbsp;";
 	 		newText += currentText.split(">>")[1];
 	 		newText += "&nbsp;" + ">>" + "&nbsp;";
 	 		newText += "<label class=\"currentText\">";
 	 		newText += currentText.split(">>")[2];
 	 		newText += "</label>";
 	 	//是否只有一级和三级菜单
 	 	} else if(currentArray.length > 1) {
 	 		newText += currentText.split(">>")[0];
 	 		newText += "&nbsp;" + ">>" + "&nbsp;";
 	 		newText += "<label class=\"currentText\">";
 	 		newText += currentText.split(">>")[1];
 	 		newText += "</label>";
 	 	}
 		$("#currentpos").html(newText);
 	};
 	
 	//给页面表格a连接添加class
 	$("div.jmesa a").addClass("jmesaListLink");
 	$("table.result_table a").addClass("jmesaListLink");
 	$("table.m_table a").addClass("jmesaListLink");
 	
 	//给jmesa表格里的右对齐的金额字段添加class：禁止金额字段折行
 	$("div.jmesa div[align=right]").addClass("moneyNowrap");
 	
 });
