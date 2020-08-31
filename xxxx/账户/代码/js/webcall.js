
/**
 * 
 * @param hxbtype
 *            50代表个人网银，51代表企业网银，52代表集团结算中心，53代表B2C
 * @param hxbViewerID
 *            用户编号
 * @param hxbname
 *            姓名
 * @param hxbsex
 *            性别 0	男 1	女

 * @param hxbcity
 *            城市
 * @return
 */
  function openChat(hxbtype,hxbViewerID,hxbname,hxbsex,hxbcity,url){
   var hxbcityno='';
	// 写cookie
	var cookie_hxbtype=getCookie("hxbtype");
	if(cookie_hxbtype==null){
		setCookie("hxbtype",hxbtype);
		setCookie("hxbViewerID",hxbViewerID);
		setCookie("hxbname",hxbname);
		
		if(hxbsex == '2' || hxbsex == '1'){
			setCookie("hxbsex",hxbsex);
		}else {
			setCookie("hxbsex","");
		}
		hxbcityno=getCityNo(hxbcity);
		setCookie("hxbcity",hxbcityno);
	}else{
		hxbcityno=getCookie("hxbcity");
	 
	}
	var para=escape("#params:hxbViewerID,")+hxbViewerID+escape(",hxbname,")+encodeURI(hxbname)+escape(",hxbsex,")
	+hxbsex +escape(",hxbcity,")+hxbcityno+escape(",hxbtype,"+hxbtype);
     var reserveKey=para ;
     var urltmp =url+'looyu/chat/p.do?c=1&r='+reserveKey;
       urltmp+="&g="+hxbtype+"&f="+hxbtype;      	
     var param = "height=460,width=690,directories=no," + "location=no,menubar=no," + "resizeable=no,status=no,toolbar=no,top=100,left=200";
     window.open(urltmp, "在线客服",param);
	}
  /**
   * 
   * @param hxbtype
   * hxbname 加密后的用户名 hxbphone加密后的联系电话  
   * 
   */
  function openChatNew(url){   	
	     var param = "height=800,width=1000,directories=no," + "location=no,menubar=no," + "resizeable=no,status=no,toolbar=no,top=100,left=200";
	     window.open(url, "在线客服",param);
		}
/**
 * 获取城市编号
 * @param hxbcity
 * @return
 */
  function getCityNo(hxbcity){
	 
	  var citys="10:北京|20:广州|21:上海|24:沈阳|"          
	  +"25:南京|27:武汉|42:杭州|45:深圳|46:济南|46:聊城|47:石家庄|48:昆明|49:太原|51:大连|54:重庆|11:苏州|12:无锡|15:温州|16:烟台|"         
	  +"17:青岛|13:玉溪|55:成都|56:西安|57:乌鲁木齐|59:福州|58:呼和浩特|61:宁波|63:绍兴|64:常州|62:南宁|60:天津";
	  var cityArray=citys.split("|");
	  for(var i=0;i<cityArray.length;i++){
		  var tmpArray=cityArray[i].split(":");
		  var cityname=tmpArray[1];
		  if(hxbcity.indexOf(cityname)>-1){
			  return tmpArray[0];
		  }
	  }
	  return '';
  } 
 
   
  