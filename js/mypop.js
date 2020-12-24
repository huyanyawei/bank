/*
*	@author yourname
*	@email 
*	@qq 
*   @lastdate 
*   插件功能 描述，代码结构要求
*/

;(function ($) {
    var pluginName = 'myPop',  //定义插件名
  	//插件的参数默认值
    defaults = {
		markAll   : "markall",
		popwrap   : "pop",
		closeBtn  : "popclose",
		callback  : ""
    };

  //... 插件主体功能代码 ...
  $.fn[ pluginName ] = function (options) {
	  
	  
	var settings = $.extend({}, defaults, options);//将参数值合并到默认值
	  
	//主体代码开始
	var that = this,
	    markall = $("<div class='"+settings.markAll +"'></div>").appendTo("body"),
	    popwrap =  $("<div class='"+settings.popwrap +"'></div>"),
	    popclose = $("."+settings.closeBtn);


	popwrap.css({
		"margin-left": "-" + $(that).width()/2+"px",
		"margin-top" : "-" + $(that).height()/2+"px",
	});
	
	markall.height ($("body").height());
		 	
	$(that).wrap($(popwrap));
	$(that).show();

	$(markall).show();
	popwrap.show();
	
	popclose.on("click" , closePop);
	
	
	function closePop(e){ 
		$(markall).remove();
		$(that).unwrap().hide();
		e.stopPropagation();
	};

	 // 斯蒂芬·库里
	
  }
})(jQuery);


