//在窗体加载时自动加载所有菜单
window.onload=initMenu;

//初始化菜单
function initMenu() {
	try{
	    var uls = document.getElementsByTagName("ul");
	    for (i = 0; i < uls.length; i++) {
	        if (uls[i].className == "firstMenuList") {
	        	decorateFirstMenu(uls[i]);
	        }
	    }
		initSecondMenu();
		
		initLeftMenu();
	}catch(ee)
	{
	}	
}

//高亮显示一级菜单
function decorateFirstMenu(menu) {
	try{
		var items = menu.getElementsByTagName("a");
	    var current = getmainurl(document.location.toString());
	    // items.length -1是为了调过对背景切换按扭的处理
	    for (var i=0; i < (items.length -1); i++) {
	        var url = items[i].getAttribute("href");
		        if (current.indexOf(getmainurl(url))==0) 
		        {
		        	//将主菜单选种
		        	items[i].className+=" topMenuSelected";
		        	break;
		        }
	    }
	}catch(ee)
	{
	}
}

//取得所有二级菜单
function initSecondMenu() {
	try{
	    var uls = document.getElementsByTagName("ul");
	    for (i = 0; i < uls.length; i++) {
	        if (uls[i].className == "secondMenuList") {
	        	decorateSecondMenu(uls[i]);
	        }
	    }
	}catch(e)
	{
	}    
}

//高亮显示二级菜单
function decorateSecondMenu(menu) 
{
	try{
	    var items = menu.getElementsByTagName("a");
	    var current = getmainurl(document.location.toString());
	    for (var i=0; i < items.length; i++) 
	    {
	    	var content1 = $(items[i]).text();
	    	if(content1.length <=5){	    		
        		items[i].onmouseover = function(){
        			$(this).addClass('hoverNavFooterBtn');
        		};
        		items[i].onmouseout = function(){
        			$(this).removeClass('hoverNavFooterBtn');
        		};
        	}else if(content1.length>5 && content1.length <8){
        		items[i].onmouseover = function(){
        			$(this).addClass('hoverNavFooterBtnMiddle');
        		};
        		items[i].onmouseout = function(){
        			$(this).removeClass('hoverNavFooterBtnMiddle');
        		};
        	}else if(content1.length>=8 && content1.length <9){
        		items[i].onmouseover = function(){
        			$(this).addClass('hoverNavFooterBtnLong');
        		};
        		items[i].onmouseout = function(){
        			$(this).removeClass('hoverNavFooterBtnLong');
        		};
        	}else{
        		items[i].onmouseover = function(){
        			$(this).addClass('hoverNavFooterBtnLong1');
        		};
        		items[i].onmouseout = function(){
        			$(this).removeClass('hoverNavFooterBtnLong1');
        		};
        	}
	    } 
	    for (var i=0; i < items.length; i++) 
	    {
	    	var url = items[i].getAttribute("href");
	    	var content = $(items[i]).text();
	        if (realurl(url).indexOf(current)==0) 
	        {
	        	if(content.length<=5){
	        		items[i].className+=" selectedNavFooterBtn";
	        	}else if(content.length>5 && content.length <8){
	        		items[i].className+=" selectedNavFooterBtnMiddle";
	        	}else if(content.length>=8 && content.length <9){
	        		items[i].className+=" selectedNavFooterBtnLong";
	        	}else{
	        		items[i].className+=" selectedNavFooterBtnLong1";
	        	}	        	
	        	break;
	        }
	    }
	}catch(ee)
	{
	}     
}

//取得所有左侧菜单
function initLeftMenu() {
	try{
	    var uls = document.getElementsByTagName("ul");
	    for (i = 0; i < uls.length; i++) {
	        if (uls[i].className == "leftMenuList") {
	        	decorateLeftMenu(uls[i]);
	        }
	    }
	}catch(e)
	{
	}    
}

//高亮显示左侧菜单
function decorateLeftMenu(menu) 
{
	
	try{
	    var items = menu.getElementsByTagName("a");
	    var current = realurl(document.location.toString());
	    for (var i=0; i < items.length; i++) 
	    {
	    	var url = items[i].getAttribute("href");
	        if (realurl(url).indexOf(current)==0) 
	        {
	            setCookie("leftMenuSelected", i);
	        	break;
	        }
	    }
	    activateLeftMenu(items);
	}catch(ee)
	{
	}     
}
//激活左侧菜单
function activateLeftMenu(items) {
	try{
	    var menuSelected = getCookie("leftMenuSelected") == null ? 0 : getCookie("leftMenuSelected");
	    items[menuSelected].className+="selected";
	}catch(ee)
	{
	}    
 }
//设置Cookie
function setCookie(name,value,expires,path,domain,secure) {
	try{
	  document.cookie = name + "=" + escape (value) +
	    ((expires) ? "; expires=" + expires.toGMTString() : "") +
	    ((path) ? "; path=" + path : "") +
	    ((domain) ? "; domain=" + domain : "") + ((secure) ? "; secure" : "");
	}catch(ee)
	{
	}

}

//获取Cookie
function getCookie(name) {
	try{
		var prefix = name + "=";
		var start = document.cookie.indexOf(prefix);
		if (start==-1) {
			return null;
		}
		var end = document.cookie.indexOf(";", start+prefix.length);
		if (end==-1) {
			end=document.cookie.length;
		}
		var value=document.cookie.substring(start+prefix.length, end);
		return unescape(value);
	}catch(ee)
	{
	}	
}

//删除Cookie
function deleteCookie(name,path,domain) {
	try{
	  if (getCookie(name)) {
	    document.cookie = name + "=" +
	      ((path) ? "; path=" + path : "") +
	      ((domain) ? "; domain=" + domain : "") +
	      "; expires=Thu, 01-Jan-70 00:00:01 GMT";
	  }
	}catch(ee)
	{
	}
}

//根据ID获取值
if (!document.getElementById) {
    document.getElementById = function() { return null; };
}

//获取URI
function getClearUrl(url) 
{
	try{
		if(url.indexOf('http://')>=0 || url.indexOf('https://')>=0)
		{
			url =  url.substring(url.indexOf('//') + 2);
		}
		if(url.indexOf('/')>=0)
		{
			url =  url.substring(url.indexOf('/'));
		}	
	}catch(e)
	{
	}
	return url;
}

//获取URI的目录
function getmainurl(url) {
	url = getClearUrl(url);
	try{
		return url.substring(0, url.lastIndexOf('/') + 1);
	}catch(e)
	{
		return url;
	}
}


//获取真正的URI
function realurl(url) {
	url = getClearUrl(url);
	try{
		return url.substring(0, url.lastIndexOf('.html') + 5);
	}catch(e)
	{
		return url;
	}
}