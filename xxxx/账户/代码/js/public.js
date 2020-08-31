
//年份选择
	function selectYear(object){               
		txt = document.getElementById(object);
		for(var i=0;i<=txt.length;i++){
			 if(txt.selected){
				 object = txt[i].value;
				 break;
			 }
	  }
		return object;
	}
	
	//月份选择
	function selectMonth(object){             
		txt = document.getElementById(object);
		for(var i=0;i<=txt.length;i++){
			 if(txt[i].selected){
				 var value = txt.value;
				 if(value.length<2){
					 value = "0" + value;
					 }
				 break;
			}
		}
		return value;
	}

	//给年月赋初始值(内部计算头寸查询)
	function yearAndMonth(object,value){                                            
		txt = document.getElementById(object);
	    for(var i=0;i<txt.length;i++){
	        if(txt[i].value == value){
	            var text = txt[i].value;
	            txt.value =text;
	        }
	    }
	}
	//获取页面元素value值
	function getValue(id){
		var obj = document.getElementById(id).value;
		return obj;
	}
	
	// 获取页面元素焦点
	function setFocus(id){
		document.getElementById(id).focus();
	}


	//页面元素赋值
	function setValue(id, value){
		document.getElementById(id).value = value;
	}

	//判断元素值是否为不空
	function isNotNull(value)
	{
		if((value==null)||(value==''))
		{
			return false;
		}
		else
		{
			return true;
		}
	}
	
	//获取值的汉字码格式的长度
	function getLength(value)
	{
		var count = 0;
		if(!isNotNull(value))
		{
			return count;
		}
		for(var i=0;i<value.length;i++)
		{
			if(value.charAt(i).charCodeAt(0)>128)
			{
				count+=2;
			}else
			{
				count+=1;
			}
		}
		return count;
	}

	
	//验证表单元素最小长度
	function checkMinLength(id, minlength)
	{
      if(isNotNull(id))
      {
					var value = getValue(id);
					if(!isNotNull(value))
					{
						//因为为空，最小长度检查不忽略
						return false;
					}
					if(getLength(value)<minlength)
					{
						return false;
					}
					return true;
        }
        else
        {
        	//因为为空，长度检查忽略
			 		return true;
        }
	}
	
	//验证表单元素最大长度
	function checkMaxLength(id, maxlength)
	{
       	if(isNotNull(id))
        {
					var value = getValue(id);
					if(!isNotNull(value))
					{
						//因为为空，长度检查忽略
						return true;
					}
					if(getLength(value)>maxlength)
					{
						return false;
					}
					return true;
        }
        else
        {
        	//因为为空，长度检查忽略
			 return true;
        }
	}

	
	//验证表单元素是否为空
	function isNullMsg(id, msg)
	{
		if(!isNotNull(getValue(id)))
		{
			alert(msg);
			return false;
		}
		else
		{
			return true;
		}
	}

	//验证表单元素最小长度,标签提示错误信息
	function checkMinLengthMsg(id,minlength,msg)
	{
		if(!checkMinLength(id,minlength))
		{
			alert(msg);
			return false;
		}
		else
		{
			return true;
		}
	}
	
	//验证表单元素最大长度,标签提示错误信息
	function checkMaxLengthMsg(id,maxlength,msg)
	{
		if(!checkMaxLength(id,maxlength))
		{
			alert(msg);
			return false;
		}
		else
		{
			return true;
		}
	}

	/**
	*检查指定id的是否非空，是否小于最小长度，是否大于自小长度
	*	isLimitNull  true:验证是否为空；false：不验证
	*	minLength	0：不进行最小长度验证
	*	maxLength	0：不进行最大长度验证
	*/
	function checkElement(id,nameTitle,isLimitNull,minLength,maxLength)
	{   
		var msg = '';
		if(isLimitNull)
		{
			msg = nameTitle + "的值不能为空！";
			if(!isNullMsg(id, msg))
			{
				setFocus(id);
				return false;
			}
		}
		if(minLength>0)
		{
			msg = nameTitle + "的值不能小于" + minLength+"位长度！";
			if(!checkMinLengthMsg(id, minLength, msg))
			{
				setFocus(id);
				return false;
			}
		}
		if(maxLength>0)
		{
			msg = nameTitle + "的值不能大于" + maxLength+"位长度！";
			if(!checkMaxLengthMsg(id, maxLength, msg))
			{
				setFocus(id);
				return false;
			}
		}
		return true;
	}
	
	/**
	*检查指定id的是否非空，是否小于最小长度，是否大于自小长度,标签将焦点设置到原焦点
	*	isLimitNull  true:验证是否为空；false：不验证
	*	minLength	0：不进行最小长度验证
	*	maxLength	0：不进行最大长度验证
	*/
	function checkElementFocus(id,nameTitle,isLimitNull,minLength,maxLength)
	{   
		var msg = '';
		if(isLimitNull)
		{
			msg = nameTitle + "的值不能为空！";
			if(!isNullMsg(id, msg))
			{
				setFocus(id);
				return false;
			}
		}
		if(minLength>0)
		{
			msg = +nameTitle + "的值不能小于" + minLength+"位长度！";
			if(!checkMinLengthMsg(id, minLength, msg))
			{
				setFocus(id);
				return false;
			}
		}
		if(maxLength>0)
		{
			msg = nameTitle + "的值不能大于" + maxLength+"位长度！";
			if(!checkMaxLengthMsg(id, maxLength, msg))
			{
				setFocus(id);
				return false;
			}
		}
		return true;
	}

	/**
	*	检查指定ids 集合的页面元素值是否非空，是否小于最小长度，是否大于自小长度
	*	isLimitNulls集合元素  true:验证是否为空；false：不验证
	*	minLengths  集合元素	0：不进行最小长度验证
	*	maxLengths  集合	元素0：不进行最大长度验证
	*   errorStop   检查到一个错误 时是否继续检查 ,true,false,default = false;
	*/
	function checkElements(ids,nameTitles,isLimitNulls,minLengths,maxLengths,errorStop)
	{
		
		var error = false;
		if((errorStop!=null)&&(errorStop!=''))
		{
			errorStop = true;
		}
		
		if((ids!=null)&&(ids!=''))
		{
			for(var i=0;i<ids.length;i++)
			{
				var ret = checkElement(ids[i],nameTitles[i],isLimitNulls[i],minLengths[i],maxLengths[i]);
				if((!ret)&&!error)
				{
					error = true;
				}
				if(errorStop&&error)
				{
					break;
				}
			}
		}
		return error;
	}

	/**
	*检查指定id的是否非空
	*	isLimitNull  true:验证是否为空；false：不验证
	*/
	function checkElementNull(id,nameTitle,isLimitNull)
	{
		return checkElement(id,nameTitle,isLimitNull,0,0);
	}

	/**
	*检查指定id的值是否小于最小长度
	*	minLength	0：不进行最小长度验证
	*/
	function checkElementMinLen(id,nameTitle,minLength)
	{
		return checkElement(id,nameTitle,false,minLength,0);
	}

	/**
	*检查指定id的是否大于自小长度
	*	maxLength	0：不进行最大长度验证
	*/
	function checkElementMaxLen(id,nameTitle,maxLength)
	{
		return checkElement(id,nameTitle,false,0,maxLength);
	}

	//设置表单元素域显示或隐藏 	 flag==true:显示；flag==false:隐藏;
	function setDisplay(id, flag){
		if(flag == true){
			document.getElementById(id).style.display=""; 
		}else{
			document.getElementById(id).style.display="none"; 
		}
	}

	//根据表单元素id集合，返回id所对应的value集合
	function getMoreElement(elems){
		if((elems==null)&&(elems!=''))
		{
			return '';
		}
		var arrayList = new Array(elems.length);
		for(var i=0; i<elems.length; i++){
			try{
			arrayList[i] = getValue(elems[i]);
			}catch(e){}
		}
		return arrayList;
	}

	/*
	*对表单元素指定id集合，做赋值操作
	*elems,需要赋值的元素id集合
	*values,需要赋值的元素的值	
	*/
	function setMoreElement(elems,values)
	{
		if((elems!=null)&&(values!=null))
		{
			for(var i=0; i<elems.length; i++)
			{
				try{
					setValue(elems[i],values[i]);
				}catch(e1){
					setValue(elems[i],'');
				}
			}
		}
	}	
	
	/**
	 * 对数组进行分离
	 * @param input
	 * @param totalCol
	 * @param findCol
	 * @param findValue
	 * @return
	 */
	function getTransData(input, totalCol, findCol, findValue)
	{       
			//input = decode64(input);
			var totalArray = input.split("~#");
			retInfo=new Array(totalCol);
			running = 1;
			try{
				for(var i=0;(i<totalArray.length -1 )&&(running>0);)
				{
					for(var j=0;j<totalCol;j++)
					{
						if(j==(findCol-1))
						{
							if (totalArray[i+j] == findValue)
							{
								for(var k=0;k<totalCol;k++)
								{
									retInfo[k] = totalArray[i+k];
								}
								running= 0;
								break;
							}
						}
					}
				 	i+=totalCol;
			 	}
			}catch(e)
			{
			}
			var getTransData = retInfo;
			return getTransData;
	}  

	/**
	 * @deprecated 对语言进行切换
	 * @param {String} 语言
	 **/
	function changeLanguage(language) {
		if(document.getElementById('languageForm').action != '') {
			if(confirm("在此页面切换语言将会跳转至该交易的首页，当前交易数据将会丢失，是否确定要切换？")) {
				document.getElementById('languageForm').siteLanguage.value = language;
				document.getElementById('languageForm').submit();
			}
		}else {
			document.getElementById('languageForm').siteLanguage.value = language;
			document.getElementById('languageForm').submit();
		}
	}

	/**
	 * @deprecated对金额进行转换，将金额转换为以分为单位
	 * 例：输入域1234，转换后隐含域为123400
	 * @param {String} 表单名称
	 * @param {String} 要转换的金额;label
	 * @param {String} 金额隐藏域名称
	 */
	 function formatMoney(formName,txtmoney,hidmoney){
	     var tonumber;
	     var sign = "1";//符号1：正；0：负
	     var re = /,/g;
	     var txt_money = eval("document."+formName+"."+txtmoney);
	     var hid_money = eval("document."+formName+"."+hidmoney);
	     if (txt_money.value != ""){
	     	var temp = trim(txt_money.value);
	     	if (temp == ""){
	     		temp = 0;
	     	}
	     }
	     tonumber = addZero((trim(txt_money.value)).replace(re,""));
	
	     txt_money.value = "";
	     hid_money.value = "";
	     if (tonumber !="" && tonumber!=null){
	    		rep = / /g;
	 		var amt = tonumber.replace(rep,"");
	
	 		re = /,/g;
	 		var amt1 = amt.replace(re,"");
	 		var amt2=parseFloat(amt1);		
	 		if(amt2<0){
	     		sign = "0";
	     		amt1 = amt1.substring(1, amt1.length);
	 		}
	 		for(var j = 0; j < amt1.length; j++){
	 			if(isNaN(parseInt(amt1.charAt(j),10)) && amt1.charAt(j)!="," && amt1.charAt(j)!=".") {
	 				alert("非法金额!");
	 				txt_money.value="";
	 				hid_money.value="";
	 				return;
	 			}
	 		}
	 		if(amt1.indexOf(".")!=amt1.lastIndexOf(".")){
	 			alert("非法金额!");
	 			return;
	 		}
	 	
	 		
	 		//大于0的正数;
	 			if(amt1.indexOf(".")!=-1){				
	 				var str = amt1.substr(amt1.indexOf(".")+1);				
	 				if(str.length>2){
	 					alert("非法金额!");
	 					return;
	 				}else if(str.length==1){
	 					amt1=amt1 + "0";
	 				}else if(str.length<1){
	 					amt1=amt1 + "00";
	 				}
	 			}else{
	 				amt1=amt1 + ".00";
	 			}
	 			if(amt1.charAt(0)=='0' && amt1.indexOf(".")!=1){
	    			alert("非法金额!");
	 				return;
	 			}
	 			hid_money.value=amt1;
	 			var temp=amt1.substring(0,amt1.indexOf("."));
	 			if(sign == "1"){
	    			txt_money.value=comma(temp) + amt1.substring(amt1.indexOf("."));
	 	   		}else{
	    			txt_money.value= "-" + comma(temp) + amt1.substring(amt1.indexOf("."));
	 	   	   	}
	 			return;							
	     }
	 }
 
	/**
	 * @deprecated 对输入的账号进行是否是数字的校验
	 * @param acctno
	 * @return false表示传入的账号不是数字 true反之
	 */
	function validateNumber(acctno)
	{
	   var patrn=/^[0-9]*$/;  
	   if(!patrn.exec(acctno))
	   {   
	 	  return false;   
	   }
	   return true;
	}
	/**
	 * 
	 * */
	function validateFTorNRAacctno(acctno) {
		if(validateNumber(acctno)==false){
			acctno = acctno.toUpperCase();
		}else{
			return false;
		}
	if (acctno == "FTE" || acctno == "FTN" || acctno == "FTI" || acctno == "FTF"
			|| acctno == "FTU" || acctno == "NRA" || acctno == "ZMQ") {
		return true;
	} else {
		return false;
	}
}
	
	/**
	 * CR2172-B 不支持FT账户
	 * @param acctno
	 * @returns {Boolean}
	 */
	function validateFTnotSupport(acctno){
		if(validateNumber(acctno)==false){
			acctno = acctno.toUpperCase();
		}else{
			return false;
		}
		if (acctno == "FTE" || acctno == "FTN" || acctno == "FTI" || acctno == "FTF"
			|| acctno == "FTU" || acctno == "ZMQ") {
			return true;
		} else {
			return false;
		}
	}
	/**
	 * @deprecated 对传入的账号进行是否是数字且账号的长度不能超过32位
	 * @param acctno
	 * @return false表示传入的账号没有通过校验 true反之
	 */
	function validateAcctno(acctno)
	{
		var patrn=/^[0-9]*$/;  
		if(!patrn.exec(acctno))
		{   
			return false;   
		}
		
		if(acctno.length > 32){
			return false;  
		}
		return true;
	}
	
	/**
	 * 对传入的账号进行是否是数字字母的检验（查询更多收款人用）
	 * @param acctno
	 * @return false表示传入的账号没有通过校验 true反之
	 */
	function validateAcctnoMore(acctno)
	{
		var patrn=/^[0-9A-Za-z]*$/;  
		if(!patrn.exec(acctno))
		{   
			return false;   
		}
		return true;
	}
	
	/**
	 * @deprecated 对传入的账号进行是否是数字和-组合，且账号的长度大于等于10位小于等于32位
	 * @param acctno
	 * @return false表示传入的账号没有通过校验 true反之
	 */
	function validatecashAcctno(acctno)
	{
		var patrn=/^[0-9-]*$/;  
		if(!patrn.exec(acctno))
		{   
			return false;   
		}
		
		if(acctno.length > 32){
			return false;  
		}
		if(acctno.length < 10){
			return false;  
		}
		return true;
	}

	/**
	 * @deprecated 对输入的acctname进行校验，字符最大长度不能大于60位，且中间不能包含一个或两个空格
	 * @param acctname
	 * @return false表示传入的acctname没有通过校验 true反之
	 */
	function validateAcctname(acctname)
	{
	   //var patrn=/^[0-9]*$/;  
		
		  var regu =  /[\#|＃|\/|／|\:|：|\%|％|\\|＼|\'|＇|’|\"|\||＼]/g ;
		  if(regu.test(acctname)){
		    	return false;
		   }
		    
	   if(checkStrMaxLength(acctname,60) == false){
		   return false;  
	   }
	   
	   var regu1 = /^\s.*$|^.*\s$/;
	   if(regu1.test(acctname)){		 
	    	return false;
	   }
//	   if (acctname.indexOf(" ") != -1 || acctname.indexOf("　") != -1)
//	   {
//		   return false;
//	   }
	   return true;
	}

	/**
	 * CR2411 ADD
	 * @deprecated 对输入的acctname进行校验，字符最大长度不能大于maxlength位，且中间不能包含一个或两个空格
	 * @param acctname
	 * @return false表示传入的acctname没有通过校验 true反之
	 */
	function validateAcctnameLength(acctname,maxlength)
	{
		  var regu =  /[\#|＃|\/|／|\:|：|\%|％|\\|＼|\'|＇|’|\"|\||＼]/g ;
		  if(regu.test(acctname)){
		    	return false;
		   }
		    
	   if(checkStrMaxLength(acctname,maxlength) == false){
		   return false;  
	   }
	   
	   var regu1 = /^\s.*$|^.*\s$/;
	   if(regu1.test(acctname)){		 
	    	return false;
	   }
	   return true;
	}
	
	/**IR0073807收款人允许录入#＃
	 * @deprecated 对输入的acctname进行校验，字符最大长度不能大于60位，且中间不能包含一个或两个空格
	 * @param acctname
	 * @return false表示传入的acctname没有通过校验 true反之
	 */
	function validateAcctname4SpanTrans(acctname)
	{
		var regu =  /[\/|／|\:|：|\%|％|\\|＼|\'|＇|’|\"|\||＼]/g ;
		if(regu.test(acctname)){
			return false;
		}
		
		if(checkStrMaxLength(acctname,60) == false){
			return false;  
		}
		
		var regu1 = /^\s.*$|^.*\s$/;
		if(regu1.test(acctname)){		 
			return false;
		}
		return true;
	}
	
	/**IR0073807收款人允许录入#＃
	 * @deprecated 对输入的acctname进行校验，字符最大长度不能大于maxlength位，且中间不能包含一个或两个空格
	 * @param acctname
	 * @return false表示传入的acctname没有通过校验 true反之
	 */
	function validateAcctnameLength4SpanTrans(acctname,maxlength)
	{
		var regu =  /[\/|／|\:|：|\%|％|\\|＼|\'|＇|’|\"|\||＼]/g ;
		if(regu.test(acctname)){
			return false;
		}
		
		if(checkStrMaxLength(acctname,maxlength) == false){
			return false;  
		}
		
		var regu1 = /^\s.*$|^.*\s$/;
		if(regu1.test(acctname)){		 
			return false;
		}
		return true;
	}

	/**
	 * 对输入的abstract1进行校验，字符最大长度不能大于24位
	 * @param abstract1
	 * @return false表示传入的abstract1没有通过校验 true反之
	 */
	function validateAbstract24(abstract1)
	{
	   if(abstract1 == ""||abstract1==null){
		   return true;
	   }
	   if(!validateSpecialChar(abstract1)){
		   return false;
	   }
	   if(checkStrMaxLength(abstract1,24) == false){
 		   return false;  
 	    }
	   return true;
	}
	
	function groupvdateAbstract40(abstract1)
	{
	   if(abstract1 == ""||abstract1==null){
		   return true;
	   }
	   if(!validateSpecialChar(abstract1)){
		   return false;
	   }
	   if(checkStrMaxLength(abstract1,40) == false){
 		   return false;  
 	    }
	   return true;
	}

	/**
	 * Huancs20100221
	 * @param abstract1
	 * @param lengthnum
	 * @return
	 */
	function validateAbstractWithLength(abstract1,maxlength)
	{
	   if(!validateSpecialChar(abstract1)){
		   return false;
	   }
	   if(checkStrMaxLength(abstract1,maxlength) == false){
		   return false;  
	   }
	   return true;
	}
	
	/**
	 * 传入的字符串不能包含特殊字符 #*:%\?+
	 * 这个是用于 "用途" 的
	 * @param str
	 * @return false表示传入的str没有通过校验 true反之
	 * @author likun
	 */
	function validateSpecialChar(str)
	{
	   var regu =  /[\?|\+|\#|\*|\:|\%|\\'"]/ ;
	   return !regu.test(str);
	}

	/**
	 * @deprecated 对输入的str进行校验 str可以为空，当不为空时检查str是否为长度在1到13位之间的数字
	 * @param str
	 * @return false表示传入的str没有通过校验 true反之
	 */
	function validateBatchNo(str)
	{
	    if (str == "")
	    {
	        return true;
	    }
	    pattern = /^[0-9]{1,14}$/;
	    if(!pattern.exec(str))
		   {   
	  	  return false;  
	    }  
		   return true;
	}

	/**
	 * @deprecated 对输入的openbankname进行校验，字符最大长度不能大于60位
	 * @param openbankname
	 * @return false表示传入的openbankname没有通过校验 true反之
	 */
	function validateOpenBankName(openbankname)
	{
	   var patrn=/^[0-9]*$/;  
	  
	   if(checkStrMaxLength(openbankname,60) == false){
		   return false;  
	   }
	   return true;
	}

	/**
	 *
	 用途：检查输入字符串是否只由汉字英文字母和数字组成
	 输入：batchname 待验证的值
	 返回：
	  如果通过验证返回true,否则返回false 
	 */
	
	function validateBatchName(batchname)
	{
		if (batchname == "")
	    {
	        return true;
	    }
		var regu = "^[0-9\a-zA-Z\u4e00-\u9fa5]+$";
		var re = new RegExp(regu);
		if (re.test(batchname)) {
			 if(checkStrMaxLength(batchname,40) == false){
				 return false;  
			 }
		}else{
		    return false;
		}
	   return true;
	}

	/**
	 * @deprecated 对输入的elem和maxlength进行校验，如果字符的长度大于maxlength返回false，即没通过校验
	 * @param elem
	 * @param maxlength
	 * @return false表示没有通过校验 true反之
	 */
	function checkStrMaxLength(elem, maxlength){
		var count = 0;
		for(var i=0;i<elem.length;i++){
			if(elem.charAt(i).charCodeAt(0)>128){
				count+=2;
			}else
			{
				count+=1;
			}
		}
		if(count>maxlength){
			return false;
		}
		return true;
	}

	/**
	 * @deprecated 对输入的elem和maxlength进行校验，如果字符的长度大于maxlength返回false，即没通过校验
	 * @param elem
	 * @param maxlength
	 * @return false表示没有通过校验 true反之
	 */
	function checkStrNull(elem, maxlength){
		var count = 0;
		for(var i=0;i<elem.length;i++){
			if(elem.charAt(i).charCodeAt(0)>128){
				count+=2;
			}else
			{
				count+=1;
			}
		}
		if(count>maxlength){
			return false;
		}
		return true;
	}

	/**
	 * @deprecated 对输入的elem和minlength进行校验，如果字符的长度小于minlength返回false，即没通过校验
	 * @param elem
	 * @param minlength
	 * @return false表示没有通过校验 true反之
	 */
	function checkStrMinLength(elem, minlength){
		var count = 0;
		for(var i=0;i<elem.length;i++){
			if(elem.charAt(i).charCodeAt(0)>128){
				count+=2;
			}else
			{
				count+=1;
			}
		}
		if(count<minlength){
			return false;
		}
		return true;
	}

	/**
	 * @deprecated 生成表单
	 * @param name
	 * @param id
	 * @param action
	 * @param method
	 * @return 表单
	 */
	function createForm(name, id, action, method) {
		var form = document.createElement('form');
		form.name = name;
		form.id = id;
		form.action = action;
		form.method = method;
		return form;
	}

	/**
	 * @deprecated 生成一个隐藏域，该隐藏域的name及value为传入的值
	 * @param name
	 * @param value
	 * @return field
	 */
	function createHiddenInput(name, value) {
		var field = document.createElement('input');
		field.type = 'hidden';
		field.name = name;
		field.id = name;
		field.value = value;
		return field;
	}

	/**
	 * @deprecated 对表单进行测试，把表单的id，action及元素的name以及value弹出
	 * @param form
	 * @return alert
	 */
	function debugForm(form) {
		var value = '';
		var eles = form.elements;
		var i = 0;
		value += 'id = ' + form.id + '\n';
		value += 'action = ' + form.action + '\n';
		for(; i < eles.length; i ++) {
			value += 'name = ' + eles[i].name + ', value = ' + eles[i].value + '\n';
		}
		alert(value);
	}

	//系统翻页处理
	function onInvokeAction(id) {

		//对系统翻页部分做不重复做交易的处理
		var form = document.getElementById(id + "Form");
		document.getElementById(id + "Form").appendChild(createHiddenInput('_jmesa_items', id));
		setExportToLimit(id, '');
		createHiddenInputFieldsForLimitAndSubmit(id);
	}


	function jmesaDoAction(id,url,clear) {
		var parameterString = createParameterStringForLimit(id);
		var form = document.getElementById(id + "Form");
		parameterString += '&_jmesa_items=' + id;
		parameterString += '&_jmesa_caption_value=' + form._jmesa_caption_value.value;
		parameterString += '&_jmesa_column_prop=' + form._jmesa_column_prop.value;
		parameterString += '&_jmesa_column_title=' + form._jmesa_column_title.value;
		parameterString += '&_jmesa_column_widths=' + form._jmesa_column_widths.value;	
		parameterString += '&_jmesa_column_aligns=' + form._jmesa_column_aligns.value;	
		parameterString += '&_jmesa_column_prints=' + form._jmesa_column_prints.value;	
		parameterString += '&_jmesa_column_filter=' + form._jmesa_column_filter.value;		
		parameterString += '&_jmesa_column_appcodetypes=' + form._jmesa_column_appcodetypes.value;		
		if(clear)
		{
			parameterString += '&_jmesa_clear_=true';	
		}
		
		var tmpForm = createForm("onInvokeExportSubmitForm", "onInvokeExportSubmitForm", url, "post");
		var params = parameterString.split("&");
		var i = 0;
		for(; i < params.length; i ++) {
			var param = params[i].split("=");
			var value = param.length == 2 ? param[1] : '';
			tmpForm.appendChild(createHiddenInput(param[0], value));
		}
		document.getElementsByTagName("body")[0].appendChild(tmpForm);
		tmpForm.submit();
	}

	function onInvokeExportAction(id) {
		var parameterString = createParameterStringForLimit(id);
		var form = document.getElementById(id + "Form");
		parameterString += '&_jmesa_items=' + id;
		parameterString += '&_jmesa_caption_value=' + form._jmesa_caption_value.value;
		parameterString += '&_jmesa_column_prop=' + form._jmesa_column_prop.value;
		parameterString += '&_jmesa_column_title=' + form._jmesa_column_title.value;
		parameterString += '&_jmesa_column_widths=' + form._jmesa_column_widths.value;	
		parameterString += '&_jmesa_column_aligns=' + form._jmesa_column_aligns.value;	
		parameterString += '&_jmesa_column_prints=' + form._jmesa_column_prints.value;		
		parameterString += '&_jmesa_column_filter=' + form._jmesa_column_filter.value;		
		parameterString += '&_jmesa_column_appcodetypes=' + form._jmesa_column_appcodetypes.value;		
		
		var tmpForm = createForm("onInvokeExportSubmitForm", "onInvokeExportSubmitForm", form.action, "post");
		var params = parameterString.split("&");
		var i = 0;
		for(; i < params.length; i ++) {
			var param = params[i].split("=");
			var value = param.length == 2 ? param[1] : '';
			tmpForm.appendChild(createHiddenInput(param[0], value));
		}
		document.getElementsByTagName("body")[0].appendChild(tmpForm);
		tmpForm.submit();
	}

	/**
	 * @deprecated 对输入的url进行提交
	 * @param url
	 * @return 
	 */
	function go(url) {
		var loc = url;
		if(arguments.length > 1) {
			var i = 1; 
			var params = '';
			for(; i < arguments.length; ) {
				params += arguments[i] + '=' + arguments[i+1] + '&';
				i += 2;
			}
			
			if(url.indexOf("?") == -1) {
				if(url.indexOf("&") == 1){
				}else{
				  loc += "?" + params;
				}
			}else {
				loc += "&" + params;
			}
		}
		if((loc.indexOf("?") <0)&&(loc.indexOf("&") >0)) {
			loc = loc.replace("&","?");
		}
		window.location = loc;
	}

	function showError() {
		var msg = '对不起，您输入的数据有以下异常，请更正后重新提交请求：\n\n';
		var i = 1;
		var flag = false;
		for(; i <= arguments.length; i ++) {
			if(arguments[i-1] != '') {
				msg += (i + ". " + arguments[i] + '\n');
				flag = true;
			}
		}
		if(flag) {
			alert(msg);
		}
	}

	/**
	 * 校验输入的s是否是浮点型
	 * @param s
	 * @return s
	 */
	function isFloat( s )
	{
		var isFloat = RegExp(/^([0-9]+(\.+))[0-9]+$/);
		return ( isFloat.test(s) );
	}

	/**
	* 取得指定的checkbox复选框的选中值，使用delim作为分隔符拼接成一个串
	* @param {String} radio按钮ID
	* @return {String} radio按钮的选中值
	*/
	function getCheckBoxValue(selectName, delim) {
		var selectList = document.getElementsByName(selectName);
		var retValue = '';
		if(typeof selectList != 'undefined' && selectList.length) {
			for (var i = 0; i < selectList.length; i++)
			{
				if( selectList[i].checked == true )
				{
					retValue = retValue + selectList[i].value + delim;
				}
			}
			retValue = retValue.substring(0, retValue.length-delim.length);
		}else {
			retValue = (selectList.checked ? selectList.value : '');
		}
		return retValue;
	}

	function setCheckBoxValue(selectName, valueMap) {
		var selectList = document.getElementsByName(selectName);
		if(selectList && selectList.length) {
			for (var i = 0; i < selectList.length; i++)
			{
				if( selectList[i].value == valueMap[selectList[i].value] )
				{
					selectList[i].checked = true;
				}
			}
		}else {
			selectList.checked = (selectList.value == valueMap[selectList.value]);
		}
	}

	/**
	* 取得指定的radio按钮的选中值
	* @param {String} radio按钮ID
	* @return {String} radio按钮的选中值
	*/
	function getRadioValue(radioName)
	{	
		var radioList = document.getElementsByName(radioName);
		if(radioList.length) {
			for (var i = 0; i < radioList.length; i++)
			{
				if( radioList[i].checked == true )
				{
					return radioList[i].value;
				}
			}
		}else {
			return (radioList.checked ? radioList.value : '');
		}
		return '';
	}

	function setRadioValue(radioName, value) {
		var radioList = document.getElementsByName(radioName);
		if(radioList.length) {
			for (var i = 0; i < radioList.length; i++)
			{
				radioList[i].checked = radioList[i].value == value;
			}
		}else {
			radioList.checked = radioList.value == value;
		}
	}

	function array2Map(array) {
		var map = new Object();
		var i = 0;
		for(; i < array.length; i ++) {
			map[array[i]] = array[i];
		}
		return map;
	}

	function removeFormInput(formName, inputPrefix) {
		var form = document.getElementById(formName);
		var eles = form.elements;
		var i = 0;
		for(; i < eles.length; i ++) {
			if(eles[i].id.indexOf(inputPrefix) != -1) {
				form.removeChild(eles[i]);
			}
		}
	}

	function addParam(url, name, value) {
		var i = 1; 
		var params = '';
		for(; i < arguments.length; ) {
			params += arguments[i] + '=' + arguments[i+1] + '&';
			i += 2;
		}
		
		if(url.indexOf("?") == -1) {
			return url + "?" + params;
		}else {
			return url + "&" + params;
		}
	}

	/**
	* 去掉字符串前后的空格
	* @param {String} 字符串
	* @return {String} 去除空格后的字符串
	*/
	function trim(param) {
		if ((vRet = param) == '') { return vRet; }
		while (true) {
			if (vRet.indexOf (' ') == 0) {
				vRet = vRet.substring(1, parseInt(vRet.length));
			} else if ((parseInt(vRet.length) != 0) && (vRet.lastIndexOf (' ') == parseInt(vRet.length) - 1)) {
				vRet = vRet.substring(0, parseInt(vRet.length) - 1);
			} else {
				return vRet;
			}
		}
	}

	/**
	* 在小数点前面自动补0(例如：".25" 自动转换成"0.25")
	* @param {String} 需要转换的字符串
	*/
	function addZero(txtmoney) {
		if(txtmoney.charAt(0) == ".") {
			txtmoney = "0" + txtmoney;
		}
		return txtmoney;
	}
	/**
	* 对金额进行转换，将金额转换为以元为单位，小数点后有两位
	* 例：输入域1234，转换后隐含域为1234.00
	* @param {String} 表单名称
	* @param {String} 要转换的金额输入框名称
	* @param {String} 金额隐藏域名称
	*/
	function convertMoney(formName,txtmoney,hidmoney){
	    var tonumber;
	    var re = /,/g;
	    var txt_money = eval("document."+formName+"."+txtmoney);
	    var hid_money = eval("document."+formName+"."+hidmoney);
	    if (txt_money.value != ""){
	    	var temp = trim(txt_money.value);
	    	if (temp == ""){
	    		alert("请输入正确的金额数字!");
	    		txt_money.value="";
					hid_money.value="";
					txt_money.focus();
	    		return;
	    	}
	    }
	    tonumber = addZero((trim(txt_money.value)).replace(re,""));
	
	    txt_money.value = "";
	    hid_money.value = "";
	   if (tonumber !="" && tonumber!=null){
	   	rep = / /g;
			var amt = tonumber.replace(rep,"");
			
			for(var j = 0; j < amt.length; j++){
				if(isNaN(parseInt(amt.charAt(j),10)) && amt.charAt(j)!="," && amt.charAt(j)!=".") {
					alert("请输入正确的金额数字!");
					txt_money.value="";
					hid_money.value="";
					txt_money.focus();
					return;
				}
			}
			if(amt.indexOf(".")!=amt.lastIndexOf(".")){
				alert("请输入正确的金额数字!");
				txt_money.focus();
				return;
			}
		
			re = /,/g;
			var amt1 = amt.replace(re,"");
	
			var amt2=parseFloat(amt1);		
			if(amt2<=0){
				alert("输入的金额不能小于或等于零,请重新输入!");
				txt_money.focus();
				return;
			}else{		//大于0的正数;
				if(amt1.indexOf(".")!=-1){				
					var str = amt1.substr(amt1.indexOf(".")+1);				
					if(str.length>2){
						alert("输入的金额小数点后只能保留两位,请重新输入!");
						txt_money.focus();
						return;
					}else if(str.length==1){
						amt1=amt1 + "0";
					}else if(str.length<1){
						amt1=amt1 + "00";
					}
				}else{
					amt1=amt1 + ".00";
				}
				if(amt1.charAt(0)=='0' && amt1.indexOf(".")!=1){
				alert("请输入正确的金额数字!");
				txt_money.focus();
				return;
				}
				hid_money.value=amt1;
				var temp=amt1.substring(0,amt1.indexOf("."));
				if (temp.length > 14 || amt1 > '99999999999999.99'){
				    alert("输入的金额太大，请重新输入!");
				    txt_money.focus();
				    return;
				}
				txt_money.value=comma(temp) + amt1.substring(amt1.indexOf("."));
				return;							
			}
	    }
	}
	
	/**
	* 对金额进行转换，将金额转换为以元为单位，小数点后有两位，最大金额可通过maxmoney传入
	* 例：输入域1234，转换后隐含域为1234.00
	* @param {String} 表单名称
	* @param {String} 要转换的金额输入框名称
	* @param {String} 金额隐藏域名称
	* @param {String} 允许金额的最大值
	*  
	*/
	function convertMoneyLong(formName,txtmoney,hidmoney,maxmoney){
	    var tonumber;
	    var re = /,/g;
	    var txt_money = eval("document."+formName+"."+txtmoney);
	    var hid_money = eval("document."+formName+"."+hidmoney);
	    if (txt_money.value != ""){
	    	var temp = trim(txt_money.value);
	    	if (temp == ""){
	    		alert("请输入正确的金额数字!");
	    		txt_money.value="";
					hid_money.value="";
					txt_money.focus();
	    		return;
	    	}
	    }
	    tonumber = addZero((trim(txt_money.value)).replace(re,""));
	
	    txt_money.value = "";
	    hid_money.value = "";
	   if (tonumber !="" && tonumber!=null){
	   	rep = / /g;
			var amt = tonumber.replace(rep,"");
			
			for(var j = 0; j < amt.length; j++){
				if(isNaN(parseInt(amt.charAt(j),10)) && amt.charAt(j)!="," && amt.charAt(j)!=".") {
					alert("请输入正确的金额数字!");
					txt_money.value="";
					hid_money.value="";
					txt_money.focus();
					return;
				}
			}
			if(amt.indexOf(".")!=amt.lastIndexOf(".")){
				alert("请输入正确的金额数字!");
				txt_money.focus();
				return;
			}
		
			re = /,/g;
			var amt1 = amt.replace(re,"");
	
			var amt2=parseFloat(amt1);		
			if(amt2<=0){
				alert("输入的金额不能小于或等于零,请重新输入!");
				txt_money.focus();
				return;
			}else{		//大于0的正数;
				if(amt1.indexOf(".")!=-1){				
					var str = amt1.substr(amt1.indexOf(".")+1);				
					if(str.length>2){
						alert("输入的金额小数点后只能保留两位,请重新输入!");
						txt_money.focus();
						return;
					}else if(str.length==1){
						amt1=amt1 + "0";
					}else if(str.length<1){
						amt1=amt1 + "00";
					}
				}else{
					amt1=amt1 + ".00";
				}
				if(amt1.charAt(0)=='0' && amt1.indexOf(".")!=1){
				alert("请输入正确的金额数字!");
				txt_money.focus();
				return;
				}
				hid_money.value=amt1;
				var temp=amt1.substring(0,amt1.indexOf("."));
				var maxtemp= maxmoney.substring(0,maxmoney.indexOf("."));
				if (temp.length > maxtemp.length || amt1 > maxmoney){
				    alert("输入的金额太大，请重新输入!");
				    txt_money.focus();
				    return;
				}
				txt_money.value=comma(temp) + amt1.substring(amt1.indexOf("."));
				return;							
			}
	    }
	}
	
	/**
	* 对接口返回（接口返回的金额可以为空）的金额进行转换，将金额转换为以元为单位，小数点后有两位
	* 例：输入域1234，转换后隐含域为1234.00 
	* @param {String} 表单名称
	* @param {String} 要转换的金额输入框名称
	* @param {String} 金额隐藏域名称
	*/
	function convertMoney5(formName,txtmoney,hidmoney){
	    var tonumber;
	    var re = /,/g;
	    var txt_money = eval("document."+formName+"."+txtmoney);
	    var hid_money = eval("document."+formName+"."+hidmoney);
	    if (txt_money.value != ""){
	    	var temp = trim(txt_money.value);
	    	if (temp == "" || temp == 0){
	    		alert("购买金额须大于0!");
	    		txt_money.value="";
					hid_money.value="";
					txt_money.focus();
	    		return;
	    	}
	    }
	    tonumber = addZero((trim(txt_money.value)).replace(re,""));
	
	    txt_money.value = "";
	    hid_money.value = "";
	   if (tonumber !="" && tonumber!=null){
	   	rep = / /g;
			var amt = tonumber.replace(rep,"");
			
			for(var j = 0; j < amt.length; j++){
				if(isNaN(parseInt(amt.charAt(j),10)) && amt.charAt(j)!="," && amt.charAt(j)!=".") {
					alert("购买金额须大于0!");
					txt_money.value="";
					hid_money.value="";
					txt_money.focus();
					return;
				}
			}
			if(amt.indexOf(".")!=amt.lastIndexOf(".")){
				alert("购买金额须大于0!");
				txt_money.focus();
				return;
			}
		
			re = /,/g;
			var amt1 = amt.replace(re,"");
	
			var amt2=parseFloat(amt1);		
			if(amt2<0){
				alert("输入的金额小于零,请重新输入!");
				txt_money.focus();
				return;
			}else{		//大于0的正数;
				if(amt1.indexOf(".")!=-1){				
					var str = amt1.substr(amt1.indexOf(".")+1);				
					if(str.length>2){
						alert("输入的金额小数点后只能保留两位,请重新输入!");
						txt_money.focus();
						return;
					}else if(str.length==1){
						amt1=amt1 + "0";
					}else if(str.length<1){
						amt1=amt1 + "00";
					}
				}else{
					amt1=amt1 + ".00";
				}
				if(amt1.charAt(0)=='0' && amt1.indexOf(".")!=1){
				alert("购买金额须大于0!");
				txt_money.focus();
				return;
				}
				hid_money.value=amt1;
				var temp=amt1.substring(0,amt1.indexOf("."));
				if (temp.length > 14 || amt1 > '99999999999999.99'){
				    alert("输入的金额太大，请重新输入!");
				    txt_money.focus();
				    return;
				}
				txt_money.value=comma(temp) + amt1.substring(amt1.indexOf("."));
				return;							
			}
	    }
	}
	
	/**
	* 对接口返回（接口返回的金额可以为空）的金额进行转换，将金额转换为以元为单位，小数点后有两位
	* 例：输入域1234，转换后隐含域为1234.00 
	* @param {String} 表单名称
	* @param {String} 要转换的金额输入框名称
	* @param {String} 金额隐藏域名称
	*/
	function convertMoney6(formName,txtmoney,hidmoney){
	    var tonumber;
	    var re = /,/g;
	    var txt_money = eval("document."+formName+"."+txtmoney);
	    var hid_money = eval("document."+formName+"."+hidmoney);
	    if (txt_money.value != ""){
	    	var temp = trim(txt_money.value);
	    	if (temp == "" || temp == 0){
	    		alert("预约金额须大于0!");
	    		txt_money.value="";
					hid_money.value="";
					txt_money.focus();
	    		return;
	    	}
	    }
	    tonumber = addZero((trim(txt_money.value)).replace(re,""));
	    txt_money.value = "";
	    hid_money.value = "";
	   if (tonumber !="" && tonumber!=null){
	   	rep = / /g;
			var amt = tonumber.replace(rep,"");
			
			for(var j = 0; j < amt.length; j++){
				if(isNaN(parseInt(amt.charAt(j),10)) && amt.charAt(j)!="," && amt.charAt(j)!=".") {
					alert("预约金额须大于0!");
					txt_money.value="";
					hid_money.value="";
					txt_money.focus();
					return;
				}
			}
			if(amt.indexOf(".")!=amt.lastIndexOf(".")){
				alert("预约金额须大于0!");
				txt_money.focus();
				return;
			}
		
			re = /,/g;
			var amt1 = amt.replace(re,"");
	
			var amt2=parseFloat(amt1);		
			if(amt2<0){
				alert("输入的金额小于零,请重新输入!");
				txt_money.focus();
				return;
			}else{		//大于0的正数;
				if(amt1.indexOf(".")!=-1){				
					var str = amt1.substr(amt1.indexOf(".")+1);				
					if(str.length>2){
						alert("输入的金额小数点后只能保留两位,请重新输入!");
						txt_money.focus();
						return;
					}else if(str.length==1){
						amt1=amt1 + "0";
					}else if(str.length<1){
						amt1=amt1 + "00";
					}
				}else{
					amt1=amt1 + ".00";
				}
				if(amt1.charAt(0)=='0' && amt1.indexOf(".")!=1){
				alert("预约金额须大于0!");
				txt_money.focus();
				return;
				}
				hid_money.value=amt1;
				var temp=amt1.substring(0,amt1.indexOf("."));
				if (temp.length > 14 || amt1 > '99999999999999.99'){
				    alert("输入的金额太大，请重新输入!");
				    txt_money.focus();
				    return;
				}
				txt_money.value=comma(temp) + amt1.substring(amt1.indexOf("."));
				return;							
			}
	    }
	}
	
	/**
	* ，，小数点后有两位
	* 例：输入域1234，转换后隐含域为1234.00
	* @param {String} 表单名称
	* @param {String} 要转换的金额输入框名称
	* @param {String} 金额隐藏域名称
	*/
	function convertFloatNum(formName,txtmoney,hidmoney,msg){
	    var tonumber;
	    var re = /,/g;
	    var txt_money = eval("document."+formName+"."+txtmoney);
	    var hid_money = eval("document."+formName+"."+hidmoney);	
	    if (txt_money.value != ""){
	    	var temp = trim(txt_money.value);
	    	if (temp == ""){
	    		alert("输入的" + msg+"格式错误，请输入正确的数字!");
	    		txt_money.value="";
					hid_money.value="";
					txt_money.focus();
	    		return false;
	    	}
	    }
	    tonumber = addZero((trim(txt_money.value)).replace(re,""));
	
	    txt_money.value = "";
	    hid_money.value = "";
	   if (tonumber !="" && tonumber!=null){
	   	rep = / /g;
			var amt = tonumber.replace(rep,"");
			
			for(var j = 0; j < amt.length; j++){
				if(isNaN(parseInt(amt.charAt(j),10)) && amt.charAt(j)!="," && amt.charAt(j)!=".") {
					alert("输入的" + msg+"格式错误，请输入正确的数字!");
					txt_money.value="";
					hid_money.value="";
					txt_money.focus();
					return false;
				}
			}
			if(amt.indexOf(".")!=amt.lastIndexOf(".")){
				alert("输入的" + msg+"格式错误，请输入正确的数字!");
				txt_money.focus();
				return false;
			}
		
			re = /,/g;
			var amt1 = amt.replace(re,"");
	
			var amt2=parseFloat(amt1);		
			if(amt2<=0){
				alert("输入的" + msg+"小于或等于零,请重新输入!");
				txt_money.focus();
				return;
			}else{		//大于0的正数;
				if(amt1.indexOf(".")!=-1){				
					var str = amt1.substr(amt1.indexOf(".")+1);				
					if(str.length>2){
						alert("输入的" + msg+"小于或等于零,请重新输入!");
						txt_money.focus();
						return false;
					}else if(str.length==1){
						amt1=amt1 + "0";
					}else if(str.length<1){
						amt1=amt1 + "00";
					}
				}else{
					amt1=amt1 + ".00";
				}
				if(amt1.charAt(0)=='0' && amt1.indexOf(".")!=1){				
				alert("输入的" + msg+"格式错误，请输入正确的数字!");
				txt_money.focus();
				return false;
				}
				hid_money.value=amt1;
				var temp=amt1.substring(0,amt1.indexOf("."));
				if (temp.length > 14 || amt1 > '99999999999999.99'){
				    alert("输入的" + msg+"太大，请重新输入!");
				    txt_money.focus();
				    return false;
				}
				txt_money.value=comma(temp) + amt1.substring(amt1.indexOf("."));
				return true;							
			}
	    }
	   return true;
	}
	/**
	* 对金额进行转换，将金额转换为以元为单位，小数点后有两位,对于输入0不作控制
	* 例：输入域1234，转换后隐含域为1234.00
	* @param {String} 表单名称
	* @param {String} 要转换的金额输入框名称
	* @param {String} 金额隐藏域名称
	*/
	function convertMoneyAsZero(formName,txtmoney,hidmoney){
	    var tonumber;
	    var re = /,/g;
	    var txt_money = eval("document."+formName+"."+txtmoney);
	    var hid_money = eval("document."+formName+"."+hidmoney);
	    if (txt_money.value != ""){
	    	var temp = trim(txt_money.value);
	    	if (temp == ""){
	    		alert("请输入正确的金额数字!");
	    		txt_money.value="";
					hid_money.value="";
					txt_money.focus();
	    		return;
	    	}
	    }
	    tonumber = addZero((trim(txt_money.value)).replace(re,""));
	
	    txt_money.value = "";
	    hid_money.value = "";
	   if (tonumber !="" && tonumber!=null){
	   	rep = / /g;
			var amt = tonumber.replace(rep,"");
			
			for(var j = 0; j < amt.length; j++){
				if(isNaN(parseInt(amt.charAt(j),10)) && amt.charAt(j)!="," && amt.charAt(j)!=".") {
					alert("请输入正确的金额数字!");
					txt_money.value="";
					hid_money.value="";
					txt_money.focus();
					return;
				}
			}
			if(amt.indexOf(".")!=amt.lastIndexOf(".")){
				alert("请输入正确的金额数字!");
				txt_money.focus();
				return;
			}
		
			re = /,/g;
			var amt1 = amt.replace(re,"");
				if(amt1.indexOf(".")!=-1){				
					var str = amt1.substr(amt1.indexOf(".")+1);				
					if(str.length>2){
						alert("输入的金额小数点后只能保留两位,请重新输入!");
						txt_money.focus();
						return;
					}else if(str.length==1){
						amt1=amt1 + "0";
					}else if(str.length<1){
						amt1=amt1 + "00";
					}
				}else{
					amt1=amt1 + ".00";
				}
				if(amt1.charAt(0)=='0' && amt1.indexOf(".")!=1){
				alert("请输入正确的金额数字!");
				txt_money.focus();
				return;
				}
				hid_money.value=amt1;
				var temp=amt1.substring(0,amt1.indexOf("."));
				if (temp.length > 14 || amt1 > '99999999999999.99'){
				    alert("输入的金额太大，请重新输入!");
				    txt_money.focus();
				    return;
				}
				txt_money.value=comma(temp) + amt1.substring(amt1.indexOf("."));
				return;							
	    }
	}
	/**
	* 对基金转换或赎回，合法性校验。
	* 例：输入域1234，转换后隐含域为1234.00
	* @param {String} 表单名称
	* @param {String} 要转换的份额输入框名称
	* @param {String} 份额隐藏域名称
	*/
	function convertPortion(formName,txtmoney,hidmoney){
	    var tonumber;
	    var re = /,/g;
	    var txt_money = eval("document."+formName+"."+txtmoney);
	    var hid_money = eval("document."+formName+"."+hidmoney);
	    if (txt_money.value != ""){
	    	var temp = trim(txt_money.value);
	    	if (temp == ""){
	    		alert("请输入正确的份额!");
	    		txt_money.value="";
					hid_money.value="";
					txt_money.focus();
	    		return;
	    	}
	    }
	    tonumber = addZero((trim(txt_money.value)).replace(re,""));
	
	    txt_money.value = "";
	    hid_money.value = "";
	   if (tonumber !="" && tonumber!=null){
	   	rep = / /g;
			var amt = tonumber.replace(rep,"");
			
			for(var j = 0; j < amt.length; j++){
				if(isNaN(parseInt(amt.charAt(j),10)) && amt.charAt(j)!="," && amt.charAt(j)!=".") {
					alert("请输入正确的份额!");
					txt_money.value="";
					hid_money.value="";
					txt_money.focus();
					return;
				}
			}
			if(amt.indexOf(".")!=amt.lastIndexOf(".")){
				alert("请输入正确的份额!");
				txt_money.focus();
				return;
			}
		
			re = /,/g;
			var amt1 = amt.replace(re,"");
	
			var amt2=parseFloat(amt1);		
			if(amt2<=0){
				alert("输入的份额小于或等于零,请重新输入!");
				txt_money.focus();
				return;
			}else{		//大于0的正数;
				if(amt1.indexOf(".")!=-1){				
					var str = amt1.substr(amt1.indexOf(".")+1);				
					if(str.length>2){
						alert("输入的份额小数点后只能保留两位,请重新输入!");
						txt_money.focus();
						return;
					}else if(str.length==1){
						amt1=amt1 + "0";
					}else if(str.length<1){
						amt1=amt1 + "00";
					}
				}else{
					amt1=amt1 + ".00";
				}
				if(amt1.charAt(0)=='0' && amt1.indexOf(".")!=1){
				alert("请输入正确的份额!");
				txt_money.focus();
				return;
				}
				hid_money.value=amt1;
				var temp=amt1.substring(0,amt1.indexOf("."));
				if (temp.length > 14 || amt1 > '99999999999999.99'){
				    alert("输入的份额太大，请重新输入!");
				    txt_money.focus();
				    return;
				}
				txt_money.value=comma(temp) + amt1.substring(amt1.indexOf("."));
				return;							
			}
	    }
	}
	/**
	* 对金额进行转换，将金额转换为以元为单位，小数点后有两位
	* 例：输入域1234，转换后隐含域为1234.00
	* @param {String} 表单名称
	* @param {String} 要转换的金额输入框名称
	* @param {String} 金额隐藏域名称
	*/
	function convertMoney3(formName,txtmoney,hidmoney){
	
	    var tonumber;
	    var re = /,/g;
	    var txt_money = eval("document."+formName+"."+txtmoney);
	    var hid_money = eval("document."+formName+"."+hidmoney);
	    if (txt_money.value != ""){
	    	var temp = trim(txt_money.value);
	    	if (temp == ""){
	    		alert("请输入正确的金额数字!");
	    		txt_money.value="";
					hid_money.value="";
					txt_money.focus();
	    		return false;
	    	}
	    }else
	    {
	    	return true;
	    }
	    tonumber = addZero((trim(txt_money.value)).replace(re,""));
	    
	    txt_money.value = "";
	    hid_money.value = "";
	   if (tonumber !="" && tonumber!=null){
	   	rep = / /g;
			var amt = tonumber.replace(rep,"");
			
			for(var j = 0; j < amt.length; j++){
				if(isNaN(parseInt(amt.charAt(j),10)) && amt.charAt(j)!="," && amt.charAt(j)!=".") {
					alert("请输入正确的金额数字!");
					txt_money.value="";
					hid_money.value="";
					txt_money.focus();
					return false;
				}
			}
			if(amt.indexOf(".")!=amt.lastIndexOf(".")){
				alert("请输入正确的金额数字!");
				txt_money.focus();
				return false;
			}
		
			re = /,/g;
			var amt1 = amt.replace(re,"");
	
			var amt2=parseFloat(amt1);		
			if(amt2<=0){
				alert("输入的金额不能小于或等于零,请重新输入!");
				txt_money.focus();
				return false;
			}else{		//大于0的正数;
				if(amt1.indexOf(".")!=-1){				
					var str = amt1.substr(amt1.indexOf(".")+1);				
					if(str.length>2){
						alert("输入的金额小数点后只能保留两位,请重新输入!");
						txt_money.focus();
						return false;
					}else if(str.length==1){
						amt1=amt1 + "0";
					}else if(str.length<1){
						amt1=amt1 + "00";
					}
				}else{
					amt1=amt1 + ".00";
				}
				if(amt1.charAt(0)=='0' && amt1.indexOf(".")!=1){
				alert("请输入正确的金额数字!");
				txt_money.focus();
				return false;
				}
				hid_money.value=amt1;
				var temp=amt1.substring(0,amt1.indexOf("."));
				if (temp.length > 14){
				    alert("输入的金额太大，请重新输入!");
				    txt_money.focus();
				    return false;
				}
				txt_money.value=comma(temp) + amt1.substring(amt1.indexOf("."));
				return true;							
			}
	    }else
	    {
	    	return false;
	    }
	}

	/**
	* 对金额进行转换，将金额转换为以元为单位，小数点后有两位
	* 整数位数有7位
	* @param {String} 表单名称
	* @param {String} 要转换的金额输入框名称
	* @param {String} 金额隐藏域名称
	*/
	function convertSevenMoney(formName,txtmoney,hidmoney){
	    var tonumber;
	    var re = /,/g;
	    var txt_money = eval("document."+formName+"."+txtmoney);
	    var hid_money = eval("document."+formName+"."+hidmoney);
	    if (txt_money.value != ""){
	    	var temp = trim(txt_money.value);
	    	if (temp == ""){
	    		alert("请输入正确的金额数字!");
	    		txt_money.value="";
					hid_money.value="";
					txt_money.focus();
	    		return;
	    	}
	    }
	    tonumber = addZero((trim(txt_money.value)).replace(re,""));
	
	    txt_money.value = "";
	    hid_money.value = "";
	   if (tonumber !="" && tonumber!=null){
	   	rep = / /g;
			var amt = tonumber.replace(rep,"");
			
			for(var j = 0; j < amt.length; j++){
				if(isNaN(parseInt(amt.charAt(j),10)) && amt.charAt(j)!="," && amt.charAt(j)!=".") {
					alert("请输入正确的金额数字!");
					txt_money.value="";
					hid_money.value="";
					txt_money.focus();
					return;
				}
			}
			if(amt.indexOf(".")!=amt.lastIndexOf(".")){
				alert("请输入正确的金额数字!");
				txt_money.focus();
				return;
			}
		
			re = /,/g;
			var amt1 = amt.replace(re,"");
	
			var amt2=parseFloat(amt1);		
			if(amt2<=0){
				alert("输入的金额不能小于或等于零,请重新输入!");
				txt_money.focus();
				return;
			}else{		//大于0的正数;
				if(amt1.indexOf(".")!=-1){				
					var str = amt1.substr(amt1.indexOf(".")+1);				
					if(str.length>2){
						alert("输入的金额小数点后只能保留两位,请重新输入!");
						txt_money.focus();
						return;
					}else if(str.length==1){
						amt1=amt1 + "0";
					}else if(str.length<1){
						amt1=amt1 + "00";
					}
				}else{
					amt1=amt1 + ".00";
				}
				if(amt1.charAt(0)=='0' && amt1.indexOf(".")!=1){
				alert("请输入正确的金额数字!");
				txt_money.focus();
				return;
				}
				hid_money.value=amt1;
				var temp=amt1.substring(0,amt1.indexOf("."));
				if (temp.length > 7){
				    alert("输入的金额太大，请重新输入!");
				    txt_money.focus();
				    return;
				}
				txt_money.value=comma(temp) + amt1.substring(amt1.indexOf("."));
				return;							
			}
	    }
	}
	
	/**
	 * 日期格式判断，日期格式只能为YYYYMMDD或者YYYY-MM-DD，并加入了闰年判断
	 * 
	 */
	function checkdate(obj){
		var a=obj.value;
		var reg= /^(\d{4})-(\d{2})-(\d{2})$/; 
	  var reg1=	/^(\d{4})(\d{2})(\d{2})$/;
	  var len=a.length;
	
	  var year,month,day;
	  //8为日期
	  if(len==8){
	  	year=a.substr(0,4);
	  	month=a.substr(4,2);
	  	day=a.substr(6,2);
	  }
	  //10位日期
	  else if(len==10){
	  	year=a.substr(0,4);
	  	month=a.substr(5,2);
	  	day=a.substr(8,2);
	  }
	  if(a==null || a ==""){
	  	return true;
	  }
	  else if((reg.test(a) && RegExp.$2<=12 && RegExp.$3<=31) || (reg1.test(a) && RegExp.$2<=12 && RegExp.$3<=31)){
	  	//如果为闰年
	  	if(0==year%4&&((year%100!=0)||(year%400==0))){
	  		if(month==02 && day>29){
	  			alert("闰年的2月不能大于29天！");
	  			obj.value="";
	  			return false;
	  		}else if((month==04 || month==06 || month==09 || month==11) && day==31){
	  			alert("该月不存在31天！");
	  			obj.value="";
	  			return false;
	  		}	
	    }
	    //非闰年
	    else{
	    	if(month==02 && day>28){
	  			alert("非闰年的2月不能大于28天！");
	  			obj.value="";
	  			return false;
	  		}else if((month==04 || month==06 || month==09 || month==11) && day==31){
	  			alert("该月不存在31天！");
	  			obj.value="";
	  			return false;
	  		}	
	    }
	  	return true;
	  }
	  else{
	  	alert("输入的日期格式不正确！");
	  	obj.value="";
	  	return false;
	  }
	}

	/**
	* 对日期进行判断转换，日期格式只能为YYYYMMDD或者YYYY-MM-DD，并加入了闰年判断
	* 例：输入域20090605，转换后隐含域为2009-06-05
	* @param {String} 表单名称
	* @param {String} 要转换的日期输入框名称
	* @param {String} 日期隐藏域名称
	*/
	function checkdate(formName,helpdate,realdate){
	  var helpdateObj = eval("document."+formName+"."+helpdate);
	  var realdateObj = eval("document."+formName+"."+realdate);
		
	  var helpdateValue=helpdateObj.value;
	  
	  var reg= /^(\d{4})-(\d{2})-(\d{2})$/; 
	  var reg1=	/^(\d{4})(\d{2})(\d{2})$/;
	  var len=helpdateValue.length;
	
	  var year,month,day;
	  //8为日期
	  if(len==8){
	  	year=helpdateValue.substr(0,4);
	  	month=helpdateValue.substr(4,2);
	  	day=helpdateValue.substr(6,2);
	  }
	  //10位日期
	  else if(len==10){
	  	year=helpdateValue.substr(0,4);
	  	month=helpdateValue.substr(5,2);
	  	day=helpdateValue.substr(8,2);
	  }
	  if(helpdateValue==null || helpdateValue ==""){
		  helpdateObj.value="";
		  realdateObj.value="";
	      return true;
	  }
	  else if(day<=0){
		  alert("日期录入格式为yyyymmdd或yyyy-mm-dd,请重新输入!");
		  helpdateObj.value="";
		  return false;
	  }
	  if(month=='00'){
			alert('日期录入格式为yyyymmdd或yyyy-mm-dd,请重新输入!');
			helpdateObj.value="";
			return false;
		}
	  if(year > 2999){
		  alert("你输入的日期过大,请重新输入！");
		  helpdateObj.value="";
		  return false;
	  }
	  
	  else if((reg.test(helpdateValue) && RegExp.$2<=12 && RegExp.$3<=31) || (reg1.test(helpdateValue) && RegExp.$2<=12 && RegExp.$3<=31)){
	  	//如果为闰年
	  	if(0==year%4&&((year%100!=0)||(year%400==0))){
	  		if(month==02 && day>29){
	  			alert("闰年的2月不能大于29天！");
	  			helpdateObj.value="";
	  			return false;
	  		}else if((month==04 || month==06 || month==09 || month==11) && day==31){
	  			alert("该月不存在31天！");
	  			helpdateObj.value="";
	  			return false;
	  		}	
	    }
	    //非闰年
	    else{
	    	if(month==02 && day>28){
	  			alert("非闰年的2月不能大于28天！");
	  			helpdateObj.value="";
	  			return false;
	  		}else if((month==04 || month==06 || month==09 || month==11) && day==31){
	  			alert("该月不存在31天！");
	  			helpdateObj.value="";
	  			return false;
	  		}	
	    }
	  	realdateObj.value=year+"-"+month+"-"+day;
	  	return true;
	  }
	  else{
	  	alert("日期录入格式为yyyymmdd或yyyy-mm-dd,请重新输入!");
	  	helpdateObj.value="";
	  	return false;
	  }
	}

	/**
	* 对金额进行转换，将金额转换为以分为单位
	* 例：输入域1234，转换后隐含域为123400
	* @param {String} 表单名称
	* @param {String} 要转换的金额输入框名称
	* @param {String} 金额隐藏域名称
	*/
	function convertMoney2(formName,txtmoney,hidmoney){
	    var tonumber;
	    var re = /,/g;
	    var txt_money = eval("document."+formName+"."+txtmoney);
	    var hid_money = eval("document."+formName+"."+hidmoney);
	    tonumber = txt_money.value.replace(re,"");
	
	    txt_money.value = "";
	    if(tonumber==null)
	    {
	    	hid_money.value = '';
	    	return;
	    }
	
	    if (tonumber !="" && tonumber !=null && tonumber !=" "){
	   	rep = / /g;
			var amt = tonumber.replace(rep,"");
			
			for(var j = 0; j < amt.length; j++){
				if(isNaN(parseInt(amt.charAt(j),10)) && amt.charAt(j)!="," && amt.charAt(j)!=".") {
					alert("请输入正确的金额数字!");
					txt_money.value="";
					txt_money.focus();
					return;
				}
			}
			if(amt.indexOf(".")!=amt.lastIndexOf(".")){
				alert("请输入正确的金额数字!");
				txt_money.focus();
				return;
			}
		
			re = /,/g;
			var amt1 = amt.replace(re,"");
	
			var amt2=parseFloat(amt1);		
			if(amt2<0){
				alert("输入的金额小于零,请重新输入!");
				txt_money.focus();
				return;
			}else{		//大于0的正数;
				if(amt1.indexOf(".")!=-1){				
					var str = amt1.substr(amt1.indexOf(".")+1);				
					if(str.length>2){
						alert("输入的金额小数点后只能保留两位,请重新输入!");
						txt_money.focus();
						return;
					}else if(str.length==1){
						amt1=amt1 + "0";
					}else if(str.length<1){
						amt1=amt1 + "00";
					}
				}else{
					amt1=amt1 + ".00";
				}
				if(amt1.charAt(0)=='0' && amt1.indexOf(".")!=1){
				alert("请输入正确的金额数字!");
				txt_money.focus();
				return;
				}
				hid_money.value=amt1.substring(0,amt1.indexOf(".")) + amt1.substr(amt1.indexOf(".")+1);
				var temp=amt1.substring(0,amt1.indexOf("."));
				if (hid_money.value.length > 18){
				    alert("金额太大");
				    txt_money.focus();
				    return;
				}
				txt_money.value=comma(temp) + amt1.substring(amt1.indexOf("."));
				return;							
			}
	    }
	}

	/**
	* 表现形式增加逗号，只对整数部分做处理，由convertToMoney，convertToMoney2调用。
	* @param {Integer} 需转换数值	
	* @return {String} 转换后的字符串
	*/
	function comma(number) {
		number = '' + number;
		if (number.length > 3) {
			var mod = number.length % 3;
			var output = (mod > 0 ? (number.substring(0,mod)) : '');
			for (i=0 ; i < Math.floor(number.length / 3); i++) {
				if ((mod == 0) && (i == 0))
					output += number.substring(mod+ 3 * i, mod + 3 * i + 3);
				else
					output += ',' + number.substring(mod + 3 * i, mod + 3 * i + 3);
			}
			return (output);
		}
		else return number;
	}
	
	/**
	* 去除字符串中的","和"."，转换金额时使用
	* @param {Integer}： 需转换数值
	* @return {String} 转换后的字符串         	
	*/
	function uncomma(number){
		
		var pos = number.indexOf(",");
		while(pos!=-1){
			number = number.substring(0,pos)+number.substring(pos+1,number.length);
			pos = number.indexOf(",");
		}
		
		pos = number.indexOf(".");
		while(pos!=-1){
			number = number.substring(0,pos)+number.substring(pos+1,number.length);
			pos = number.indexOf(".");
		}
		
		var pos = number.indexOf("0");
		while(pos==0){
			number = number.substring(1,number.length);
			pos = number.indexOf("0");
		}
		return number;
	}


	/* ======================= DIV WINDOW START ========================= */
	function openDivWin(url, width, height, top, left) {
		document.getElementById("_divWinFrame").src = url; 
	     var d = document.getElementById("_divWin"); 
	     d.style.width = width;
	     d.style.height = height;
	     d.style.position = "absolute";
	     if(left == '') {
	     	d.style.left = (document.body.offsetWidth-width)/2;
	     } else {
	     	d.style.left = left;
	     }
	     if(top == '') {
	     	d.style.top = (document.body.offsetHeight-height)/2;
	     }else {
	     	d.style.top = top;
	     }
	     d.style.display=""; 
	     
	     var m = document.getElementById("_maskDiv"); 
	     m.style.width = window.screen.availWidth; 
	     m.style.height = window.screen.availHeight; 
	     m.style.display = ""; 
	}
	
	function closeDivWin() { 
	     var m = document.getElementById("_maskDiv"); 
	     var d = document.getElementById("_divWin"); 
	     d.style.display = "none"; 
	     m.style.display = "none"; 
	}
	/* ======================= DIV WINDOW END ========================= */

	/*
	* 日期比较函数(公用调用方法,在页面上直接调用这个方法就行)
	* startDate:开始日期
	* endDate:结束日期
	* disMonth:月份跨度标志,如果为3,表示开始日期和结束日期最大跨度为3个月
	* disDate:历史天数标志 ,如果等于0表示当天，不等于表示历史，也就是当天的前一天
	* 返回 ：如果日期满足条件则返回true ,否则返回false 
	*/
	  function mydDateDiff1(startDate,endDate,disMonth,disDate)   
	 { 
		 //截取开始日期 
		var strDateYear=startDate.substring(0,4); 
	    var strDateMonth=startDate.substring(5,7); 
	    var strDateDay=startDate.substring(8); 
	    //截取结束日期
		var finishDateYear=endDate.substring(0,4); 
	    var finishDateMonth=endDate.substring(5,7); 
	    var finishDateDay=endDate.substring(8); 
	    //进行日期比较
		if(!compareDate(strDateYear,strDateMonth,strDateDay,finishDateYear,finishDateMonth,finishDateDay,disDate))
		{
			return false;
		} 
			
		if(!mystrDiff(strDateYear,strDateMonth,strDateDay,finishDateYear,finishDateMonth,finishDateDay,disMonth))
		{
			return false;
		} 
		
		return true;
	
	}
	
	/*
	* 日期比较函数(结束日期和开始日期是否超过跨度)
	* strDateYear:开始日期的年份
	* strDateMonth:开始日期的月份
	* strDateDay:开始日期的天数
	* endDateYear:结束日期的年份
	* endDateMonth:结束日期的月份
	* endDateDay:结束日期的天数
	* disMonth:月份跨度标志,如果为3,表示开始日期和结束日期最大跨度为3个月
	* 返回 ： 如果日期满足条件则返回true ,否则返回false 
	*/
		
	function mystrDiff(strDateYear,strDateMonth,strDateDay,endDateYear,endDateMonth,endDateDay,disMonth)
	{
	
		var myStrDate = new Date(strDateMonth+"-"+strDateDay+"-"+strDateYear);
		var myEndDate = new Date(endDateMonth+"-"+endDateDay+"-"+endDateYear);
		
		myStrDate.setMonth(myStrDate.getMonth()+disMonth);
		
		if ((myStrDate - myEndDate)<=0)
		{
			alert("开始日期与截止日期跨度不能超过"+disMonth+"个月");
			return false;
		}
		else{
			return  true;
		}
	}
	
	/*
	* 日期比较函数(结束日期不能小于开始日期,结束日期不能大于或者等于当天,开始日期不能大于或者等于当天)
	* strDateYear:开始日期的年份
	* strDateMonth:开始日期的月份
	* strDateDay:开始日期的天数
	* endDateYear:结束日期的年份
	* endDateMonth:结束日期的月份
	* endDateDay:结束日期的天数
	* dayFlag:历史天数标志 ,如果等于0表示当天，不等于表示历史，也就是当天的前一天
	* 返回 ： 如果日期满足条件则返回true ,否则返回false 
	*/
	function compareDate(strDateYear,strDateMonth,strDateDay,endDateYear,endDateMonth,endDateDay,dayFlag)
	{ 
		var sDate = new Date();   
		var sY = sDate.getFullYear();             
		var sM = sDate.getMonth()+1;   
		var sD = sDate.getDate();  
		
		if (dayFlag!=0){
			sDate.setDate(sDate.getDate()-1);
			sY = sDate.getFullYear();             
			sM = sDate.getMonth()+1;   
			sD = sDate.getDate();  
		}
		
		if (Date.parse(sM+"/"+sD+"/"+sY) - Date.parse(endDateMonth+"/"+endDateDay+"/"+endDateYear)<0)
		{
			if (dayFlag!=0){
					alert("结束日期不能大于等于当天");
				}else{		
					alert("结束日期不能大于当天");
			}
			return false;
		}
		
		
		if (Date.parse(sM+"/"+sD+"/"+sY) - Date.parse(strDateMonth+"/"+strDateDay+"/"+strDateYear)<0)
		{
			if (dayFlag!=0){
				alert("开始日期不能大于等于当天");
			}else{		
				alert("开始日期不能大于当天");
			}

			return false;
		}
				
				
		if (Date.parse(endDateMonth+"/"+endDateDay+"/"+endDateYear) - Date.parse(strDateMonth+"/"+strDateDay+"/"+strDateYear)<0)
		{
			alert("结束日期不能小于开始日期");
			return false;
		}
		else{
			return  true;
		}
				
	}
	/*
	* 日期比较函数(公用调用方法,在页面上直接调用这个方法就行,系统日期为网银日期)
	* startDate:开始日期
	* endDate:结束日期
	* disMonth:月份跨度标志,如果为3,表示开始日期和结束日期最大跨度为3个月
	* disDate:历史天数标志 ,如果等于0表示当天，不等于表示历史，也就是当天的前一天
	* 返回 ：如果日期满足条件则返回true ,否则返回false 
	*/
	function mydDateDiff(startDate,endDate,sysDate,disMonth,disDate)   
	{ 
		//截取开始日期 
		var strDateYear=startDate.substring(0,4); 
	    var strDateMonth=startDate.substring(5,7); 
	    var strDateDay=startDate.substring(8); 
	    //截取结束日期
		var finishDateYear=endDate.substring(0,4); 
	    var finishDateMonth=endDate.substring(5,7); 
	    var finishDateDay=endDate.substring(8); 
	    //系统日期
		var sysDateYear=sysDate.substring(0,4); 
	    var sysDateMonth=sysDate.substring(5,7); 
	    var sysDateDay=sysDate.substring(8); 

	    //进行日期比较compareYearMonth
		if(!compareDate(strDateYear,strDateMonth,strDateDay,finishDateYear,finishDateMonth,finishDateDay,sysDateYear,sysDateMonth,sysDateDay,disDate))
		{
			return false;
		} 
			
		if(!mystrDiff(strDateYear,strDateMonth,strDateDay,finishDateYear,finishDateMonth,finishDateDay,disMonth))
		{
			return false;
		} 
		
		return true;

	}
	/*
	* 日期比较函数(公用调用方法,在页面上直接调用这个方法就行,系统日期为网银日期)
	* startDate:开始日期
	* endDate:结束日期
	* disMonth:月份跨度标志,如果为3,表示开始日期和结束日期最大跨度为3个月
	* disDate:历史天数标志 ,如果等于0表示当天，不等于表示历史，也就是当天的前一天
	* 返回 ：如果日期满足条件则返回true ,否则返回false 
	*/
	function mydDateDiffYearMonth(startDate,endDate,sysDate,disMonth,disDate)   
	{ 
		//截取开始日期 
		var strDateYear=startDate.substring(0,4); 
	    var strDateMonth=startDate.substring(5,7); 
	    var strDateDay=startDate.substring(8); 
	    //截取结束日期
		var finishDateYear=endDate.substring(0,4); 
	    var finishDateMonth=endDate.substring(5,7); 
	    var finishDateDay=endDate.substring(8); 
	    //系统日期
		var sysDateYear=sysDate.substring(0,4); 
	    var sysDateMonth=sysDate.substring(5,7); 
	    var sysDateDay=sysDate.substring(8); 

	    //进行日期比较compareYearMonth
		if(!compareYearMonth(strDateYear,strDateMonth,strDateDay,finishDateYear,finishDateMonth,finishDateDay,sysDateYear,sysDateMonth,sysDateDay,disDate))
		{
			return false;
		} 
			
		if(!mystrDiff(strDateYear,strDateMonth,strDateDay,finishDateYear,finishDateMonth,finishDateDay,disMonth))
		{
			return false;
		} 
		
		return true;

	}
		/*
		* 日期比较函数(结束日期不能小于开始日期,结束日期不能大于或者等于当天,开始日期不能大于或者等于当天)
		* strDateYear:开始日期的年份
		* strDateMonth:开始日期的月份
		* strDateDay:开始日期的天数
		* endDateYear:结束日期的年份
		* endDateMonth:结束日期的月份
		* endDateDay:结束日期的天数
		* dayFlag:历史天数标志 ,如果等于0表示当天，不等于表示历史，也就是当天的前一天
		* 返回 ： 如果日期满足条件则返回true ,否则返回false 
		*/
		function compareDate(strDateYear,strDateMonth,strDateDay,endDateYear,endDateMonth,endDateDay,sysDateYear,sysDateMonth,sysDateDay,dayFlag)
		{ 
			var sDate = new Date(sysDateYear,sysDateMonth-1,sysDateDay);   
			var sY = sDate.getFullYear();             
			var sM = sDate.getMonth()+1;   
			var sD = sDate.getDate();  
			
			if (dayFlag!=0){
				sDate.setDate(sDate.getDate()-1);
				sY = sDate.getFullYear();             
				sM = sDate.getMonth()+1;   
				sD = sDate.getDate();  
			}	

			if (Date.parse(sM+"/"+sD+"/"+sY) - Date.parse(endDateMonth+"/"+endDateDay+"/"+endDateYear)<0)
			{
				if (dayFlag!=0){
						alert("截止日期不能大于等于当天");
					}else{		
						alert("截止日期不能大于当天");
				}
				return false;
			}
			
			
			if (Date.parse(sM+"/"+sD+"/"+sY) - Date.parse(strDateMonth+"/"+strDateDay+"/"+strDateYear)<0)
			{
				if (dayFlag!=0){
					alert("开始日期不能大于等于当天");
				}else{		
					alert("开始日期不能大于当天");
				}

				return false;
			}
					
					
			if (Date.parse(endDateMonth+"/"+endDateDay+"/"+endDateYear) - Date.parse(strDateMonth+"/"+strDateDay+"/"+strDateYear)<0)
			{
				alert("截止日期不能小于开始日期");
				return false;
			}
			else{
				return  true;
			}
					
		}
		/*
		* 日期比较函数(结束日期不能小于开始日期,结束日期不能大于或者等于当天,开始日期不能大于或者等于当天)
		* strDateYear:开始日期的年份
		* strDateMonth:开始日期的月份
		* strDateDay:开始日期的天数
		* endDateYear:结束日期的年份
		* endDateMonth:结束日期的月份
		* endDateDay:结束日期的天数
		* dayFlag:历史天数标志 ,如果等于0表示当天，不等于表示历史，也就是当天的前一天
		* 返回 ： 如果日期满足条件则返回true ,否则返回false 
		*/
		function compareYearMonth(strDateYear,strDateMonth,strDateDay,endDateYear,endDateMonth,endDateDay,sysDateYear,sysDateMonth,sysDateDay,dayFlag)
		{ 
			var sDate = new Date(sysDateYear,sysDateMonth-1,sysDateDay);   
			var sY = sDate.getFullYear();             
			var sM = sDate.getMonth()+1;   
			var sD = sDate.getDate();  
			
			if (dayFlag!=0){
				sDate.setDate(sDate.getDate()-1);
				sY = sDate.getFullYear();             
				sM = sDate.getMonth()+1;   
				sD = sDate.getDate();  
			}	

			if (Date.parse(sM+"/"+sD+"/"+sY) - Date.parse(endDateMonth+"/"+endDateDay+"/"+endDateYear)<0)
			{
				if (dayFlag!=0){
						alert("截止年月不能大于等于集团结算当前年月");
					}else{		
						alert("截止年月不能大于集团结算当前年月");
				}
				return false;
			}
			
			
			if (Date.parse(sM+"/"+sD+"/"+sY) - Date.parse(strDateMonth+"/"+strDateDay+"/"+strDateYear)<0)
			{
				if (dayFlag!=0){
					alert("开始年月不能大于等于截止年月");
				}else{		
					alert("开始年月不能大于截止年月");
				}

				return false;
			}
					
					
			if (Date.parse(endDateMonth+"/"+endDateDay+"/"+endDateYear) - Date.parse(strDateMonth+"/"+strDateDay+"/"+strDateYear)<0)
			{
				alert("截止年月不能小于开始年月");
				return false;
			}
			else{
				return  true;
			}
					
		}
	/* ======================= DIV WINDOW START ========================= */	
	/*
	* 日期比较函数(在法人透支中）
	* startDate:开始日期
	* endDate:结束日期
	* disMonth:月份跨度标志,如果为3,表示开始日期和结束日期最大跨度为3个月
	* disDate:历史天数标志 ,如果等于0表示当天，不等于表示历史，也就是当天的前一天
	* 返回 ：如果日期满足条件则返回true ,否则返回false 
	*/
	function mydDateDiffOverdraft(startDate,endDate,disMonth,disDate)   
	{ 
		 //截取开始日期 
		var strDateYear=startDate.substring(0,4); 
	    var strDateMonth=startDate.substring(5,7); 
	    var strDateDay=startDate.substring(8); 
	    //截取结束日期
		var finishDateYear=endDate.substring(0,4); 
	    var finishDateMonth=endDate.substring(5,7); 
	    var finishDateDay=endDate.substring(8); 
	    //进行日期比较
		if(!compareDateOverdraft(strDateYear,strDateMonth,strDateDay,finishDateYear,finishDateMonth,finishDateDay,disDate))
		{
			return false;
		} 
		
		return true;

	 }
		/*
		* 日期比较函数(结束日期不能小于开始日期,结束日期不能大于或者等于当天,开始日期不能大于或者等于当天)
		* strDateYear:开始日期的年份
		* strDateMonth:开始日期的月份
		* strDateDay:开始日期的天数
		* endDateYear:结束日期的年份
		* endDateMonth:结束日期的月份
		* endDateDay:结束日期的天数
		* dayFlag:历史天数标志 ,如果等于0表示当天，不等于表示历史，也就是当天的前一天
		* 返回 ： 如果日期满足条件则返回true ,否则返回false 
		*/
		function compareDateOverdraft(strDateYear,strDateMonth,strDateDay,endDateYear,endDateMonth,endDateDay,dayFlag)
		{ 
			var sDate = new Date();   
			var sY = sDate.getFullYear();             
			var sM = sDate.getMonth()+1;   
			var sD = sDate.getDate();  
			
			if (dayFlag!=0){
				sDate.setDate(sDate.getDate()-1);
				sY = sDate.getFullYear();             
				sM = sDate.getMonth()+1;   
				sD = sDate.getDate();  
			}
			
			if (Date.parse(sM+"/"+sD+"/"+sY) - Date.parse(endDateMonth+"/"+endDateDay+"/"+endDateYear)<0)
			{
				if (dayFlag!=0){
						alert("截止日期不能大于等于当天");
					}else{		
						alert("截止日期不能大于当天");
				}
				return false;
			}
			
			
			if (Date.parse(sM+"/"+sD+"/"+sY) - Date.parse(strDateMonth+"/"+strDateDay+"/"+strDateYear)<0)
			{
				if (dayFlag!=0){
					alert("起始日期不能大于等于当天");
				}else{		
					alert("起始日期不能大于当天");
				}

				return false;
			}
					
					
			if (Date.parse(endDateMonth+"/"+endDateDay+"/"+endDateYear) - Date.parse(strDateMonth+"/"+strDateDay+"/"+strDateYear)<0)
			{
				alert("截止日期不能小于起始日期");
				return false;
			}
			else{
				return  true;
			}
					
		}

		/*
		* 日期比较函数(在网上缴税的苏州和无锡网上缴税查询中使用）
		* startDate:开始日期
		* endDate:结束日期
		* disMonth:月份跨度标志,如果为3,表示开始日期和结束日期最大跨度为3个月
		* disDate:历史天数标志 ,如果等于0表示当天，不等于表示历史，也就是当天的前一天
		* 返回 ：如果日期满足条件则返回true ,否则返回false 
		*/
		function mydDateDiffTax(startDate,endDate,disMonth,disDate)   
		{ 
			 //截取开始日期 
			var strDateYear=startDate.substring(0,4); 
		    var strDateMonth=startDate.substring(5,7); 
		    var strDateDay=startDate.substring(8); 
		    //截取结束日期
			var finishDateYear=endDate.substring(0,4); 
		    var finishDateMonth=endDate.substring(5,7); 
		    var finishDateDay=endDate.substring(8); 
		    //进行日期比较
			if(!compareDateTax(strDateYear,strDateMonth,strDateDay,finishDateYear,finishDateMonth,finishDateDay,disDate))
			{
				return false;
			} 
			
			return true;

		}
			/*
			* 日期比较函数(结束日期不能小于开始日期,结束日期不能大于或者等于当天,开始日期不能大于或者等于当天)
			* strDateYear:开始日期的年份
			* strDateMonth:开始日期的月份
			* strDateDay:开始日期的天数
			* endDateYear:结束日期的年份
			* endDateMonth:结束日期的月份
			* endDateDay:结束日期的天数
			* dayFlag:历史天数标志 ,如果等于0表示当天，不等于表示历史，也就是当天的前一天
			* 返回 ： 如果日期满足条件则返回true ,否则返回false 
			*/
			function compareDateTax(strDateYear,strDateMonth,strDateDay,endDateYear,endDateMonth,endDateDay,dayFlag)
			{ 
				var sDate = new Date();   
				var sY = sDate.getFullYear();             
				var sM = sDate.getMonth()+1;   
				var sD = sDate.getDate();  
				
				if (dayFlag!=0){
					sDate.setDate(sDate.getDate()-1);
					sY = sDate.getFullYear();             
					sM = sDate.getMonth()+1;   
					sD = sDate.getDate();  
				}
				
				if (Date.parse(sM+"/"+sD+"/"+sY) - Date.parse(endDateMonth+"/"+endDateDay+"/"+endDateYear)<0)
				{
					if (dayFlag!=0){
							alert("业务开始日期不能大于等于当天！");
						}else{		
							alert("业务截止日期不能大于当天！");
					}
					return false;
				}
				
				
				if (Date.parse(sM+"/"+sD+"/"+sY) - Date.parse(strDateMonth+"/"+strDateDay+"/"+strDateYear)<0)
				{
					if (dayFlag!=0){
						alert("业务开始日期不能大于等于当天！");
					}else{		
						alert("业务开始日期不能大于当天！");
					}

					return false;
				}
						
						
				if (Date.parse(endDateMonth+"/"+endDateDay+"/"+endDateYear) - Date.parse(strDateMonth+"/"+strDateDay+"/"+strDateYear)<0)
				{
					alert("业务开始日期不能小于业务截止日期！");
					return false;
				}
				else{
					return  true;
				}
						
			}

		function trimBlank(formName,fieldName){
		    var object = eval("document."+formName+"."+fieldName);
		    var value = object.value;
		    object.value = $.trim(value);
		}
		
		//将页面的确认按钮只读
		function offbutton(){
			document.all["abutton"].disabled=true;
		}


	/*
	* 日期比较函数(集团计算中判断单据日期小于等于当前日期，起息日期 大于等于单据日期）
	* 日期参数的格式为"yyyy-MM-dd"
	* billDate:单据日期
	* interStrDate:起息日期
	* sysdate:系统当前日期
	* 返回 ：如果日期满足条件则返回true ,否则返回false 
	* 创建人：李罡 
	* 创建时间：2009-7-1
	*/
	function grpDateCompare(billDate,interStrDate,sysdate){
		 //截取系统当前日期 
		var sysdateYear=sysdate.substring(0,4); 
	    var sysdateMonth=sysdate.substring(5,7); 
	    var sysdateDay=sysdate.substring(8); 
	    //截取单据日期
		var billDateYear=billDate.substring(0,4); 
	    var billDateMonth=billDate.substring(5,7); 
	    var billDateDay=billDate.substring(8);
	    //截取起息日期
		var interStrDateYear=interStrDate.substring(0,4); 
	    var interStrDateMonth=interStrDate.substring(5,7); 
	    var interStrDateDay=interStrDate.substring(8); 
	    
	    if (Date.parse(sysdateMonth+"/"+sysdateDay+"/"+sysdateYear) - Date.parse(billDateMonth+"/"+billDateDay+"/"+billDateYear)<0){
			alert("单据日期不能大于系统当前日期 ！");
			return false;
		}
		
	    if (Date.parse(billDateMonth+"/"+billDateDay+"/"+billDateYear) - Date.parse(interStrDateMonth+"/"+interStrDateDay+"/"+interStrDateYear)>0){
			alert("起息日期不能小于单据日期 ！");
			return false;
		}
	    return true;
	}
	/*
	* 日期比较函数(集团计算中判断起息日期小于等于单据日期）
	* 日期参数的格式为"yyyy-MM-dd"
	* billDate:单据日期
	* interStrDate:起息日期
	* 返回 ：如果日期满足条件则返回true ,否则返回false 
	* 创建人：zhanghf
	* 创建时间：2009-12-24
	*/
	function grpCompareDate(billDate,interStrDate){
		//截取单据日期
		var billDateYear=billDate.substring(0,4); 
	    var billDateMonth=billDate.substring(5,7); 
	    var billDateDay=billDate.substring(8);
	    //截取起息日期
		var interStrDateYear=interStrDate.substring(0,4); 
	    var interStrDateMonth=interStrDate.substring(5,7); 
	    var interStrDateDay=interStrDate.substring(8);
	    if (Date.parse(billDateMonth+"/"+billDateDay+"/"+billDateYear) - Date.parse(interStrDateMonth+"/"+interStrDateDay+"/"+interStrDateYear)<0){
			alert("单据起息日期应早于或等于当前日结日期 ！");
			return false;
		}
	    return true;
	}
	/**
	 * 打印
	 * @return
	 */
	
	function prt()
	{
		//打印：隐藏页面导航条显示
		$(".transaction_step").hide();
		var  Bdhtml=window.document.body.innerHTML;        
        var  sprnstr1="<!-- StartOfPrinterFriendlyPage1 -->"; 
        var  eprnstr1="<!-- EndOfPrinterFriendlyPage1 -->";
        var  sprnstr2="<!-- StartOfPrinterFriendlyPage2 -->"; 
        var  eprnstr2="<!-- EndOfPrinterFriendlyPage2 -->";
        var prnhtml=Bdhtml.substring(Bdhtml.indexOf(sprnstr1)+36) ;
        prnhtml=prnhtml.substring(0,prnhtml.indexOf(eprnstr1)); 
        
        var prnhtml2=Bdhtml.substring(Bdhtml.indexOf(sprnstr2)+36) ;
        prnhtml2=prnhtml2.substring(0,prnhtml2.indexOf(eprnstr2)); 
        
        var OpenWindow = window.open("");
        OpenWindow.document.write('<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">');
        OpenWindow.document.write('<html xmlns="http://www.w3.org/1999/xhtml">');
        OpenWindow.document.write("<HEAD>");
        OpenWindow.document.write('<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>');
       
        OpenWindow.document.write('<link rel=\"stylesheet\" type=\"text/css\" media="all" href=\"../../styles/default.css\" />');
        OpenWindow.document.write('<link rel=\"stylesheet\" type=\"text/css\" media="all" href=\"../../styles/nicetabs.css\" />');
//        OpenWindow.document.write('<link rel=\"stylesheet\" type=\"text/css\" media="all" href=\"../../styles/xtree.css\" />');
        OpenWindow.document.write('<link rel=\"stylesheet\" type=\"text/css\" media="all" href=\"../../styles/jmesa.css\" />');
        OpenWindow.document.write('<link rel=\"stylesheet\" type=\"text/css\" media="all" href=\"../../styles/jmesa-pdf.css\" />');
        OpenWindow.document.write('<link rel=\"stylesheet\" type=\"text/css\" media="all" href=\"../../styles/calendar-aqua/theme.css\" />');
        OpenWindow.document.write('<link rel=\"stylesheet\" type=\"text/css\" media="all" href=\"../../styles/table.css\" />');
//        OpenWindow.document.write('<link rel=\"stylesheet\" type=\"text/css\" media="all" href=\"../../styles/newmenu.css\" />');
        OpenWindow.document.write('<link rel=\"stylesheet\" type=\"text/css\" media="all" href=\"../../styles/ui201401/style.css\" />');
  
        OpenWindow.document.write("<\/HEAD>");
        OpenWindow.document.write("<BODY>");
        OpenWindow.document.write("<\/BODY>");
        OpenWindow.document.write("<\/HTML>");
        
        OpenWindow.document.body.innerHTML=prnhtml+prnhtml2;
        OpenWindow.document.close();
        OpenWindow.print();
        OpenWindow.close();
      //结束打印：恢复页面导航条显示
        $(".transaction_step").show();
	}
	function prtebusiGoldenDetails()
	{
		//打印：隐藏页面导航条显示
		$(".transaction_step").hide();
		$("#tablePrint").hide();
		$(".demo_button").hide();
		var  Bdhtml=window.document.body.innerHTML;        
        var  sprnstr1="<!-- StartOfPrinterFriendlyPage1 -->"; 
        var  eprnstr1="<!-- EndOfPrinterFriendlyPage1 -->";
        var  sprnstr2="<!-- StartOfPrinterFriendlyPage2 -->"; 
        var  eprnstr2="<!-- EndOfPrinterFriendlyPage2 -->";
        var prnhtml=Bdhtml.substring(Bdhtml.indexOf(sprnstr1)+36) ;
        prnhtml=prnhtml.substring(0,prnhtml.indexOf(eprnstr1)); 
        
        var prnhtml2=Bdhtml.substring(Bdhtml.indexOf(sprnstr2)+36) ;
        prnhtml2=prnhtml2.substring(0,prnhtml2.indexOf(eprnstr2)); 
        
        var OpenWindow = window.open("");
        OpenWindow.document.write('<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">');
        OpenWindow.document.write('<html xmlns="http://www.w3.org/1999/xhtml">');
        OpenWindow.document.write("<HEAD>");
        OpenWindow.document.write('<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>');
       
        OpenWindow.document.write('<link rel=\"stylesheet\" type=\"text/css\" media="all" href=\"../../styles/default.css\" />');
        OpenWindow.document.write('<link rel=\"stylesheet\" type=\"text/css\" media="all" href=\"../../styles/nicetabs.css\" />');
//        OpenWindow.document.write('<link rel=\"stylesheet\" type=\"text/css\" media="all" href=\"../../styles/xtree.css\" />');
        OpenWindow.document.write('<link rel=\"stylesheet\" type=\"text/css\" media="all" href=\"../../styles/jmesa.css\" />');
        OpenWindow.document.write('<link rel=\"stylesheet\" type=\"text/css\" media="all" href=\"../../styles/jmesa-pdf.css\" />');
        OpenWindow.document.write('<link rel=\"stylesheet\" type=\"text/css\" media="all" href=\"../../styles/calendar-aqua/theme.css\" />');
        OpenWindow.document.write('<link rel=\"stylesheet\" type=\"text/css\" media="all" href=\"../../styles/table.css\" />');
//        OpenWindow.document.write('<link rel=\"stylesheet\" type=\"text/css\" media="all" href=\"../../styles/newmenu.css\" />');
        OpenWindow.document.write('<link rel=\"stylesheet\" type=\"text/css\" media="all" href=\"../../styles/ui201401/style.css\" />');
  
        OpenWindow.document.write("<\/HEAD>");
        OpenWindow.document.write("<BODY>");
        OpenWindow.document.write("<\/BODY>");
        OpenWindow.document.write("<\/HTML>");
        
        OpenWindow.document.body.innerHTML=prnhtml+prnhtml2;
        OpenWindow.document.close();
        OpenWindow.print();
        OpenWindow.close();
      //结束打印：恢复页面导航条显示
        $("#tablePrint").show();
        $(".demo_button").show();
        $(".transaction_step").show();
	}
	
	
	function prtSpecial(tableid)
	{
		//打印：隐藏页面导航条显示
		$(".transaction_step").hide();
		var  Bdhtml=window.document.body.innerHTML;        
        var  sprnstr1="<!-- StartOfPrinterFriendlyPage1 -->"; 
        var  eprnstr1="<!-- EndOfPrinterFriendlyPage1 -->";
        var  sprnstr2="<!-- StartOfPrinterFriendlyPage2 -->"; 
        var  eprnstr2="<!-- EndOfPrinterFriendlyPage2 -->";
        var prnhtml=Bdhtml.substring(Bdhtml.indexOf(sprnstr1)+36) ;
        prnhtml=prnhtml.substring(0,prnhtml.indexOf(eprnstr1)); 
        var prnhtml2=document.getElementById(tableid).innerHTML;	
        var OpenWindow = window.open("");
        OpenWindow.document.write('<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">');
        OpenWindow.document.write('<html xmlns="http://www.w3.org/1999/xhtml">');
        OpenWindow.document.write("<HEAD>");
        OpenWindow.document.write('<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>');
       
        OpenWindow.document.write('<link rel=\"stylesheet\" type=\"text/css\" media="all" href=\"../../styles/default.css\" />');
        OpenWindow.document.write('<link rel=\"stylesheet\" type=\"text/css\" media="all" href=\"../../styles/nicetabs.css\" />');
//        OpenWindow.document.write('<link rel=\"stylesheet\" type=\"text/css\" media="all" href=\"../../styles/xtree.css\" />');
        OpenWindow.document.write('<link rel=\"stylesheet\" type=\"text/css\" media="all" href=\"../../styles/jmesa.css\" />');
        OpenWindow.document.write('<link rel=\"stylesheet\" type=\"text/css\" media="all" href=\"../../styles/jmesa-pdf.css\" />');
        OpenWindow.document.write('<link rel=\"stylesheet\" type=\"text/css\" media="all" href=\"../../styles/calendar-aqua/theme.css\" />');
        OpenWindow.document.write('<link rel=\"stylesheet\" type=\"text/css\" media="all" href=\"../../styles/table.css\" />');
//        OpenWindow.document.write('<link rel=\"stylesheet\" type=\"text/css\" media="all" href=\"../../styles/newmenu.css\" />');
        OpenWindow.document.write('<link rel=\"stylesheet\" type=\"text/css\" media="all" href=\"../../styles/ui201401/style.css\" />');
  
        OpenWindow.document.write("<\/HEAD>");
        OpenWindow.document.write("<BODY>");
        OpenWindow.document.write("<\/BODY>");
        OpenWindow.document.write("<\/HTML>");
        OpenWindow.document.body.innerHTML=prnhtml+prnhtml2;
        OpenWindow.document.close();
        OpenWindow.print();
        OpenWindow.close();
      //结束打印：恢复页面导航条显示
        $(".transaction_step").show();
	}
	/*打印*/
	function prtcount(data,Bdhtm2){
		var  Bdhtml=data;
		var  sprnstr1="<!-- StartOfPrinterFriendlyPage12 -->"; 
		var  eprnstr1="<!-- EndOfPrinterFriendlyPage12 -->";
		var prnhtml=Bdhtml.substring(Bdhtml.indexOf(sprnstr1)+37) ;
		prnhtml=prnhtml.substring(0,prnhtml.indexOf(eprnstr1)); 

	    var OpenWindow = window.open("");
	    OpenWindow.document.write('<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">');
	    OpenWindow.document.write('<html xmlns="http://www.w3.org/1999/xhtml">');
	    OpenWindow.document.write("<HEAD>");
	    OpenWindow.document.write('<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>');
	    
	    OpenWindow.document.write('<link rel=\"stylesheet\" type=\"text/css\" media="all" href=\"../../styles/default.css\" />');
	    OpenWindow.document.write('<link rel=\"stylesheet\" type=\"text/css\" media="all" href=\"../../styles/nicetabs.css\" />');
//	    OpenWindow.document.write('<link rel=\"stylesheet\" type=\"text/css\" media="all" href=\"../../styles/xtree.css\" />');
	    OpenWindow.document.write('<link rel=\"stylesheet\" type=\"text/css\" media="all" href=\"../../styles/jmesa.css\" />');
	    OpenWindow.document.write('<link rel=\"stylesheet\" type=\"text/css\" media="all" href=\"../../styles/jmesa-pdf.css\" />');
	    OpenWindow.document.write('<link rel=\"stylesheet\" type=\"text/css\" media="all" href=\"../../styles/calendar-aqua/theme.css\" />');
	    OpenWindow.document.write('<link rel=\"stylesheet\" type=\"text/css\" media="all" href=\"../../styles/table.css\" />');
//	    OpenWindow.document.write('<link rel=\"stylesheet\" type=\"text/css\" media="all" href=\"../../styles/newmenu.css\" />');
	    OpenWindow.document.write('<link rel=\"stylesheet\" type=\"text/css\" media="all" href=\"../../styles/ui201401/style.css\" />');
	    
	    OpenWindow.document.write("<\/HEAD>");
	    OpenWindow.document.write("<BODY>");
	    OpenWindow.document.write("<\/BODY>");
	    OpenWindow.document.write("<\/HTML>");
	    
	    OpenWindow.document.body.innerHTML=prnhtml; 
	    OpenWindow.document.close();
	    OpenWindow.print();
	    OpenWindow.close();
	}	
	/*打印*/
	function prt1(){
		//打印：隐藏页面导航条显示
		$(".transaction_step").hide();
		var Bdhtml=window.document.body.innerHTML;
		var sprnstr1='<!-- StartOfPrinterFriendlyPage12 -->';
		var eprnstr1='<!-- EndOfPrinterFriendlyPage12 -->';
		var prnhtml=Bdhtml.substring(Bdhtml.indexOf(sprnstr1)+37);
		prnhtml=prnhtml.substring(0,prnhtml.indexOf(eprnstr1));
		
		var OpenWindow = window.open("");
		OpenWindow.document.write('<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">');
		OpenWindow.document.write('<html xmlns="http://www.w3.org/1999/xhtml">');
		OpenWindow.document.write("<HEAD>");
		OpenWindow.document.write('<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>');
		
		OpenWindow.document.write('<link rel=\"stylesheet\" type=\"text/css\" media="all" href=\"../../styles/default.css\" />');
		OpenWindow.document.write('<link rel=\"stylesheet\" type=\"text/css\" media="all" href=\"../../styles/nicetabs.css\" />');
//		OpenWindow.document.write('<link rel=\"stylesheet\" type=\"text/css\" media="all" href=\"../../styles/xtree.css\" />');
		OpenWindow.document.write('<link rel=\"stylesheet\" type=\"text/css\" media="all" href=\"../../styles/jmesa.css\" />');
		OpenWindow.document.write('<link rel=\"stylesheet\" type=\"text/css\" media="all" href=\"../../styles/jmesa-pdf.css\" />');
		OpenWindow.document.write('<link rel=\"stylesheet\" type=\"text/css\" media="all" href=\"../../styles/calendar-aqua/theme.css\" />');
		OpenWindow.document.write('<link rel=\"stylesheet\" type=\"text/css\" media="all" href=\"../../styles/table.css\" />');
//		OpenWindow.document.write('<link rel=\"stylesheet\" type=\"text/css\" media="all" href=\"../../styles/newmenu.css\" />');
		OpenWindow.document.write('<link rel=\"stylesheet\" type=\"text/css\" media="all" href=\"../../styles/ui201401/style.css\" />');
		
		OpenWindow.document.write("<\/HEAD>");
		OpenWindow.document.write("<BODY>");
		OpenWindow.document.write("<\/BODY>");
		OpenWindow.document.write("<\/HTML>");
		
		OpenWindow.document.body.innerHTML=prnhtml; 
		OpenWindow.document.close();
		OpenWindow.print();
		OpenWindow.close();
		//结束打印：恢复页面导航条显示
        $(".transaction_step").show();
	}
	
	/*打印*/
	function prt2(){
		//打印：隐藏页面导航条显示
		$(".transaction_step").hide();
		var Bdhtml=window.document.body.innerHTML;
		var sprnstr1='<!-- StartOfPrinterFriendlyPage13 -->';
		var eprnstr1='<!-- EndOfPrinterFriendlyPage13 -->';
		var prnhtml=Bdhtml.substring(Bdhtml.indexOf(sprnstr1)+37);
		prnhtml=prnhtml.substring(0,prnhtml.indexOf(eprnstr1));
		
		var OpenWindow = window.open("");
		OpenWindow.document.write('<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">');
		OpenWindow.document.write('<html xmlns="http://www.w3.org/1999/xhtml">');
		OpenWindow.document.write("<HEAD>");
		OpenWindow.document.write('<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>');
		
		OpenWindow.document.write('<link rel=\"stylesheet\" type=\"text/css\" media="all" href=\"../../styles/default.css\" />');
		OpenWindow.document.write('<link rel=\"stylesheet\" type=\"text/css\" media="all" href=\"../../styles/nicetabs.css\" />');
//		OpenWindow.document.write('<link rel=\"stylesheet\" type=\"text/css\" media="all" href=\"../../styles/xtree.css\" />');
		OpenWindow.document.write('<link rel=\"stylesheet\" type=\"text/css\" media="all" href=\"../../styles/jmesa.css\" />');
		OpenWindow.document.write('<link rel=\"stylesheet\" type=\"text/css\" media="all" href=\"../../styles/jmesa-pdf.css\" />');
		OpenWindow.document.write('<link rel=\"stylesheet\" type=\"text/css\" media="all" href=\"../../styles/calendar-aqua/theme.css\" />');
		OpenWindow.document.write('<link rel=\"stylesheet\" type=\"text/css\" media="all" href=\"../../styles/table.css\" />');
//		OpenWindow.document.write('<link rel=\"stylesheet\" type=\"text/css\" media="all" href=\"../../styles/newmenu.css\" />');
		OpenWindow.document.write('<link rel=\"stylesheet\" type=\"text/css\" media="all" href=\"../../styles/ui201401/style.css\" />');
		
		OpenWindow.document.write("<\/HEAD>");
		OpenWindow.document.write("<BODY>");
		OpenWindow.document.write("<\/BODY>");
		OpenWindow.document.write("<\/HTML>");
		
		OpenWindow.document.body.innerHTML=prnhtml; 
		OpenWindow.document.close();
		OpenWindow.print();
		OpenWindow.close();
		//结束打印：恢复页面导航条显示
        $(".transaction_step").show();
	}
	
	/* 针对E商宝定义的打印方法*/
	function printComepareAcctnoDown(){
		//打印：隐藏页面导航条显示
		$(".transaction_step").hide();
		var  Bdhtml=window.document.body.innerHTML;
		var  sprnstr1="<!-- StartPrintComepareAcctnoDown -->"; 
		var  eprnstr1="<!-- EndPrintComepareAcctnoDown -->";
		
		var prnhtml=Bdhtml.substring(Bdhtml.indexOf(sprnstr1)+37);
		
		prnhtml=prnhtml.substring(0,prnhtml.indexOf(eprnstr1)); 

		var OpenWindow = window.open("");
		OpenWindow.document.write('<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">');
		OpenWindow.document.write('<html xmlns="http://www.w3.org/1999/xhtml">');
		OpenWindow.document.write("<HEAD>");
		OpenWindow.document.write('<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>');
		
		OpenWindow.document.write('<link rel=\"stylesheet\" type=\"text/css\" media="all" href=\"../../styles/default.css\" />');
		OpenWindow.document.write('<link rel=\"stylesheet\" type=\"text/css\" media="all" href=\"../../styles/nicetabs.css\" />');
//		OpenWindow.document.write('<link rel=\"stylesheet\" type=\"text/css\" media="all" href=\"../../styles/xtree.css\" />');
		OpenWindow.document.write('<link rel=\"stylesheet\" type=\"text/css\" media="all" href=\"../../styles/jmesa.css\" />');
		OpenWindow.document.write('<link rel=\"stylesheet\" type=\"text/css\" media="all" href=\"../../styles/jmesa-pdf.css\" />');
		OpenWindow.document.write('<link rel=\"stylesheet\" type=\"text/css\" media="all" href=\"../../styles/calendar-aqua/theme.css\" />');
		OpenWindow.document.write('<link rel=\"stylesheet\" type=\"text/css\" media="all" href=\"../../styles/table.css\" />');
//		OpenWindow.document.write('<link rel=\"stylesheet\" type=\"text/css\" media="all" href=\"../../styles/newmenu.css\" />');
		OpenWindow.document.write('<link rel=\"stylesheet\" type=\"text/css\" media="all" href=\"../../styles/ui201401/style.css\" />');
		
		OpenWindow.document.write("<\/HEAD>");
		OpenWindow.document.write("<BODY>");
		OpenWindow.document.write("<\/BODY>");
		OpenWindow.document.write("<\/HTML>");
		
		OpenWindow.document.body.innerHTML=prnhtml; 
		OpenWindow.document.close();
		OpenWindow.print();
		OpenWindow.close();
		//结束打印：恢复页面导航条显示
        $(".transaction_step").show();
	}
	
	/**
	 * @deprecated 获取字符长度
	 * @param {String} elem
	 */
	function getStringLength(elem){
		var count = 0;
		for(var i=0;i<elem.length;i++){
			if(elem.charAt(i).charCodeAt(0)>128){
				count+=2;
			}else
			{
				count+=1;
			}
		}
		return count;
	}

	/**
	 * @deprecated 给不足两位小数的数字补位.00    by daiwenting
	 * @param {String} tradeMoney
	 */
	function addZeroh(tradeMoney){
		if(tradeMoney.indexOf(".")==-1){
			tradeMoney =  tradeMoney+".00";
		}else{
			tradeMoney =  tradeMoney+"00";
		}
		return tradeMoney.substring(0,tradeMoney.indexOf('.')+3);
	}
	
	/**
	 * @deprecated 给不足四位小数的数字补位.0000
	 * @param {String} tradeMoney
	 */
	function addZero4h(tradeMoney){
		if(tradeMoney.indexOf(".")==-1){
			tradeMoney =  tradeMoney+".0000";
		}else{
			tradeMoney =  tradeMoney+"0000";
		}
		return tradeMoney.substring(0,tradeMoney.indexOf('.')+5);
	}
	
	/**
	 * @deprecated 当session超时，ajax直接跳到登录页面
	 * @param {String} date
	 */
	function ajaxSessionOut(data,ctxPath){
		var loginPage = data.indexOf("<!-- 标题开始 -->");
		alert(loginPage);
		if (loginPage > 0)
		{
			//window.close();
			url = ctxPath + '/login.html';
			go(url);
			return false;
		}else{
			return true;
		}
	}

	/**
	 * ajax公共方法，根据传入的参数值动态执行
	 * @param url :需要跳转的路径
	 * @param data ：需要传入的参数，最好采用c标签的传参方式
	 * @param labelid ：判断程序是否顺利执行到指定页面的div标签的id,可传多个值，中间用","分隔
	 * @param exceptionmsg：出异常时的错误提示信息
	 * @param promptmsg：此字段为空，如果labelid1不为空，则此字段也不可为空，用以提示信息
	 * @param id：页面上需要赋值的域名,可传多个值，中间用","分隔
	 * @param iddata:页面上需要赋值的域所对应的数据，如果只更新主页面上一个域，此字段传空，其余时可传多个值，当只有两个域需要赋值时，
	 * 				 此字段只传入一个值，后台返回的数据为数组的第一个元素，此字段依次往后传入
	 * @return
	 */

	function ajaxReference(url,data1,labelid,exceptionmsg,promptmsg,id,iddata){
		$.ajax({
		    url: url,
		    type: 'POST',
		    data:data1,
		    contentType: 'application/x-www-form-urlencoded;charset=utf-8',
		    dataType: 'html',
		    timeout: 100000,
		    error: function(XMLHttpRequest, textStatus, errorThrown){
		    	alert(exceptionmsg);
		    },
		    success: function(data){
		    	try{
		    		var labelArray = labelid.split(",");
		    		var idArray = id.split(",");
		    		var dataArray = new Array();
		    		var flag = '0';//是否更新页面域标识
		    		if(iddata != ''){
		    			dataArray = iddata.split(",");
		    			dataArray.unshift(data);
		    		}else{
		    			dataArray[0] = data;
		    		}
		    		var callOk = data.indexOf(labelArray[0]);	    	
		    		//正确返回到指定页面
		    		if (callOk > 0)
	    			{
	    				for(var i=0;i < labelArray.length; i++){
	    					if(labelArray[i+1]!=null){//判断是否需要验证多个标签
	    						if(data.indexOf(labelArray[i+1])!= -1){
	        						alert(promptmsg);	
	        						flag = '1';
	        					}
	    					}
	    				}
	    				//为主页面上指定域赋值，如果只需要给一个赋值，那么iddata字段不送任何值
	    				if(flag == '0'){
	    					for(var j=0; j< idArray.length; j++){
	        					$("#"+idArray[j]).html(dataArray[j]);
	        				}
	    				}
		    		}else{
		    			alert(exceptionmsg);
		    		}
		    	}catch(e){
		    		alert(exceptionmsg);
		    	}
		    }	
		});	
	}
	/**
	 * 得到页面上指定域的值，此方法是为了避免重复加载相同的代码而创建
	 * @param formName : 所欲得值的域所在的form名称
	 * @param pageid ：所欲得值的域名
	 * @return
	 */
	function getPageValue(formName,pageid){
		return eval("document."+formName+"."+pageid + ".value");
	}
	
	/**
	 * 将以分隔符分割的字符串分离成两维数组
	 * @param value : 以分隔符分割的字符串
	 * @param  totalCol  ： 数据的列数
	 * @return  二维数组
	 */ 
	function getTransData2(value, totalCol){
		var totalArray = value.split("~#");
		var t = Math.floor((totalArray.length-1)/totalCol);
		var retInfo = new Array(t);
		try{
			for(var i=0; i<totalArray.length-1;){
				retInfo[Math.floor(i/totalCol)] = new Array(totalCol);
				for(var k=0 ; k < totalCol; k++){
					retInfo[Math.floor(i/totalCol)][k] = totalArray[i++];
				}
			}
		}catch(e){
		}
		
		return retInfo;
	}	
	/**
	 * 集团结算系统管理中根据不同的按钮和状态判断是否可以使用
	 * @param action : 启动,修改,禁用还是删除
	 * @param  radioName  ： 单选按钮名字
	 */ 
	function checkBillStatus(action,selDataIssueDeal){
				if (action == 'start'){
					if(selDataIssueDeal[0]=="08"){
					 alert('生效状态不能启用');
					 return false;
				 	}
					if(selDataIssueDeal[0]=="09"){				
						alert('作废状态不能启用');
						return false;
					}
					if(selDataIssueDeal[0]=="06"){				
						alert('失败状态不能启用');
						return false;
					}
					if(selDataIssueDeal[0]=="04"){				
						alert('审批中状态不能启用');
						return false;
					}
					if(selDataIssueDeal[0]=="03"){				
						alert('待发送状态不能启用');
						return false;
					}
					if(selDataIssueDeal[0]=="02"){				
						alert('未反馈状态不能启用');
						return false;
					}
			  	}
				if (action == 'forbid'){
					 if(selDataIssueDeal[0]=="07"){
						 alert('禁用状态不能再禁用');
						 return false;
						 }
					 if(selDataIssueDeal[0]=="01"){
						 alert('录入状态不能禁用');
						 return false;
						}
					}
				if (action == 'modify'){
					if(selDataIssueDeal[0]=="08"){				
						alert('生效状态不能修改');
						return false;
					 }	

					if(selDataIssueDeal[0]=="09"){				
						alert('作废状态不能修改');
						return false;
					 }	
					if(selDataIssueDeal[0]=="06"){				
						alert('失败状态不能修改');
						return false;
					}
					/**	if(selDataIssueDeal[0]=="04"){				
						alert('审批中状态不能修改');
						return false;
					}
					if(selDataIssueDeal[0]=="03"){				
						alert('待发送状态不能修改');
						return false;
					}*/
					if(selDataIssueDeal[0]=="02"){				
						alert('未反馈状态不能修改');
						return false;
					}
				}
				if (action == 'delete'){
					if(selDataIssueDeal[0]=="08"){				
						alert('生效状态不能删除');
						return false;
					 }	
					if(selDataIssueDeal[0]=="09"){				
						alert('作废状态不能删除');
						return false;
					 }
					if(selDataIssueDeal[0]=="06"){				
						alert('失败状态不能删除');
						return false;
					}
					/**	if(selDataIssueDeal[0]=="04"){				
						alert('审批中状态不能删除');
						return false;
					}
					if(selDataIssueDeal[0]=="03"){				
						alert('待发送状态不能删除');
						return false;
					}*/
					if(selDataIssueDeal[0]=="02"){				
						alert('未反馈状态不能删除');
						return false;
					}
				}
				if (action == 'convene'){
					 if(selDataIssueDeal[0]!="08"){
						 alert('非生效状态不能手工归集');
						 return false;
						 }
					 if(selDataIssueDeal[3]!="0"){
						 alert('该设置不允许手工归集');
						 return false;
						}
					}
			  return true;
		}
	/**
	 * 将以分隔符分割的字符串分离成两维数组
	 * @param value : 以分隔符分割的字符串
	 * @return  二维数组
	 */ 
	function getData1(value, col){
		var totalArray = value.split("~#");
		var t = totalArray.length-1;
		var arraylist = new Array(t);
		try{
			for(var i=0;i<totalArray.length-1; i++){
				var temp = totalArray[i].split("|");
				arraylist[i] = new Array(col);
				for(var j=0;j < temp.length-1; j++){
					arraylist[i][j] = temp[j];
				}
			}
		}catch(e){
			print("Nested catch caught " + e);
		}
		return arraylist;
	}	
	
	
	//====================================   集团结算      ====================================================================
	/**
	 * 对两个日期进行比较
	 * @param 
	 * @return  boolean
	 */ 
	function dateValidete(strdate,enddate,src){
		var sY = strdate.split("-")[0];             
		var sM = strdate.split("-")[1];  
		var sD = strdate.split("-")[2];
		var oY = enddate.split("-")[0];             
		var oM = enddate.split("-")[1];  
		var oD = enddate.split("-")[2];
		if ( Date.parse(sM+"/"+sD+"/"+sY) - Date.parse(oM+"/"+oD+"/"+oY) < 0){
			alert(src);
			return false;
		}	
		return true;
	}
	
    function madalDialog(obj,url) { 
    	var winFeatures = "dialogHeight:450px; dialogWidth:900px; scroll:yes; overflow:hidden;"; 
    	return  window.showModalDialog(url, obj, winFeatures); 
	}

    function aa(){
    	backvalue=''; 
    	backvalue =  window.showModalDialog(url, obj, winFeatures); 
    	return backvalue;
    }  


    /**
	* 对日利率进行转换，将金额转换（16，2）的格式
	* 例：输入域1234，转换后隐含域为1,234.00
	* @param {String}formName: 表单名称
	* @param {String}txtmoney: 要转换的金额输入框名称
	* @param {String}hidmoney: 金额隐藏域名称
	* @param src1: 请输入正确的xxx!
	* @param src2: 输入xxx应大于零!
	* @param src3: 输入的xxx太大，请重新输入!
	*/
	function convertAmt(formName,txtmoney,hidmoney,src1,src2,src3){
	    var tonumber;
	    var re = /,/g;
	    var txt_money = eval("document."+formName+"."+txtmoney);
	    var hid_money = eval("document."+formName+"."+hidmoney);
	    if (txt_money.value != ""){
	    	var temp = trim(txt_money.value);
	    	if (temp == ""){
	    		alert(src1);  //请输入正确的日利率!
	    		txt_money.value="";
					hid_money.value="";
					txt_money.focus();
	    		return;
	    	}
	    }
	    tonumber = addZero((trim(txt_money.value)).replace(re,""));

	    txt_money.value = "";
	    hid_money.value = "";
	   if (tonumber !="" && tonumber!=null){
	   	rep = / /g;
			var amt = tonumber.replace(rep,"");
			
			for(var j = 0; j < amt.length; j++){
				if(isNaN(parseInt(amt.charAt(j),10)) && amt.charAt(j)!="," && amt.charAt(j)!=".") {
					alert(src1);  //请输入正确的金额!
					txt_money.value="";
					hid_money.value="";
					txt_money.focus();
					return;
				}
			}
			if(amt.indexOf(".")!=amt.lastIndexOf(".")){
				alert(src1);  //请输入正确的金额!
				txt_money.focus();
				return;
			}
		
			re = /,/g;
			var amt1 = amt.replace(re,"");

			var amt2=parseFloat(amt1);	
			if(amt2<=0){
				alert(src2);  //输入日利率应大于零
				txt_money.focus();
				return;
			}else{		//大于0的正数;
				if(amt1.indexOf(".")!=-1){				
					var str = amt1.substr(amt1.indexOf(".")+1);				
					if(str.length>4){
						alert(src1);  //请输入正确的金额
						txt_money.focus();
						return;
					}else if(str.length==1){
						amt1=amt1 + "0";
					}else if(str.length<1){
						amt1=amt1 + "00";
					}
				}else{
					amt1=amt1 + ".00";
				}
				if(amt1.charAt(0)=='0' && amt1.indexOf(".")!=1){
				alert(src1);//请输入正确的金额
				txt_money.focus();
				return;
				}
				hid_money.value=amt1;
				var temp=amt1.substring(0,amt1.indexOf("."));
				if (temp.length > 14){
				    alert(src3);  //输入的金额率太大，请重新输入!
				    txt_money.focus();
				    return;
				}
				txt_money.value=comma(temp) + amt1.substring(amt1.indexOf("."));
				return;							
			}
	    }
	}
	
	/**
	* 对日利率进行转换，将日利率转换（8，4）的格式
	* 例：输入域1234，转换后隐含域为1,234.0000
	* @param {String}formName: 表单名称
	* @param {String}txtmoney: 要转换的金额输入框名称
	* @param {String}hidmoney: 金额隐藏域名称
	* @param src1: 请输入正确的日利率!
	* @param src2: 输入日利率应大于零!
	* @param src3: 输入的日利率太大，请重新输入!
	*/
	function convertDayint(formName,txtmoney,hidmoney,src1,src2,src3){
	    var tonumber;
	    var re = /,/g;
	    var txt_money = eval("document."+formName+"."+txtmoney);
	    var hid_money = eval("document."+formName+"."+hidmoney);
	    if (txt_money.value != ""){
	    	var temp = trim(txt_money.value);
	    	if (temp == ""){
	    		alert(src1);  //请输入正确的日利率!
	    		txt_money.value="";
					hid_money.value="";
					txt_money.focus();
	    		return;
	    	}
	    }
	    tonumber = addZero((trim(txt_money.value)).replace(re,""));

	    txt_money.value = "";
	    hid_money.value = "";
	   if (tonumber !="" && tonumber!=null){
	   	rep = / /g;
			var amt = tonumber.replace(rep,"");
			
			for(var j = 0; j < amt.length; j++){
				if(isNaN(parseInt(amt.charAt(j),10)) && amt.charAt(j)!="," && amt.charAt(j)!=".") {
					alert(src1);  //请输入正确的日利率!
					txt_money.value="";
					hid_money.value="";
					txt_money.focus();
					return;
				}
			}
			if(amt.indexOf(".")!=amt.lastIndexOf(".")){
				alert(src1);  //请输入正确的日利率!
				txt_money.focus();
				return;
			}
		
			re = /,/g;
			var amt1 = amt.replace(re,"");

			var amt2=parseFloat(amt1);	
			if(amt2<=0){
				alert(src2);  //输入日利率应大于零
				txt_money.focus();
				return;
			}else{		//大于0的正数;
				if(amt1.indexOf(".")!=-1){				
					var str = amt1.substr(amt1.indexOf(".")+1);				
					if(str.length>4){
						alert(src1);  //请输入正确的日利率
						txt_money.focus();
						return;
					}else if(str.length==1){
						amt1=amt1 + "000";
					}else if(str.length==2){
						amt1=amt1 + "00";
					}else if(str.length==3){
						amt1=amt1 + "0";
					}else if(str.length<1){
						amt1=amt1 + "0000";
					}
				}else{
					amt1=amt1 + ".0000";
				}
				if(amt1.charAt(0)=='0' && amt1.indexOf(".")!=1){
				alert(src1);//请输入正确的日利率
				txt_money.focus();
				return;
				}
				hid_money.value=amt1;
				var temp=amt1.substring(0,amt1.indexOf("."));
				if (temp.length > 4){
				    alert(src3);  //输入的日利率太大，请重新输入!
				    txt_money.focus();
				    return;
				}
				txt_money.value=comma(temp) + amt1.substring(amt1.indexOf("."));
				return;							
			}
	    }
	}
    
  //ajax查询风险等级
	function judgeRiskMatching(fundcode,url){
		$.ajax({
		    url: url,
		    type: 'POST',
		    data:'&fundcode='+fundcode,
		    dataType: 'html',
		    timeout: 30000,
		    error: function(XMLHttpRequest, textStatus, errorThrown){
		    	alert("查询客户风险等级与基金风险等级是否匹配错误,请稍候" );//弹出风险等级查询错误，请稍候
		    },
		    success: function(data){
		    	process1(data,fundcode);
		    }
		});
	}

	//ajax查询基金产品日期
	function judgeFundDate(fundcode,sysdate,url){
		var flag ;
		$.ajax({
		    url: url,
		    type: 'POST',
		    data:'&fundcode='+fundcode,
		    dataType: 'html',
		    async: false,
		    timeout: 30000,
		    error: function(XMLHttpRequest, textStatus, errorThrown){
		    	alert("查询基金产品工作日期错误,请稍候" );//弹出基金产品的工作日期，请稍候
		    	return false;
		    },
		    success: function(data){
		    	if(processFundDate(data, fundcode, sysdate)){
		    		flag = true;
		    	}else{
		    		flag = false;
		    	}
		    }
		});
		return flag;
	}
	//基金产品日期处理方法
	function processFundDate(data, fundcode, sysdate){
		var callOk = data.indexOf("<div id=\"fundPageMessage\">");    	
		if (callOk > 0){
			data = data.substr(data.lastIndexOf('>')+1);
			var retdata=data.split('|');
			var errorcode =retdata[0]; //异常 码
			var funddate = retdata[1];//是否匹配
			//将日期转换成日期格式
		    var sysDate = new Date(Date.parse(sysdate.replace(/-/g, "/"))); //系统日期
		    //截取基金日期 
			var fundYear = funddate.substring(0,4);
		    var fundMonth = funddate.substring(4,6);
		    var fundDay = funddate.substring(6,8);
			var fundDate = new Date(fundYear + "/" + fundMonth + "/" + fundDay);
		    
			if ((fundDate - sysDate) > 0) {
				//弹出提示信息
				var str = '您的交易为预委托交易，按照监管规定，将在下一交易日处理.';
				if(confirm(str)){
					return true;
				}else{
					return false;
				}
			} else {
				return true;
			}
		}else{
			alert('查询基金产品工作日期错误,请稍候');
			return false;
		}
	}
	/**
	* 去除字符串中的","转换金额时使用
	* @param {Integer}： 需转换数值
	* @return {String} 转换后的字符串         	
	*/
	function delecomma(number){
		
		var pos = number.indexOf(",");
		while(pos!=-1){
			number = number.substring(0,pos)+number.substring(pos+1,number.length);
			pos = number.indexOf(",");
		}
		return number;
	}
	
	//去掉金额中的'，'
	function uncomma(number){
		var pos = number.indexOf(",");
		while(pos!=-1){
			number = number.substring(0,pos)+number.substring(pos+1,number.length);
			pos = number.indexOf(",");
		}
		
		var pos = number.indexOf("0");
		while(pos==0){
			number = number.substring(1,number.length);
			pos = number.indexOf("0");
		}
		return number;
	}

	//根据IR0031669修改，跨行收款账号允许输入字母、数字、-、_、*
 function validateSpanAcctno(spanacctno){
	 var patrn=/^[0-9A-Za-z\-\*_]*$/;
		if(!patrn.exec(spanacctno))
		{   
			return false;   
		}
		
		if(spanacctno.length > 32){
			return false;  
		}
		return true;
 }
 

 function validateSubAcctno(spanacctno){
	 var patrn=/^[0-9A-Za-z\-\*_]*$/;
		if(!patrn.exec(spanacctno))
		{   
			return false;   
		}
		
		if(spanacctno.length > 30){
			return false;  
		}
		return true;
 }
 
  //根据bug-9194修改，收款账号允许输入字母、数字
 function validateInationAcctno(spanacctno){
	 var patrn=/^[0-9A-Za-z]*$/;
		if(!patrn.exec(spanacctno))
		{   
			return false;   
		}
		return true;
 }
	
	
	/**
	* 对金额进行转换，将金额转换为以元为单位，小数点后有两位 要求输入金额大于等于0
	* 例：输入域1234，转换后隐含域为1234.00
	* @param {String} 表单名称
	* @param {String} 要转换的金额输入框名称
	* @param {String} 金额隐藏域名称
	*/
	function convertMoney4(formName,txtmoney,hidmoney){
	    var tonumber;
	    var re = /,/g;
	    var txt_money = eval("document."+formName+"."+txtmoney);
	    var hid_money = eval("document."+formName+"."+hidmoney);
	    if (txt_money.value != ""){
	    	var temp = trim(txt_money.value);
	    	if (temp == ""){
	    		alert("请输入正确的金额!");
	    		txt_money.value="";
					hid_money.value="";
					txt_money.focus();
	    		return;
	    	}
	    }
	    tonumber = addZero((trim(txt_money.value)).replace(re,""));
	
	    txt_money.value = "";
	    hid_money.value = "";
	   if (tonumber !="" && tonumber!=null){
	   	rep = / /g;
			var amt = tonumber.replace(rep,"");
			
			for(var j = 0; j < amt.length; j++){
				if(isNaN(parseInt(amt.charAt(j),10)) && amt.charAt(j)!="," && amt.charAt(j)!=".") {
					alert("请输入正确的金额!");
					txt_money.value="";
					hid_money.value="";
					txt_money.focus();
					return;
				}
			}
			if(amt.indexOf(".")!=amt.lastIndexOf(".")){
				alert("请输入正确的金额!");
				txt_money.focus();
				return;
			}
		
			re = /,/g;
			var amt1 = amt.replace(re,"");
	
			var amt2=parseFloat(amt1);		
			if(amt2<0){
				alert("输入的金额小于零,请重新输入!");
				txt_money.focus();
				return;
			}else{		//大于0的正数;
				if(amt1.indexOf(".")!=-1){				
					var str = amt1.substr(amt1.indexOf(".")+1);				
					if(str.length>2){
						alert("输入的金额小数点后只能保留两位,请重新输入!");
						txt_money.focus();
						return;
					}else if(str.length==1){
						amt1=amt1 + "0";
					}else if(str.length<1){
						amt1=amt1 + "00";
					}
				}else{
					amt1=amt1 + ".00";
				}
				if(amt1.charAt(0)=='0' && amt1.indexOf(".")!=1){
				alert("请输入正确的金额!");
				txt_money.focus();
				return;
				}
				hid_money.value=amt1;
				var temp=amt1.substring(0,amt1.indexOf("."));
				if (temp.length > 14 || amt1 > '99999999999999.99'){
				    alert("输入的金额太大，请重新输入!");
				    txt_money.focus();
				    return;
				}
				txt_money.value=comma(temp) + amt1.substring(amt1.indexOf("."));
				return;							
			}
	    }
	}
    
    /**验证导入文件的类型只能是csv和txt*/
    function EntvalidateFileName(filepath)
	{
		var array = filepath.split(".");
		if(array.length == 0){
		   return false;  
		}
		var extendname = array[array.length-1].toLowerCase();
		if (extendname != "csv" &&  extendname != "txt" && extendname != "xls")
		{
			return false;
		}
		return true;
	}
    
    /**验证导入文件的类型,filepath为文件名, filePattrn为文件格式，比如csv,txt等 */
    function EntvalidateFileType(filepath,filePattrn)
	{
		var array = filepath.split(".");
		if(array.length == 0){
		   return false;  
		}
		var extendname = array[array.length-1].toLowerCase();
		if (extendname != filePattrn)
		{
			return false;
		}
		return true;
	}
    
    /**验证导入文件的类型只能是xml*/
    function EntvalidateFileNameXml(filepath)
	{
		var array = filepath.split(".");
		if(array.length == 0){
		   return false;  
		}
		var extendname = array[array.length-1].toLowerCase();
		if (extendname != "xml" )
		{
			return false;
		}
		return true;
	}
    /**
     * 校验文件后缀,
     * @param filepath
     * @param abledSuffix可用的小写文件后缀串,建议用特别字符（如|）将后缀连接
     * @return
     */
    function  checkFileSuffix(filepath,abledSuffix)
	{
		var array = filepath.split(".");
		if(array.length == 0){
		   return false;  
		}
		var extendname = array[array.length-1].toLowerCase();
		if (abledSuffix.indexOf(extendname)>-1)
		{
			return true;
		}
		return false;
	}  
    function validateName(acctname)
	{
	   //var patrn=/^[0-9]*$/;  
		 
		  var regu =  /[\#|＃|\/|／|\:|：|\%|％|\\|＼|\'|＇|’|\"|\||＼]/g ;
		  if(regu.test(acctname)){
		    	return true;
		   }
		    
	   if(checkStrMaxLength(acctname,60) == false){
		   return true;  
	   }
	   return false;
	}
    
  //根据下拉列表选择的值获取相对应的文本值
	function getText(eTmp,nHidden)
	{
		for(k=0;k<eTmp.length;k++){
			if(eTmp.options[k].selected==true){
				nHidden.value=eTmp[k].text;
			}
		}
	}
	//判定是否为数字
	function isNumber( s ){    
		 var regu = "^[0-9]+$";
		 var re = new RegExp(regu);
		 if (re.test(s)) {//为数字
		   return true;
		 }else{
		   return false;
		 }
	}
	
	//供应链金融翻页
	/**
	 * ChangeFlag:增减标示
	 * page:当前页数
	 * pageNo:总线上定义的当前页数id
	 * submitForm：提交表单Form id
	 */
	function turnPage(page,changeFlag,pageNo,submitForm){
		if(changeFlag=="ADD"){
			page=(page*1+1*1);			
			}
		if(changeFlag=="CUT"){
			page=(page*1-1*1);			
			}
		setValue(pageNo,page);
		 document.getElementById(submitForm).submit();
	}
	
	//供应链金融跳页
	/**
	 * pageNo:总线上定义当前页Id
	 * page:页面录入页码id
	 * TtlPageNum:总页数
	 * submitForm：提交表单Form id
	 */
	function jumpPage(pageNo,page,ttlPageNum,submitForm){
		 var inputpage=getValue(page);
		 if(!isNumber(inputpage)){   
		    	alert('请录入正确字符');		    	
		 	  	return false;   
		    }	
			if(inputpage*1>ttlPageNum*1 || inputpage*1<1){
				alert('输入的页码超限');				
				return false; 
			}
			setValue(pageNo,inputpage);
			 document.getElementById(submitForm).submit();;
	}
	//判定是否为空
	function isNull( s ){    
		 if (s==null || s=="") {//为空
		   return true;
		 }else{
		   return false;
		 }
	}
//判断生效日期、失效日期及系统日期的比较
	function dateValidate(effectdate,enddate,sysdate)
	{
		effectdate=effectdate.replace(/-/g,'');
		sysdate1=sysdate.replace(/-/g,'');
		if (effectdate<sysdate1)
		{
			alert("生效日期不能小于系统当天，系统日期："+ sysdate);
			return false;
		}
		if(!isNull(enddate))
		{
			enddate=enddate.replace(/-/g,'');
			if(enddate<effectdate)
			{
				alert("失效日期不能小于生效日期");
				return false;	
			}
		}
		return true;
	}
//电话验证
	function phoneValidate(payerphone)
	{
		if(payerphone.length>20)
		{
			alert("付款人电话输入非法");
			return  false;
		}
		var str="^[0-9]+\-[0-9]+$";
		var str1="^[0-9]{11}$";
		var re=new RegExp(str);
		var re1=new RegExp(str1);
		if(re.test(payerphone) || re1.test(payerphone))
		{
			return true;
		}else
		{
			alert("付款人电话输入非法");
			return false;
		}
	}
	//判定中文的长度
	function isCharLength(inputName , nlength){
		oldString = eval("document.all."+inputName+".value");
		pvalue = oldString;//trim(oldString);
		var count = 0;
		for(var i=0;i<pvalue.length;i++){
			if(pvalue.charAt(i).charCodeAt(0)>128){
				count+=3;
			}else
			{
				count+=1;
			}
		}
		 if(count>nlength)
		{
		//	alert("输入数据超长！最大长度为"+nlength+"字节");
		//	eval("document.runMaintenanceForm."+inputName+".focus()");
		//	eval("document.runMaintenanceForm."+inputName+".select()");
			return true;
		}
			return false;
	}
	//验证单笔/日/月累计限额
	function feehighValidate(single,day,month)
	{
		if(!isNull(single) && !isNull(day) && single-day>0)
		{
			alert("单笔金额上限不能大于日累计金额上限");
			return true;
		}
		if(!isNull(day) && !isNull(month) && day-month>0)
		{
			alert("日累计金额上限不能大于月累计金额上限");
			return true;
		}
	}	
	
	/**
	 * 清空select控件
	 * @param ctl select控件
	 * @param keepfirst 是否保留第一行option
	 */
	function clearSelectCtl(ctl,keepfirst)
	{
		if (!ctl.find) ctl=$(ctl);
		var s=keepfirst?"option:not(:first)":"option";
		var opts=ctl.find(s);
		opts.remove();
	}

	/**
	 * 消除select控件中的重复数据
	 * @param ctl select控件
	 * @param prop 判断重复数据的依据,取值为:value或text
	 */
	function uniqueSelectCtl(ctl,prop){
		if (!ctl.find) ctl=$(ctl);
		prop=prop || "value";
		var old=ctl.val();
		var opts=ctl.find("option").get();
		var arr=[];
		$.each(opts,function(i,item){
			var v=item[prop];
			if ($.inArray(v,arr)<0)
				arr.push(v);
			else
				$(item).remove();
		});
		ctl.val(old);
	}
	
	/**
	 * 将select控件的文本和值放到json数组中
	 * @param ctl select控件
	 * @param jsonArr json数组
	 * @param textName text在json对象中的属性名,默认是text
	 * @param valueName value在json对象中的属性名,默认是value
	 */
	function selectCtlToJsonArray(ctl,jsonArr,textName,valueName)
	{
		if (!ctl.find) ctl=$(ctl);
		textName=textName||"text";
		valueName=valueName||"value";
		var opts=ctl.find("option").get();
		$.each(opts,function(i,item){
			var json={};
			json[textName]=item.text;
			json[valueName]=item.value;
			jsonArr.push(json);
		});
	}
	
	/**
	 * 将json数组中的文本和值填充到select控件中
	 * @param jsonArr json数组
	 * @param ctl select控件
	 * @param textName text在json对象中的属性名,默认是text
	 * @param valueName value在json对象中的属性名,默认是value
	 */
	function jsonArrayToSelectCtl(jsonArr,ctl,textName,valueName)
	{
		if (!ctl.find) ctl=$(ctl);
		textName=textName||"text";
		valueName=valueName||"value";
		$.each(jsonArr,function(i,json){
			var opt=$("<option>");
			opt.attr("value",json[valueName]);
			opt.html(json[textName]);
			ctl.append(opt);
		});
	}
	
	/**
	 * 将对象转换成字符串
	 * @param o 要转换成字符串的对象
	 * @return 字符串，如果o未定义,则返回""
	 * @author wks
	 */
	function $S(o) {
		return (o == null) ? "" : o.toString();
	}
	
	/**
	 * 检测是否是空白字符串<br>
	 * 未定义变量,null,""," ",这些都是空白字符串
	 * @param s 要检测字符串
	 * @return 是否是空白字符串
	 */
	function isBlank(s) {
		return trim($S(s)).length == 0;
	}
	
	/**
	 * 是空白或者是零
	 * @param str 字符串
	 */
	function isBlankOrZero(str)
	{
		str=trim($S(str));
		return str=="" || str=="0";
	}
	
	/**
	 * 是空白或者是负数
	 * @param str 字符串
	 */
	function isBlankOrNegative(str)
	{
		str=trim($S(str));
		return str=="" || str<0;
	}
	
	/**
	 * @deprecated 对传入的字段进行是否是字母和汉字的组合
	 * @param text
	 * @return false表示传入的字段符合规则 true反之
	 */
	function validateText(text)
	{
	   var patrn=/^[0-9|a-zA-Z]*$/;  
	   if(!patrn.exec(text))
	   {   
	 	  return false;   
	   }
	   return true;
	}
	
	
	
	/*
	* 日期比较函数(公用调用方法,在页面上直接调用这个方法就行)
	* sysDate:系统日期
	* startDate:开始日期
	* endDate:结束日期
	* disMonth:月份跨度标志,如果为3,表示开始日期和结束日期最大跨度为3个月
	* dayFlag:历史天数标志 ,如果等于0表示当天，不等于表示历史，也就是当天的前一天
	* sumSpan:总的查询跨度限制,如果为3，表示只能查询3个月以内的数据，如果为''，则不判断此项
	* 返回 ：如果日期满足条件则返回true ,否则返回false 
	* yinweimin 2011-07-27
	*/
	  function dateValidation(sysDate,startDate,endDate,disMonth,dayFlag,sumSpan)   
	 { 
	    //将日期转换成日期格式
	    var sysdate = new Date(Date.parse(sysDate.replace(/-/g, "/"))); //系统日期
	    var strdate = new Date(Date.parse(startDate.replace(/-/g, "/"))); //开始日期
	    var finishdate = new Date(Date.parse(endDate.replace(/-/g, "/"))); //结束日期
	    
	    if(!checkDateCompare(strdate,finishdate,sysdate,dayFlag)){
	    	return false;
	    }
	    
		if(!checkDateSpan(strdate,finishdate,sysdate,disMonth,sumSpan))
		{
			return false;
		} 
		
		return true;
	}
	  
	  function dateValidation1(sysDate,startDate,endDate,disMonth,dayFlag,sumSpan)   
		 { 
		    //将日期转换成日期格式
		    var sysdate = new Date(Date.parse(sysDate.replace(/-/g, "/"))); //系统日期
		    var strdate = new Date(Date.parse(startDate.replace(/-/g, "/"))); //开始日期
		    var finishdate = new Date(Date.parse(endDate.replace(/-/g, "/"))); //结束日期
		    
		    if(!checkDateCompare(strdate,finishdate,sysdate,dayFlag)){
		    	return false;
		    }
		    
			if(!checkDateSpan1(strdate,finishdate,sysdate,disMonth,sumSpan))
			{
				return false;
			} 
			
			return true;
		}
		  function dateValidation2(sysDate,startDate,endDate,disMonth,dayFlag,sumSpan)   
			 { 
			    //将日期转换成日期格式
			    var sysdate = new Date(Date.parse(sysDate.replace(/-/g, "/"))); //系统日期
			    var strdate = new Date(Date.parse(startDate.replace(/-/g, "/"))); //开始日期
			    var finishdate = new Date(Date.parse(endDate.replace(/-/g, "/"))); //结束日期
			    
			    if(!checkDateCompare(strdate,finishdate,sysdate,dayFlag)){
			    	return false;
			    }
			    
				if(!checkDateSpan2(strdate,finishdate,sysdate,disMonth,sumSpan))
				{
					return false;
				} 
				
				return true;
			}
	  /*
		* 日期比较函数(公用调用方法,在页面上直接调用这个方法就行)
		* sysDate:系统日期
		* startDate:开始日期
		* endDate:结束日期
		* disMonth:月份跨度标志,如果为3,表示开始日期和结束日期最大跨度为3个月
		* dayFlag:历史天数标志 ,如果等于0表示当天，不等于表示历史，也就是当天的前一天
		* sumSpan:如果为3，表示只能查询3个月以内的数据，如果为''，则不判断此项
		* 返回 ：如果日期满足条件则返回true ,否则返回false 
		* WZY 2012-07-13
		*/
		  function checkdateValidation(sysDate,startDate,endDate,disMonth,dayFlag,sumSpan,startDateMsg,endDateMsg)   
		 { 
		    //将日期转换成日期格式
		    var sysdate = new Date(Date.parse(sysDate.replace(/-/g, "/"))); //系统日期
		    var strdate = new Date(Date.parse(startDate.replace(/-/g, "/"))); //开始日期
		    var finishdate = new Date(Date.parse(endDate.replace(/-/g, "/"))); //结束日期
		    
		    if(!checkDateComparesysdate(strdate,finishdate,sysdate,dayFlag,startDateMsg,endDateMsg)){
		    	return false;
		    }
		    
			if(!checkDateSpansysdate(strdate,finishdate,sysdate,disMonth,sumSpan,startDateMsg,endDateMsg))
			{
				return false;
			} 
			
			return true;
		}
	  
	  
	  /*
		* 校验日期 对其进行比较(结束日期不能小于开始日期,结束日期不能大于或者等于当天,开始日期不能大于或者等于当天)
		* strdate:开始日期
		* finishdate:结束日期
		* sysdate:系统日期
		* 以上三个日期均为日期格式
		* dayFlag:历史天数标志 ,如果等于0表示当天，不等于表示历史，也就是当天的前一天
		* 返回 ： 如果日期满足条件则返回true ,否则返回false 
		* yinweimin 2011-07-27
		*/
		function checkDateCompare(strdate,finishdate,sysdate,dayFlag)
		{ 
    
			if (dayFlag!=0){
				sysdate.setDate(sysdate.getDate()-1);
			}
			
			if ((sysdate - finishdate) <0)
			{
				if (dayFlag!=0){
						alert("截止日期不能大于等于当天");
					}else{		
						alert("截止日期不能大于当天");
				}
				return false;
			}
			
			if ((sysdate - strdate)<0)
			{
				if (dayFlag!=0){
					alert("开始日期不能大于等于当天");
				}else{		
					alert("开始日期不能大于当天");
				}

				return false;
			}
					
					
			if ((finishdate - strdate)<0)
			{
				alert("截止日期不能小于开始日期");
				return false;
			}
			else{
				return  true;
			}
					
		}
		/*
		* 校验日期 对其进行比较(结束日期不能小于开始日期,结束日期不能大于或者等于当天,开始日期不能大于或者等于当天)
		* strdate:开始日期
		* finishdate:结束日期
		* sysdate:系统日期
		* 以上三个日期均为日期格式
		* dayFlag:历史天数标志 ,如果等于0表示当天，不等于表示历史，也就是当天的前一天
		* 返回 ： 如果日期满足条件则返回true ,否则返回false 
		* WZY 2012-07-13
		*/
		function checkDateComparesysdate(strdate,finishdate,sysdate,dayFlag,strdateMsg,finishdateMsg)
		{ 
    
			if (dayFlag!=0){
				sysdate.setDate(sysdate.getDate()-1);
			}
			
			if ((sysdate - finishdate) <0)
			{
				if (dayFlag!=0){
						alert(finishdateMsg+'不能大于等于当天');
					}else{		
						alert(finishdateMsg+'不能大于当天');
				}
				return false;
			}
			
			if ((sysdate - strdate)<0)
			{
				if (dayFlag!=0){
					alert(strdateMsg+'不能大于等于当天');
				}else{		
					alert(strdateMsg+'不能大于当天');
				}

				return false;
			}
					
					
			if ((finishdate - strdate)<0)
			{
				alert(finishdateMsg+'不能小于'+strdateMsg);
				return false;
			}
			else{
				return  true;
			}
					
		}
	  /*
		* 校验日期 检查跨度(结束日期和开始日期是否超过跨度，开始日期是否在总跨度范围内)
		* strdate:开始日期
		* finishdate:结束日期
		* sysdate:系统日期
		* 以上三个日期均为日期格式
		* disMonth:月份跨度标志,如果为3,表示开始日期和结束日期最大跨度为3个月
		* sumSpan:总的查询跨度限制,如果为3，表示只能查询3个月以内的数据，如果为''，则不判断此项
		* 返回 ： 如果日期满足条件则返回true ,否则返回false 
		* yinweimin 2011-07-27
		*/
			
		function checkDateSpan(strdate,finishdate,sysdate,disMonth,sumSpan)
		{
			var tempstrdate = new Date(strdate);
			
			strdate.setMonth(strdate.getMonth()+disMonth);
			
			if ((strdate - finishdate)<=0)
			{
				alert("开始日期与截止日期跨度不能超过"+disMonth+"个月");
				return false;
			}

			strdate = tempstrdate;
			strdate.setMonth(strdate.getMonth()+sumSpan);
			
			if((strdate - sysdate ) <= 0){
				 
				alert("只能查询"+sumSpan+"个月以内的数据");
				return false;
			}
			else{
				return  true;
			}
		}
		function checkDateSpan1(strdate,finishdate,sysdate,disMonth,sumSpan)
		{
			var tempstrdate = new Date(strdate);
			
//			strdate.setMonth(strdate.getMonth()+disMonth);
			
			if ((finishdate -strdate)<=0)
			{
				alert("开始日期与截止日期跨度不能超过"+disMonth+"个月");
				return false;
			}

			strdate = tempstrdate;
//			strdate.setMonth(strdate.getMonth()+sumSpan);
//			alert(strdate);
//			alert(finishdate);
			if((finishdate - strdate ) <= 0){
				 
				alert("只能查询"+sumSpan+"个月以内的数据");
				return false;
			}
			else{
				return  true;
			}
		}
		function checkDateSpan2(strdate,finishdate,sysdate,disMonth,sumSpan)
		{
			var tempstrdate = new Date(strdate);
			if(disMonth > 0){
				strdate.setMonth(strdate.getMonth()+disMonth);
				if ((strdate - finishdate)<=0)
				{
					alert("开始日期与截止日期跨度不能超过"+disMonth+"个月");
					return false;
				}
			}
			if(sumSpan > 0){
				strdate = tempstrdate;
				strdate.setMonth(strdate.getMonth()+sumSpan);
				if((strdate - sysdate ) <= 0){
					 
					alert("只能查询"+sumSpan+"个月以内的数据");
					return false;
				}
			}
			return  true;
		}
		/*
		* 校验日期 检查跨度(结束日期和开始日期是否超过跨度，开始日期是否在总跨度范围内)
		* strdate:开始日期
		* finishdate:结束日期
		* sysdate:系统日期
		* strdateMsg:开始日期资源化信息
		* finishdateMsg:结束日期资源化信息
		* 以上三个日期均为日期格式
		* disMonth:月份跨度标志,如果为3,表示开始日期和结束日期最大跨度为3个月
		* sumSpan:总的查询跨度限制,如果为3，表示只能查询3个月以内的数据，如果为''，则不判断此项
		* 返回 ： 如果日期满足条件则返回true ,否则返回false 
		* WZY 2012-07-13
		*/
			
		function checkDateSpansysdate(strdate,finishdate,sysdate,disMonth,sumSpan,strdateMsg,finishdateMsg)
		{
			var tempstrdate = new Date(strdate);
			
			strdate.setMonth(strdate.getMonth()+disMonth);
			
			if ((strdate - finishdate)<=0)
			{
				alert(strdateMsg+finishdateMsg+"跨度不能超过"+disMonth+"个月");
				return false;
			}

			strdate = tempstrdate;
			strdate.setMonth(strdate.getMonth()+sumSpan);
			
			if((strdate - sysdate ) <= 0){
				 
				alert("只能查询"+sumSpan+"个月以内的数据");
				return false;
			}
			else{
				return  true;
			}
		}
		
		/*
		 * 电票专用
		* 日期比较函数(电票交易公共调用方法,在页面上直接调用这个方法就行)
		* billStartDate:出票开始日期
		* billEndDate:出票结束日期
		* termStartDate:到期开始日期，如果没有此字段，则传空
		* termEndDate:到期结束日期，如果没有此字段，则传空
		* disMonth:月份跨度标志,如果为3,表示开始日期和结束日期最大跨度为3个月
		* dayFlag:历史天数标示当天，不等于表示历史，也就是当天的前一天
		* sumSpan:总的查询跨度限制,如果为3志 ,如果等于0表，表示只能查询3个月以内的数据，如果为''，则不判断此项
		* 返回 ：如果日期满足条件则返回true ,否则返回false 
		* yinweimin 2011-08-01
		*/
		  function dateDraftValidation(sysDate,billStartDate,billEndDate,termStartDate,termEndDate,disMonth,dayFlag,sumSpan)   
		 { 
		    //将日期转换成日期格式
		    var sysdate = new Date(Date.parse(sysDate.replace(/-/g, "/"))); //系统日期
		    var billstrdate = new Date(Date.parse(billStartDate.replace(/-/g, "/"))); //出票开始日期
		    var billfinishdate = new Date(Date.parse(billEndDate.replace(/-/g, "/"))); //出票结束日期
		    var termstrdate = "" ; 		//到期日期
		    var termfinishdate = ""; 	//到期日期
		    
		    if(termStartDate != '' && termEndDate != ''){
		    	termstrdate = new Date(Date.parse(termStartDate.replace(/-/g, "/"))); //到期日期
			    termfinishdate = new Date(Date.parse(termEndDate.replace(/-/g, "/"))); //到期日期
		    }
		    
		    if(!checkDraftDateCompare(billstrdate,billfinishdate,termstrdate,termfinishdate,sysdate,dayFlag)){
		    	return false;
		    }
		    
			if(!checkDraftDateSpan(billstrdate,billfinishdate,sysdate,disMonth,sumSpan,1))
			{
				return false;
			}
			if(!checkDraftDateSpan(termstrdate,termfinishdate,sysdate,disMonth,sumSpan,2))
			{
				return false;
			}
			
			return true;
		}
		  
		  
		  /*电票专用
			* 校验日期 对其进行比较(结束日期不能小于开始日期,结束日期不能大于或者等于当天,开始日期不能大于或者等于当天)
			* billStartDate:出票开始日期
			* billEndDate:出票结束日期
			* termStartDate:到期开始日期，如果没有此字段，则传空
			* termEndDate:到期结束日期，如果没有此字段，则传空
			* sysdate:系统日期
			* dayFlag:历史天数标志 ,如果等于0表示当天，不等于表示历史，也就是当天的前一天
			* 返回 ： 如果日期满足条件则返回true ,否则返回false 
			* yinweimin 2011-08-01
			*/
			function checkDraftDateCompare(billstrdate,billfinishdate,termstrdate,termfinishdate,sysdate,dayFlag)
			{ 
	    
				if (dayFlag!=0){
					sysdate.setDate(sysdate.getDate()-1);
				}
				
				if ((sysdate - billfinishdate) <0)
				{
					if (dayFlag!=0){
							alert("出票截止日不能大于等于当天");
						}else{		
							alert("出票截止日不能大于当天");
					}
					return false;
				}
				
				if ((sysdate - billstrdate)<0)
				{
					if (dayFlag!=0){
						alert("出票起始日不能大于等于当天");
					}else{		
						alert("出票起始日不能大于当天");
					}

					return false;
				}
						
				
				if ((billfinishdate - billstrdate)<0)
				{
					alert("出票截止日不能小于出票起始日");
					return false;
				}
				
				if(termstrdate !='' && termfinishdate!=''){
					if ((termfinishdate - termstrdate)<0)
					{
						alert("到期截止日不能小于到期起始日");
						return false;
					}
				}
				
				return  true;
						
			}
		
		  /*
		   * 电票专用
			* 校验日期 检查跨度(结束日期和开始日期是否超过跨度，开始日期是否在总跨度范围内)
			* billStartDate:出票开始日期
			* billEndDate:出票结束日期
			* sysdate:系统日期
			* disMonth:月份跨度标志,如果为3,表示开始日期和结束日期最大跨度为3个月
			* sumSpan:总的查询跨度限制,如果为3，表示只能查询3个月以内的数据，如果为''，则不判断此项
			* 返回 ： 如果日期满足条件则返回true ,否则返回false 
			* yinweimin 2011-08-01
			*/
			function checkDraftDateSpan(billstrdate,billfinishdate,sysdate,disMonth,sumSpan,flag)
			{
				if(billstrdate=='' || billfinishdate=='')
					return true;

				var tempbillstrdate = billstrdate;
				billstrdate.setMonth(billstrdate.getMonth()+disMonth);
				
				if ((billstrdate - billfinishdate)<=0)
				{
					if(flag==1)
						alert("出票起始日与出票截止日跨度不能超过"+disMonth+"个月");
					else
						alert("到期起始日与到期截止日跨度不能超过"+disMonth+"个月");
					return false;
				}
				billstrdate = tempbillstrdate;
				billstrdate.setMonth(billstrdate.getMonth()-disMonth+sumSpan);
				if((billstrdate - sysdate ) <= 0){
					 
					alert("只能查询"+sumSpan+"个月以内的数据");
					return false;
				}
				return  true;
			}
			
			/**
			 * 针对指令查询维护日期类型为期望日期的特有方法
			 * @param startDate	开始日期
			 * @param endDate	截止日期
			 * @param sysDate	系统日期
			 * @param disMonth  开始日期与截止日期之间的跨度
			 * @param sumSpan   总的查询跨度
			 * @return
			 * 2011-8-01 yinweimin
			 */
			function checkDateForOrder(startDate,endDate,sysDate,disMonth,sumSpan){
				var strdate = new Date(Date.parse(startDate.replace(/-/g, "/"))); //开始日期
			    var finishdate = new Date(Date.parse(endDate.replace(/-/g, "/"))); //结束日期
			    var sysdate = new Date(Date.parse(sysDate.replace(/-/g, "/"))); //结束日期
			    
			    if ((finishdate - strdate)<0)
				{
					alert("截止日期不能小于开始日期");
					return false;
				}
				
			    if(!checkDateSpan(strdate,finishdate,sysdate,disMonth,sumSpan)){
				    return false;
			    }
			    return true;
			}
			/**
			 * 功能：把页面class = className 的按钮置灰
			 * 2011-12-22 lijianwei
			 */
			function displayButton(className){
				$("."+className).attr('disabled',true);
			}
			
			/**
			 * e商宝批量交易录入的有效性检查.
			 * 总金额、总笔数、上传文件、取商户名称和商户号
			*/
			function checkEbusiBatchInputValues() {
				var totalamt = $("#totalamt").val();
				if(totalamt == null || totalamt == ''){
					//总金额不能为空
					alert('总金额不能为空');
				    $("#sumamt").focus();
					return false;
				}
				
				var totalcount = $("#totalcount").val();
				if(totalcount == null || totalcount == ''){
					//总笔数不能为空
					alert('总笔数不能为空');	
					 $("#totalcount").focus();

					return false;
				}
				//获得欲导入的文件路径及文件名称
				var filepath = document.getElementById("uploadfile").value;    
				if(filepath == ''){
					
					alert('请选择需要导入的批量文件!');
					return false;
				}
				//验证文件名是否正常
				if (!EntvalidateFileName(filepath)) {
					alert('您导入的文件格式不正确，请重新导入！');
					return false;
				}
				//验证总笔数
				var sumorder = $("#totalcount").val();				
				if(!validateEbusiBatchSumorder(sumorder)){					
					 $("#totalcount").focus();
					return false;
				}
				return true;
			}
			
			/**
		       验证e商宝批量交易的总笔数是否合法.
		    */
			function validateEbusiBatchSumorder(sumorder){
				var pattern=/^[1-9]+[0-9]{0,3}$/;

				if(!pattern.exec(sumorder)){
					alert('总笔数格式不正确');
					return false;
				}
				
				return true;
			}			
			
			
			/**
			 * 检查预约日期是否超出了网银最大转账期限
			 * @param sysdate 网银系统日期
			 * @param orderdate 预约日期
			 * @param orderlimit  预约期限
			 */
			function checkOrderDateLimit(sysdate, orderdate,orderlimit){
				
				//将日期转化为Date类型
				var maxdate_ = new Date(Date.parse(sysdate.replace(/-/g, "/"))); //网银系统日期
			    var orderdate_ = new Date(Date.parse(orderdate.replace(/-/g, "/"))); //预约日期
			    
			    //系统日期+预约期限
			    maxdate_.setDate(maxdate_.getDate() + eval(orderlimit));
			    
			    if(maxdate_ < orderdate_){
			    	alert("预约日期距本日不得超过 "+orderlimit + " 天");
					return false;
			    }
			    
			    return true;
				
			}

			
			/**
			 * 针对国际结算日期校验的特有方法
			 * @param minDate	最小日期
			 * @param maxDate	最大日期
			 * @param sysDate	系统日期
			 * @param disMonth  跨度
			 * @param minMsg    最小值信息
			 * @param maxMsg    最大值信息
			 * @return 返回的Boolean值
			 * 2012-03-16 YangHongWei
			 */
			function checkDateDiff(minDate,maxDate,sysDate,disMonth,minMsg,maxMsg) {
				//截取最大日期 
				var maxDateYear = maxDate.substring(0,4); 
			    var maxDateMonth = maxDate.substring(5,7); 
			    var maxDateDay = maxDate.substring(8); 
			    //截取最小日期
				var minDateYear = minDate.substring(0,4); 
			    var minDateMonth = minDate.substring(5,7); 
			    var minDateDay = minDate.substring(8);
			    //截取系统日期
				var sysDateYear = sysDate.substring(0,4); 
			    var sysDateMonth = sysDate.substring(5,7); 
			    var sysDateDay = sysDate.substring(8);

					
				var myStrDate = new Date(minDateMonth + "-" + minDateDay + "-" + minDateYear);
				var myEndDate = new Date(maxDateMonth + "-" + maxDateDay + "-" + maxDateYear);
				var mySysDate = new Date(sysDateMonth + "-" + sysDateDay + "-" + sysDateYear);
				
				//日期比较
				if(myStrDate>myEndDate){
					//最小日期不能大于最大日期
					alert(minMsg + '不能大于' + maxMsg);
					return false;
				}

				if(myEndDate>mySysDate){
					//最大日期不能大于当天
					alert(maxMsg + '不能大于当天');
					return false;
				}
				
				if(myStrDate>mySysDate){
					//最小日期不能大于当天
					alert(minMsg + '不能大于当天');
					return false;
				}
				
				//跨度校验
				myStrDate.setMonth(myStrDate.getMonth() + disMonth);
				if ((myStrDate - myEndDate) <= 0) {
					//最大日期和最小日期跨度不能超过disMonth个月
					alert(maxMsg + minMsg + '跨度不能超过' + disMonth + '个月');
					return false;
				} else {
					return  true;
				}
				
				return true;
			}
			
			/**
			 * 针对国际结算最大金额和最小金额校验的特有方法
			 * @param minAmount	最小金额
			 * @param maxAmount	最大金额
			 * @param minMsg    最小值信息
			 * @param maxMsg    最大值信息
			 * @return 返回的Boolean值
			 * 2012-03-19 YangHongWei
			 */
			function checkAmount(minAmount,maxAmount,minMsg,maxMsg) {
				minAmount=minAmount.replace(/,/g,'');
				maxAmount=maxAmount.replace(/,/g,'');
				if((parseFloat(maxAmount) - parseFloat(minAmount)) < 0) {
					//最小金额不能大于最大金额
					alert(minMsg + '不能大于' + maxMsg);
					return false;
				}
				return true;
			}
		/**
		 * 交易跳转时左侧菜单的初始化
		 * @param url 即将跳转页面的url
		 * 2012-07-11 YangHongWei
		 */
		 function leftmenuset(url) {
			var setUrl= url;
			var uls = document.getElementsByTagName("ul");
			for (i = 0; i < uls.length; i++) {
			    if (uls[i].className == "leftMenuList") {
				    var menu = uls[i];
				    var items = menu.getElementsByTagName("a");    	   
				    	  
				    for (var i=0; i < items.length; i++)  {
				    	var url = items[i].getAttribute("href");
				    	var index = url.indexOf(setUrl); 			
				    	if (index > 0) {
				    		 setCookie("leftMenuSelected", i);
				    	     break;
				    	}
				    }
			   	break;
			  }
			}
		 }
			
			/**
			 * 功能：把页面 的按钮置灰times毫秒;默认3000ms
			
			 */
			 function reUsedBtn(btnID,times){
				 $("#"+btnID).attr("disabled",true);
				 var t=3000;
			     if(times){
			       t=times;
			     }
				 setTimeout(function(){$("#"+btnID).attr("disabled",false);},t);
		 
				 }
			
			
			
			
			
			 function disabledElement(obj,times){
				 obj.disabled=true;
				 var t=3000;
			     if(times){
			       t=times;
			     }
				 setTimeout(function(){ obj.disabled=false;},t);
		 
				 }			
			

			
			/**
			 * 根据查询标志获取开始日期和截止日期 （账户历史明细查询专用）
			 * @param queryfalg:查询标志 0:一周   1：本月  2：一个月　3:三个月
			 * @param baflag:标识是前/后 （一周/一月/三个月）  0：前 1：后，默认值为0
			 * @param querydate:查询日期 （点击页签时该值为当前系统日期，baflag为0时，则该值为当前查询的开始日期，baflag为1时，则该值为当前查询日期的截止日期） 
			 * @param sysdate_:当前网银系统日期
			 * @param sdname:页面上定义的开始日期域名（注：传入后台的名称即日期隐含域的名称）
			 * @param sdname:页面上定义的截止日期域名（注：传入后台的名称即日期隐含域的名称）
			 * 调用范例：getQueryDate("0","2012-03-05","strdate","enddate");
			 * yinweimin
			 * 2012-06-26
			 */
			function getQueryDate(queryflag,baflag,querydate_,sysdate_,sdname,edname){
				//定义开始日期和截止日期
				var startdate = "";
				var enddate ="";
				
				//将系统日期转换成日期对象
				var sysdate = new Date(Date.parse(sysdate_.replace(/-/g, "/")));
				var querydate = new Date(Date.parse(querydate_.replace(/-/g, "/"))); 
				
				if(baflag == "0" ){
					//截止日期为当前开始日期的前一天
					querydate.setDate(querydate.getDate()-1);
					enddate = querydate.getFullYear()+"-"+(querydate.getMonth()+1)+"-"+querydate.getDate();
					querydate.setDate(querydate.getDate() + 1);
					enddate = formateDate(enddate);
					$("#"+edname).val(enddate);
					//获取开始日期
					getQueryDateBefore(queryflag,querydate,sdname);
				}else{
				    
					//开始日期为当前查询日期后一天
					querydate.setDate(querydate.getDate() + 1);
					startdate = querydate.getFullYear()+"-"+(querydate.getMonth()+1)+"-"+querydate.getDate();
					querydate.setDate(querydate.getDate()-1);
					
					startdate = formateDate(startdate);
					$("#"+sdname).val(startdate);
					
					//获取截止日期
					getQueryDateAfter(queryflag,querydate,edname);
				}
				
				//截止日期大于系统日期时，若截止日期与系统日期是同一个月，则将截止日期设为当前系统日期
				var enddate_ = new Date(Date.parse($("#"+edname).val().replace(/-/g, "/")));
				if(enddate_ >= sysdate){
					if(enddate_.getMonth() == sysdate.getMonth()){
						sysdate.setDate(sysdate.getDate()); 
						 enddate = sysdate.getFullYear()+"-"+(sysdate.getMonth()+1)+"-"+sysdate.getDate();
						 enddate = formateDate(enddate);
						 $("#"+edname).val(enddate);
					}
				}
				
			}
			
			
			/**
			 * 获取开始日期
			 * @param queryflag
			 * @param querydate
			 * @param sdname
			 * @param edname
			 */
			function getQueryDateBefore(queryflag,querydate,sdname){

				//根据查询标志获取开始日期
				if(queryflag == '0'){
					//一周（开始日期为当前日期减七）
					querydate.setDate(querydate.getDate() - 7);
					startdate = querydate.getFullYear()+"-"+(querydate.getMonth()+1)+"-"+querydate.getDate();
				} else if(queryflag == '1'){
					//本月 (开始日期为截止日期所在月的一号)
					querydate.setDate(querydate.getDate() - 1);
					querydate.setDate(1);
					startdate = querydate.getFullYear()+"-"+(querydate.getMonth()+1)+"-"+querydate.getDate();
					
				}else if(queryflag == '2'){
					//一个月 (开始日期为上月今天如若没有，则为下月第一天)
					var temp = querydate.getDate();
					querydate.setMonth(querydate.getMonth() - 1);
					if(temp != querydate.getDate()){
						querydate.setDate(1);
						//querydate.setDate(querydate.getDate() - 1);
					}
					startdate = querydate.getFullYear()+"-"+(querydate.getMonth()+1)+"-"+querydate.getDate();
					
				}else if(queryflag == '3'){
					//三个月 (开始日期为三月前的今天，如若没有，则为下一月第一天)
					
					var temp = querydate.getDate();
					querydate.setMonth(querydate.getMonth() - 3);
					if(temp != querydate.getDate()){
						querydate.setDate(1);
						//querydate.setDate(querydate.getDate() - 1);
					}
					startdate = querydate.getFullYear()+"-"+(querydate.getMonth()+1)+"-"+querydate.getDate();
				}
			
				//将开始日期与截止日期转换成字符串并赋值于表单中
				startdate = formateDate(startdate);
				$("#"+sdname).val(startdate);
			}
			
			/**
			 * 获取截止日期
			 * @param queryflag
			 * @param querydate
			 * @param edname
			 */
			function getQueryDateAfter(queryflag,querydate,edname){
				//根据查询标志获取开始日期
				if(queryflag == '0'){
					//一周（截止日期为当前日期加七）
					querydate.setDate(querydate.getDate() + 7);
					enddate = querydate.getFullYear()+"-"+(querydate.getMonth()+1)+"-"+querydate.getDate();
				} else if(queryflag == '1'){
					//本月 (截止日期为下一月末)
					querydate.setMonth(querydate.getMonth() + 2);
					querydate.setDate(1);
					querydate.setDate(querydate.getDate() );
					enddate = querydate.getFullYear()+"-"+(querydate.getMonth()+1)+"-"+querydate.getDate();
					
				}else if(queryflag == '2'){
					//将截至日期的最后一天加一天   看是否月份有变化
					querydate.setDate(querydate.getDate()+1);
					var MonthTmp=querydate.getMonth()+1;
					querydate.setDate(querydate.getDate()-1);
					//如果月份不相等的话 说明 次 日期 是本月的 最后一天 （及截至日期是本月的最后一天，如果向后加一个月，则就是下个月的月末）
					if((querydate.getMonth()+1) != MonthTmp){
						querydate.setDate(querydate.getDate()-15);
						querydate.setMonth(querydate.getMonth() + 1);
						enddate = querydate.getFullYear()+"-"+(querydate.getMonth()+1)+"-"+getEndDay(querydate);
						}
					else{
					querydate.setMonth(querydate.getMonth() + 1);
					enddate = querydate.getFullYear()+"-"+(querydate.getMonth()+1)+"-"+querydate.getDate();
					}
				
				}else if(queryflag == '3'){
					//三个月 (截止日期为下三月的今天)
					var temp = querydate.getDate();
					querydate.setMonth(querydate.getMonth() + 3);
					if( querydate.getDate() != temp){
						querydate.setDate(1);
						querydate.setDate(querydate.getDate());
					}
					//querydate.setDate(1);
					//querydate.setDate(querydate.getDate() - 1);
					enddate = querydate.getFullYear()+"-"+(querydate.getMonth()+1)+"-"+querydate.getDate();
				}
			
				//将开始日期与截止日期转换成字符串并赋值于表单中
				enddate = formateDate(enddate);
				$("#"+edname).val(enddate);
			}
			
			
			
			
			function getEndDay(dt){
				dt.setDate(1);
				dt.setMonth(dt.getMonth()+1);
				var cdt=new Date(dt.getTime()-1000*60*60*24);
				return cdt.getDate();
			}
			/**
			 * 格式化日期为YYYY-MM-DD
			 * @param date
			 * @returns {String}
			 */
			function formateDate(date){
				
				var date_ = date.split("-");
				if(date_[1] < 10 ){
					date_[1] = "0" + date_[1];
				}
				if(date_[2] < 10){
					date_[2] = "0" + date_[2];
				}
				
				return date_[0]+"-"+date_[1] + "-" + date_[2];
				
			}
			
			
			/**
			 * 打印指定区域的内容
			 * @return
			 */
			function prtPage3()
			{
					//打印：隐藏页面导航条显示
					$(".transaction_step").hide();
				
					var  Bdhtml=window.document.body.innerHTML;
					var  sprnstr3="<!-- StartOfPrinterFriendlyPage3 -->";
					var  eprnstr3="<!-- EndOfPrinterFriendlyPage3 -->";
					var prnhtml3=Bdhtml.substring(Bdhtml.indexOf(sprnstr3)+36) ;
					prnhtml3=prnhtml3.substring(0,prnhtml3.indexOf(eprnstr3));
					
					var OpenWindow = window.open("");
				    OpenWindow.document.write('<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">');
				    OpenWindow.document.write('<html xmlns="http://www.w3.org/1999/xhtml">');
				    OpenWindow.document.write("<HEAD>");
				    OpenWindow.document.write('<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>');
				        
				    OpenWindow.document.write('<link rel=\"stylesheet\" type=\"text/css\" media="all" href=\"../../styles/default.css\" />');
				    OpenWindow.document.write('<link rel=\"stylesheet\" type=\"text/css\" media="all" href=\"../../styles/nicetabs.css\" />');
//				    OpenWindow.document.write('<link rel=\"stylesheet\" type=\"text/css\" media="all" href=\"../../styles/xtree.css\" />');
				    OpenWindow.document.write('<link rel=\"stylesheet\" type=\"text/css\" media="all" href=\"../../styles/jmesa.css\" />');
				    OpenWindow.document.write('<link rel=\"stylesheet\" type=\"text/css\" media="all" href=\"../../styles/jmesa-pdf.css\" />');
				    OpenWindow.document.write('<link rel=\"stylesheet\" type=\"text/css\" media="all" href=\"../../styles/calendar-aqua/theme.css\" />');
				    OpenWindow.document.write('<link rel=\"stylesheet\" type=\"text/css\" media="all" href=\"../../styles/table.css\" />');
//				    OpenWindow.document.write('<link rel=\"stylesheet\" type=\"text/css\" media="all" href=\"../../styles/newmenu.css\" />');
				    OpenWindow.document.write('<link rel=\"stylesheet\" type=\"text/css\" media="all" href=\"../../styles/ui201401/style.css\" />');
				        
				    OpenWindow.document.write("<\/HEAD>");
				    OpenWindow.document.write("<BODY>");
				    OpenWindow.document.write("<\/BODY>");
				    OpenWindow.document.write("<\/HTML>");
				        
				    OpenWindow.document.body.innerHTML=prnhtml3; 
				    OpenWindow.document.close();
				    OpenWindow.print();
				    OpenWindow.close();
					 //结束打印：恢复页面导航条显示
			        $(".transaction_step").show();
			}
			

		
			//新UI提示信息模块
			function newHelpMessage(titleMsg, Hmsg)
			{
				list="";
				list+='<div class="tishixinxi">';
				list+='<div class="tishixinxi_h">'+titleMsg+'</div>';             
				list+='<div class="tishixinxi_body tishixinxi_xx">';
				list+='<ul>';
					for(i=1;i<Hmsg.length;i++)
					{
						list+='<li>'+Hmsg[i]+'</li>';
					}
				list+='</ul>';
				list+='</div>';
				list+='</div>';
				
				document.write(list);	
				
			}
			
			//新UI步骤模块
		   	function process(sign, sum_step, step, stepNameArr)
		   	{
			   var width = (sum_step<2)?50:(100)/sum_step;
			   var tag_li_begin = "<li style=\"width:"+width+"%\">";
			   var tag_li_begin_on = "<li class=\"on\" style=\"width:"+width+"%\">";
			   var tag_li_end = "</li>";
			   
			   listView = "";
			   listView += ' <div class = "transaction_step">';
			   listView += ' <ul>';
			   
			   for (i=0; i<sum_step; i++) {
				   if ((i+1)==step) {
					   listView += '<li class="step_wrap_'+(i+1)+' on">' + '<i class=\"step_'+(i+1)+'\">' + stepNameArr[i+1] + '</i>' +tag_li_end;
				   } else {
					   listView += '<li class="step_wrap_'+(i+1) + '">' + '<i class=\"step_'+(i+1)+'\">' + stepNameArr[i+1] + '</i>' +tag_li_end;
				   }
			   }
			   listView += '</ul>';
			   if(sign=="2")
				{				  
				   listView+='<label style="float:right; cursor: pointer;" onclick="prt()">';
				   listView+='<img src="../../images/ui201401/dayin.png">';
				   listView+='</label>';
				}
				else
				{
				
				}
			   listView += '</div><br><br><br>';  
			   document.write(listView);
		   	}
		   	//点击页面按钮，页面增加新内容时，主页面与左侧菜单的高度显示需要重新比较
		   	function navContentLength(){
		   		var lh = $(".mainLeftBox").css("height");
		   		var ch = $(".transaction_content_n").css("height");
		   		
		   		if(parseInt(lh)<(parseInt(ch))){
		   			var conheight = parseInt(ch)+20;
		   			$(".transaction_content").css("height",conheight+"px");
		   		}else{
		   			var conheight=parseInt(lh);
		   			$(".transaction_content").css("height",conheight+"px");
		   		}
		   		
		   	}
		   	var isIE=!!window.ActiveXObject;
		    var isIE6=isIE&&!window.XMLHttpRequest;
		   	//新UI交易结果提交成功页面图片显示
		   	function jiaoyisuccess(successMessage){
		   		var content="";
		   		content+='<div class="trading_success">';
		   		content+='<div class="trading_success_top">';
		   		if(isIE && isIE6){
		   			content+='<h4><img src="../../images/ui201401/tijiaocg.jpg"></h4>';
		   		}else{
		   			content+='<h4><img src="../../images/ui201401/tijiaocg.png"></h4>';
		   		}
		   		content+='<p>';	
		   		content+=successMessage;
		   		content+='</p>';
		   		content+='</div>';
		   		content+='</div>';  
		   		document.write(content);
		   	}
		   	//新UI交易结果交易成功页面图片显示
		   	function jiaocg(successMessage){
		   		var content="";
		   		content+='<div class="trading_success">';
		   		content+='<div class="trading_success_top">';
		   		if(isIE && isIE6){
		   			content+='<h4><img src="../../images/ui201401/jiaoyicg.jpg"></h4>';
		   		}else{
		   			content+='<h4><img src="../../images/ui201401/jiaoyicg.png"></h4>';
		   		}
		   		content+='<p>';	
		   		content+=successMessage;
		   		content+='</p>';
		   		content+='</div>';
		   		content+='</div>';  
		   		document.write(content);
		   	}
		   	//新UI交易温馨提示图片显示
		   	function jiaoyitishi(jiaoyitishiMessage){
		   		var content="";
		   		content+='<div class="trading_tishi">';
		   		content+='<div class="trading_tishi_top">';
		   		if(isIE && isIE6){
		   			content+='<h4><img src="../../images/ui201401/jiaoyitishi.jpg"></h4>';
		   		}else{
		   			content+='<h4><img src="../../images/ui201401/jiaoyitishi.png"></h4>';
		   		}
		   		content+='<p>';	
		   		content+=jiaoyitishiMessage;
		   		content+='</p>';
		   		content+='</div>';
		   		content+='</div>';  
		   		document.write(content);
		   	}
		  //新UI交易失败图片显示
		   	function jiaoyifail(failMessage){
		   		var content="";
		   		content+='<div class="trading_false">';
		   		content+='<div class="trading_false_top">';
		   		if(isIE && isIE6){
		   			content+='<h4><img src="../../images/ui201401/jiaoyisb.jpg"></h4>';
		   		}else{
		   			content+='<h4><img src="../../images/ui201401/jiaoyisb.png"></h4>';
		   		}
		   		
		   		content+='<p>';	
		   		content+=failMessage;
		   		content+='</p>';
		   		content+='</div>';
		   		content+='</div>';  
		   		document.write(content);
		   	}
		   	/*在$( "#id" ).dialog调用时，页面需要有阴影遮挡，IE6的一级菜单header_first、右键快捷菜单safety-tips需要重新设置不带z-index的样式*/
		   	function headRightRemoveZindex(){
				$("#header_first").removeClass("header_first").addClass("header_first_noindex");
				$("#safety-tips").removeClass("safety-tips").addClass("safety-tips_noindex");				
		   	}
			/*在$( "#id" ).dialog对话框关闭后，重新恢复header_first、safety-tips的z-index样式，*/
		   	function headRightAddZindex(){
		   		$("#header_first").removeClass("header_first_noindex").addClass("header_first");
				$("#safety-tips").removeClass("safety-tips_noindex").addClass("safety-tips");
		   	}
		   
		   
			//校验客户经理代码字段长度限制
			 function khjldmValidate(object){
		   		txt =  $("#"+object).val();
		   		if(null == trim(txt) || trim(txt) == '')                                                                 
		   		{                                                                                                      
		   		 $("#"+object).attr("value","");
		   		 return true;
		   		}else{
		   			var patrn=/^[0-9]{1,8}$/;  
		   			   if(!patrn.exec(trim(txt)))
		   			   {  
		   				   alert('"客户经理代码"为小于等于8位的数字');
		   			 	  return false;   
		   			   }else{
		   				return true;
		   			   }
		   		}
		   	}
			//校验客户经理代码字段长度限制
			function khjldmValidateS(txt){
		   		if(null == trim(txt) || trim(txt) == '')                                                                 
		   		{                                                                                                      
		   		 $("#"+object).attr("value","");
		   		 return true;
		   		}else{
		   			var patrn=/^[0-9]{1,8}$/;  
		   			   if(!patrn.exec(trim(txt)))
		   			   {  
		   				   alert('"客户经理代码"为小于等于8位的数字');
		   			 	  return false;   
		   			   }else{
		   				return true;
		   			   }
		   		}
		   	}
			 //比较两个日期的大小
			 function checkdate2(id,id2){
			      var billdatevalue = document.getElementById(id).value;
			   	  var paydatevalue = document.getElementById(id2).value;
			   	  var year,month,day;
				  var year2,month2,day2;
				  year=billdatevalue.substr(0,4);
				  month=billdatevalue.substr(5,2);
				  day=billdatevalue.substr(8,2);
				
				  year2=paydatevalue.substr(0,4);
				  month2=paydatevalue.substr(5,2);
				  day2=paydatevalue.substr(8,2);
				  var date1 = new Date(month+"-"+day+"-"+year);
				  
				  var date2 = new Date(month2+"-"+day2+"-"+year2);
				  if ((date1 - date2 ) > 0)
					{
						alert("发票起始日必须小于等于付款日！");
						return false;
					}else{
						return true;
					}
			    }
//将optionName包含middleVal的值加粗加红
function changeBoldRed(optionName,middleVal){
		var length1=optionName.indexOf(middleVal);
		if(length1>=0){
			var front=optionName.substr(0,length1);
			var last=optionName.substr(length1+middleVal.length);
			optionName=front+'<b style="color:#F00">'+middleVal+'</b>' +last;
		}
		return optionName;
}	

/**
* 对金额进行转换11位整数两位小数，将金额转换为以元为单位，小数点后有两位
* 例：输入域1234，转换后隐含域为1234.00
* @param {String} 表单名称
* @param {String} 要转换的金额输入框名称
* @param {String} 金额隐藏域名称
*/
function convertMoneyFor11(formName,txtmoney,hidmoney){
    var tonumber;
    var re = /,/g;
    var txt_money = eval("document."+formName+"."+txtmoney);
    var hid_money = eval("document."+formName+"."+hidmoney);
    if (txt_money.value != ""){
    	var temp = trim(txt_money.value);
    	if (temp == ""){
    		alert("请输入正确的金额数字!");
    		txt_money.value="";
				hid_money.value="";
				txt_money.focus();
    		return;
    	}
    }
    tonumber = addZero((trim(txt_money.value)).replace(re,""));

    txt_money.value = "";
    hid_money.value = "";
   if (tonumber !="" && tonumber!=null){
   	rep = / /g;
		var amt = tonumber.replace(rep,"");
		
		for(var j = 0; j < amt.length; j++){
			if(isNaN(parseInt(amt.charAt(j),10)) && amt.charAt(j)!="," && amt.charAt(j)!=".") {
				alert("请输入正确的金额数字!");
				txt_money.value="";
				hid_money.value="";
				txt_money.focus();
				return;
			}
		}
		if(amt.indexOf(".")!=amt.lastIndexOf(".")){
			alert("请输入正确的金额数字!");
			txt_money.focus();
			return;
		}
	
		re = /,/g;
		var amt1 = amt.replace(re,"");

		var amt2=parseFloat(amt1);		
		if(amt2<=0){
			alert("输入的金额不能小于或等于零,请重新输入!");
			txt_money.focus();
			return;
		}else{		//大于0的正数;
			if(amt1.indexOf(".")!=-1){				
				var str = amt1.substr(amt1.indexOf(".")+1);				
				if(str.length>2){
					alert("输入的金额小数点后只能保留两位,请重新输入!");
					txt_money.focus();
					return;
				}else if(str.length==1){
					amt1=amt1 + "0";
				}else if(str.length<1){
					amt1=amt1 + "00";
				}
			}else{
				amt1=amt1 + ".00";
			}
			if(amt1.charAt(0)=='0' && amt1.indexOf(".")!=1){
			alert("请输入正确的金额数字!");
			txt_money.focus();
			return;
			}
			hid_money.value=amt1;
			var temp=amt1.substring(0,amt1.indexOf("."));
			if (temp.length > 11 || amt1 > '99999999999.99'){
			    alert("输入的金额太大，请重新输入!");
			    txt_money.focus();
			    return;
			}
			txt_money.value=comma(temp) + amt1.substring(amt1.indexOf("."));
			return;							
		}
    }
}
/**IR0072215 增加
*
用途：检查输入收款人开户行是否只由英文状态()，中文状态（），—，字母，数字，汉字组成
输入：openbankname 待验证的值
返回：
 如果通过验证返回true,否则返回false 
*/

function checkOpenBankName(openbankname)
{
	var patrn = /^[a-zA-Z\u4e00-\u9fa5\(\—\)\（\）\d]*$/;
	if (!patrn.exec(openbankname)) {
		return false;
	}else{
	    return true;
	}
}
/**IR0091614收款人允许录入：:
 * @deprecated 对输入的acctname进行校验，字符最大长度不能大于maxlength位，且中间不能包含一个或两个空格
 * @param acctname
 * @return false表示传入的acctname没有通过校验 true反之
 */
function validateAcctnameLength4SpanTransColon(acctname,maxlength)
{
	var regu =  /[\/|／|\%|％|\\|＼|\'|＇|’|\"|\||＼]/g ;
	if(regu.test(acctname)){
		return false;
	}
	
	if(checkStrMaxLength(acctname,maxlength) == false){
		return false;  
	}
	
	var regu1 = /^\s.*$|^.*\s$/;
	if(regu1.test(acctname)){		 
		return false;
	}
	return true;
}
/**IR0091614收款人允许录入：:
 * @deprecated 对输入的acctname进行校验，字符最大长度不能大于60位，且中间不能包含一个或两个空格
 * @param acctname
 * @return false表示传入的acctname没有通过校验 true反之
 */
function validateAcctname4SpanTransColon(acctname)
{
	var regu =  /[\/|／|\%|％|\\|＼|\'|＇|’|\"|\||＼]/g ;
	if(regu.test(acctname)){
		return false;
	}
	
	if(checkStrMaxLength(acctname,60) == false){
		return false;  
	}
	
	var regu1 = /^\s.*$|^.*\s$/;
	if(regu1.test(acctname)){		 
		return false;
	}
	return true;
}
/**
 * IR0091614收款人允许录入：:
 * @deprecated 对输入的acctname进行校验，字符最大长度不能大于maxlength位，且中间不能包含一个或两个空格
 * @param acctname
 * @return false表示传入的acctname没有通过校验 true反之
 */
function validateAcctnameLengthColon(acctname,maxlength)
{
	  var regu =  /[\#|＃|\/|／|\%|％|\\|＼|\'|＇|’|\"|\||＼]/g ;
	  if(regu.test(acctname)){
	    	return false;
	   }
	    
   if(checkStrMaxLength(acctname,maxlength) == false){
	   return false;  
   }
   
   var regu1 = /^\s.*$|^.*\s$/;
   if(regu1.test(acctname)){		 
    	return false;
   }
   return true;
}
/**IR0091614收款人允许录入：:
 * @deprecated 对输入的acctname进行校验，字符最大长度不能大于60位，且中间不能包含一个或两个空格
 * @param acctname
 * @return false表示传入的acctname没有通过校验 true反之
 */
function validateAcctnameColon(acctname)
{
	
   var regu =  /[\#|＃|\/|／|\%|％|\\|＼|\'|＇|’|\"|\||＼]/g ;
   if(regu.test(acctname)){
    	return false;
   }
	    
   if(checkStrMaxLength(acctname,60) == false){
	   return false;  
   }
   
   var regu1 = /^\s.*$|^.*\s$/;
   if(regu1.test(acctname)){		 
    	return false;
   }
   return true;
}