
/**
 * @deprecated  在小数点前面自动补0(例如：".25" 自动转换成"0.25")
 * @param  txtmoney:需要转换的字符串
 * @result 补0后的值
 */
function addZero(txtmoney) {
	if (txtmoney.charAt(0) == ".") {
		txtmoney = "0" + txtmoney;
	}
	return txtmoney;
}

/**
 * @deprecated  去掉字符串前后空格
 * @param  param:字符串
 * @result 去掉前后空格后的字符串
 */
function trim(param) {
	if ((vRet = param) == '') {
		return vRet;
	}
	while (true) {
		if (vRet.indexOf(' ') == 0) {
			vRet = vRet.substring(1, parseInt(vRet.length));
		} else if ((parseInt(vRet.length) != 0)
				&& (vRet.lastIndexOf(' ') == parseInt(vRet.length) - 1)) {
			vRet = vRet.substring(0, parseInt(vRet.length) - 1);
		} else {
			return vRet;
		}
	}
}

/**
 * @deprecated  检查金额是否正确
 * @param  param:金额
 * @result true:正确   false:不正确
 */
function checkCustMoney(txtmoney) {
	var tonumber;
	var re = /,/g;
	var txt_money = document.getElementById(txtmoney);

	if (txt_money.value != "") {
		var temp = trim(txt_money.value);
		if (temp == "") {
			alert("请输入正确的金额!");
			txt_money.value = "";
			txt_money.focus;
			return false;
		}
	}
	tonumber = addZero((trim(txt_money.value)).replace(re, ""));
	txt_money.value = "";
	if (tonumber != "" && tonumber != null) {
		rep = / /g;
		var amt = tonumber.replace(rep, "");
		for ( var j = 0; j < amt.length; j++) {
			if (isNaN(parseInt(amt.charAt(j), 10)) && amt.charAt(j) != ","
					&& amt.charAt(j) != ".") {
				alert("请输入正确的金额!");
				txt_money.value = "";
				txt_money.focus;
				return false;
			}
		}
		if (amt.indexOf(".") != amt.lastIndexOf(".")) {
			alert("请输入正确的金额!");
			txt_money.focus;
			return false;
		}

		re = /,/g;
		var amt1 = amt.replace(re, "");
		var amt2 = parseFloat(amt1);
		if (amt2 < 0) {
			alert("输入的金额小于零,请重新输入!");
			txt_money.focus;
			return false;
		} else { //大于0的正数;
			if (amt1.indexOf(".") != -1) {
				var str = amt1.substr(amt1.indexOf(".") + 1);
				if (str.length > 2) {
					alert("输入的金额小数点后只能保留两位,请重新输入!");
					txt_money.focus;
					return false;
				} else if (str.length == 1) {
					amt1 = amt1 + "0";
				} else if (str.length < 1) {
					amt1 = amt1 + "00";
				}
			} else {
				amt1 = amt1 + ".00";
			}
			if (amt1.charAt(0) == '0' && amt1.indexOf(".") != 1) {
				alert("请输入正确的金额!");
				txt_money.focus;
				return false;
			}
			temp = amt1.substring(0, amt1.indexOf("."));
			if (temp.length > 12) {
				alert("输入的金额太大，请重新输入!");
				txt_money.focus;
				return false;
			}
			txt_money.value = comma(temp) + amt1.substring(amt1.indexOf("."));
			return true;
		}
	}
}

/**
 * @deprecated  对金额进行格式化,添加逗号
 * @param  param:金额
 * @result 额式化后的金额
 */
function comma(number) {
	number = '' + number;
	if (number.length > 3) {
		var mod = number.length % 3;
		var output = (mod > 0 ? (number.substring(0, mod)) : '');
		for (i = 0; i < Math.floor(number.length / 3); i++) {
			if ((mod == 0) && (i == 0))
				output += number.substring(mod + 3 * i, mod + 3 * i + 3);
			else
				output += ',' + number.substring(mod + 3 * i, mod + 3 * i + 3);
		}
		return (output);
	} else
		return number;
}