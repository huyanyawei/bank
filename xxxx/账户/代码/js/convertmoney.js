 /**
   * 在小数点前面自动补0(例如：".25" 自动转换成"0.25")
   * @param {String} 需要转换的字符串
   * @return {String} 转换完成的字符串
   */
   function addZero(txtmoney) {
   	if(txtmoney.charAt(0) == ".") {
   		txtmoney = "0" + txtmoney;
   	}
   	return txtmoney;
   }
   
   /**
    * 将输入的参数的第一位和最后一位去除空格
    * @param param
    * @return param
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
    * 对输入的金额进行校验，不能为空，小数点钱前动补0，输入非数字的字符，输入金额不能小于0，或者金额的长度不能大于12位
    * @param txtmoney
    * @return false表示没有通过校验 true表示通过校验
    */
   function convertMoneyTest(txtmoney){
       var tonumber;
       var re = /,/g;
       var txt_money = document.getElementById(txtmoney);
       
       if (txt_money.value != ""){
       	var temp = trim(txt_money.value);
       	if (temp == ""){
       		alert("请输入正确的金额!");
       		    txt_money.value="";  				
   				txt_money.focus();
       		return false;
       	}
       }
       tonumber = addZero((trim(txt_money.value)).replace(re,""));
       txt_money.value = "";
      if (tonumber !="" && tonumber!=null){
      	rep = / /g;
   		var amt = tonumber.replace(rep,"");  		
   		for(var j = 0; j < amt.length; j++){
   			if(isNaN(parseInt(amt.charAt(j),10)) && amt.charAt(j)!="," && amt.charAt(j)!=".") {
   				alert("请输入正确的金额!");
   				txt_money.value="";
   				txt_money.focus();
   				return false;
   			}
   		}
   		if(amt.indexOf(".")!=amt.lastIndexOf(".")){
   			alert("请输入正确的金额!");
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
   			alert("请输入正确的金额!");
   			txt_money.focus();
   			return false;
   			}
   			 temp=amt1.substring(0,amt1.indexOf("."));
   			if (temp.length > 12){
   			    alert("输入的金额太大，请重新输入!");
   			    txt_money.focus();
   			    return false;
   			}
   			txt_money.value=comma(temp) + amt1.substring(amt1.indexOf("."));
   			return true;							
   		}
       }
   }
   
   /**
    * 对输入的金额进行校验，不能为空，小数点钱前动补0，输入非数字的字符，输入金额不能小于0，或者金额的长度不能大于16位
    * @param txtmoney
    * @return false表示没有通过校验 true表示通过校验
    */
   function convertMoneyTest2(txtmoney){
       var tonumber;
       var re = /,/g;
       var txt_money = document.getElementById(txtmoney);
       
       if (txt_money.value != ""){
       	var temp = trim(txt_money.value);
       	if (temp == ""){
       		alert("请输入正确的金额!");
       		    txt_money.value="";  				
   				txt_money.focus();
       		return false;
       	}
       }
       tonumber = addZero((trim(txt_money.value)).replace(re,""));
       txt_money.value = "";
      if (tonumber !="" && tonumber!=null){
      	rep = / /g;
   		var amt = tonumber.replace(rep,"");  		
   		for(var j = 0; j < amt.length; j++){
   			if(isNaN(parseInt(amt.charAt(j),10)) && amt.charAt(j)!="," && amt.charAt(j)!=".") {
   				alert("请输入正确的金额!");
   				txt_money.value="";
   				txt_money.focus();
   				return false;
   			}
   		}
   		if(amt.indexOf(".")!=amt.lastIndexOf(".")){
   			alert("请输入正确的金额!");
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
   			alert("请输入正确的金额!");
   			txt_money.focus();
   			return false;
   			}
   			 temp=amt1.substring(0,amt1.indexOf("."));
   			if (temp.length > 14){
   			    alert("输入的金额太大，请重新输入!");
   			    txt_money.focus();
   			    return false;
   			}
   			txt_money.value=comma(temp) + amt1.substring(amt1.indexOf("."));
   			return true;							
   		}
       }
   }
   
   /**
    * 为输入的金额加分隔符，如“99999999”转换为“99,999,999”
    * @param str
    * @return str
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