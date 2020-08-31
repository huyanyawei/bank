﻿﻿var Nums = new Array("零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"); 
var Digits = new Array("", "拾", "佰", "仟"); 
var Units = new Array("", "万", "亿", "万亿","仟兆"); 

/**
* 转换为中文金额表示
* @param {String} 要转换的金额字符串
* @return {String} 转换后的金额字符串
*/
function toChineseCash( cash )
{
	var noCommaCash = removeComma(cash);
 	
	return numToCn(noCommaCash);
}

/**
* 转换为中文金额表示
* @param {String} 要转换的金额字符串
* @return {String} 转换后的金额字符串
*/
function toChineseCashMatch( cash,maxmoney )
{
	var noCommaCash = removeComma(cash);
 	
	return numToCnMatch(noCommaCash,maxmoney);
}

/**
* 为金额添加分割符
* @param {String} 要转换的金额字符串
* @return {String} 转换后的金额字符串
*/
function toCashWithComma( cash )
{
	if( !isFloat( cash ) )
		return addComma(cash);	
			
	var dotIndex = cash.indexOf('.');
	var integerCash = cash.substring( 0, dotIndex );
	var decimalCash = cash.substring( dotIndex );
	
	return addComma(integerCash)+decimalCash;
}

/**
* 去除输入金额中的“\”
* @param {String} 要转换的金额字符串
* @return {String} 转换后的金额字符串
*/
function removeComma(cash)
{
	return cash.replace('\,','');
}

/**
 * 把输入的金额转换变中文大写格式
 * @param cash
 * @return cash
 */
function convertIntegerToChineseCash(cash)
{
	if ( cash == "0" )
		return "";
    var S = ""; //返回值 
    var p = 0; //字符位置指针 
    var m = cash.length % 4; //取模 

    // 四位一组得到组数 
    var k = (m > 0 ? Math.floor(cash.length / 4) + 1 : Math.floor(cash.length / 4)); 
    // 外层循环在所有组中循环 
    // 从左到右 高位到低位 四位一组 逐组处理 
    // 每组最后加上一个单位: "[万亿]","[亿]","[万]" 
    for (var i = k; i > 0; i--) 
    {
        var L = 4; 
        if (i == k && m != 0)
        {
            L = m;
        }
        // 得到一组四位数 最高位组有可能不足四位 
        var s = cash.substring(p, p + L);
        var l = s.length;

        // 内层循环在该组中的每一位数上循环 从左到右 高位到低位 
        for (var j = 0;j < l;j++)
        {
            var n = parseInt(s.substring(j, j+1));
            if (n == 0)
            {
                if ((j < l - 1) && (parseInt(s.substring(j + 1, j + 1+ 1)) > 0) //后一位(右低) 
                    && S.substring(S.length-1,S.length) != Nums[n])
                {
                    S += Nums[n];
                }
            }
            else 
            {
                //处理 1013 一千零"十三", 1113 一千一百"一十三" 
                if (!(n == 1 && (S.substring(S.length-1,S.length) == Nums[0] | S.length == 0) && j == l - 2)) 
                {
                    S += Nums[n];
                }
                S +=  Digits[l - j - 1];
            }
        }
        p += L;
        // 每组最后加上一个单位: [万],[亿] 等 
        if (i < k)//不是最高位的一组 
        {
        	//根据IR0045584修改，将右边的语句优化。yinweimin 20130605。原语句如下：if(parseInt(s) != 0){
        	if(parseInt(s,10) != 0){
                //如果所有 4 位不全是 0 则加上单位 [万],[亿] 等 
                S += Units[i - 1];
            }
        }
        else
        {
            //处理最高位的一组,最后必须加上单位 
            S += Units[i - 1];
        }
    }
	//alert(S);
	return S+"元";
}

/**
 * 把输入的金额小数部分的数字转换成中文大写格式
 * @param cash
 * @return returnCash
 */
function convertDecimalToChineseCash( cash )
{
	var returnCash = "";
	if ( cash == "00" )
		returnCash = "整";
	else
	{
		for( var i = 0;i < cash.length; i++ )
		{
			if( i >= 2 )
				break;
			var intValue = parseInt(cash.charAt(i));
		
			switch( i )
			{
				case 0:
					if ( intValue != 0 )
						returnCash += Nums[intValue]+"角";
					break;
				case 1:
					returnCash += Nums[intValue]+"分";
					break;
				default:
					break;
			}
		}
		
	}
	
	return returnCash;	
}
/**
 * 给输入的金额加分隔符，如“99999999”转换为“999,999,99”
 * @param str
 * @return str
 */
function addComma(str) {
	if (str.length > 3) 
	{
		var mod = str.length % 3;
		var output = (mod > 0 ? (str.substring(0,mod)) : '');
		for (i=0 ; i < Math.floor(str.length / 3); i++) {
			if ((mod == 0) && (i == 0))
				output += str.substring(mod+ 3 * i, mod + 3 * i + 3);
			else
				output += ',' + str.substring(mod + 3 * i, mod + 3 * i + 3);
		}
		return (output);
	}
	else return str;
}
/**
* 转换为中文金额表示
* 供应链金融使用
* @param {String} 要转换的金额字符串
* @return {String} 转换后的金额字符串
*/
function toChineseCashForSCF( cash )
{
	var noCommaCash = removeComma(cash);			
	var dotIndex = noCommaCash.indexOf('.');
 if(dotIndex>0){
	var integerCash = noCommaCash.substring( 0, dotIndex );
	var decimalCash = noCommaCash.substring( dotIndex + 1 );
	var messageChinese="";
	if(convertIntegerToChineseCashForSCF(integerCash)=="零"){
		messageChinese=convertIntegerToChineseCashForSCF(integerCash);
	}else{
		messageChinese=convertIntegerToChineseCash(integerCash)+convertDecimalToChineseCash(decimalCash);
	}
  }else{
		  messageChinese=convertIntegerToChineseCashForSCF(noCommaCash);
	  }
	return messageChinese; 
}
/**
 * 把输入的金额转换变中文大写格式
 * @param cash
 * @return cash
 */
function convertIntegerToChineseCashForSCF(cash)
{
	if ( cash == "0" )
		return "零";
    var S = ""; //返回值 
    var p = 0; //字符位置指针 
    var m = cash.length % 4; //取模 

    // 四位一组得到组数 
    var k = (m > 0 ? Math.floor(cash.length / 4) + 1 : Math.floor(cash.length / 4)); 
    // 外层循环在所有组中循环 
    // 从左到右 高位到低位 四位一组 逐组处理 
    // 每组最后加上一个单位: "[万亿]","[亿]","[万]" 
    for (var i = k; i > 0; i--) 
    {
        var L = 4; 
        if (i == k && m != 0)
        {
            L = m;
        }
        // 得到一组四位数 最高位组有可能不足四位 
        var s = cash.substring(p, p + L);
        var l = s.length;

        // 内层循环在该组中的每一位数上循环 从左到右 高位到低位 
        for (var j = 0;j < l;j++)
        {
            var n = parseInt(s.substring(j, j+1));
            if (n == 0)
            {
                if ((j < l - 1) && (parseInt(s.substring(j + 1, j + 1+ 1)) > 0) //后一位(右低) 
                    && S.substring(S.length-1,S.length) != Nums[n])
                {
                    S += Nums[n];
                }
            }
            else 
            {
                //处理 1013 一千零"十三", 1113 一千一百"一十三" 
                if (!(n == 1 && (S.substring(S.length-1,S.length) == Nums[0] | S.length == 0) && j == l - 2)) 
                {
                    S += Nums[n];
                }
                S +=  Digits[l - j - 1];
            }
        }
        p += L;
        // 每组最后加上一个单位: [万],[亿] 等 
        if (i < k)//不是最高位的一组 
        {
            if (parseInt(s,10)!= 0)
            {
                //如果所有 4 位不全是 0 则加上单位 [万],[亿] 等 
                S += Units[i - 1];
            }
        }
        else
        {
            //处理最高位的一组,最后必须加上单位 
            S += Units[i - 1];
        }
    }
	//alert(S);
	return S+"元";
}

/**
 * 转化为中文金额
 * @param a  最大为99999999999.99
 * @returns
 */
function numToCn(a){
	var b=9.999999999999E10,f="\u96f6",h="\u58f9",g="\u8d30",e="\u53c1",k="\u8086",p="\u4f0d",q="\u9646",r="\u67d2",s="\u634c",t="\u7396",l="\u62fe",d="\u4f70",i="\u4edf",m="\u4e07",j="\u4ebf",u="人民币",o="\u5706",c="\u89d2",n="\u5206",v="\u6574";a=a.toString();if(a==""){alert("\u8bf7\u8f93\u5165\u6570\u5b57!");return""}if(a.match(/[^,.\d]/)!=null){alert("\u8bf7\u4e0d\u8981\u8f93\u5165\u5176\u4ed6\u5b57\u7b26\uff01");return""}if(a.match(/^((\d{1,3}(,\d{3})*(.((\d{3},)*\d{1,3}))?)|(\d+(.\d+)?))$/)==
	null){alert("\u975e\u6cd5\u683c\u5f0f\uff01");return""}a=a.replace(/,/g,"");a=a.replace(/^0+/,"");if(Number(a)>b){alert("\u5bf9\u4e0d\u8d77,\u4f60\u8f93\u5165\u7684\u6570\u5b57\u592a\u5927\u4e86!\u6700\u5927\u6570\u5b57\u4e3a99999999999.99\uff01");return""}b=a.split(".");if(b.length>1){a=b[0];b=b[1];b=b.substr(0,2)}else{a=b[0];b=""}h=new Array(f,h,g,e,k,p,q,r,s,t);l=new Array("",l,d,i);m=new Array("",m,j);n=new Array(c,n);c="";if(Number(a)>0){for(d=j=0;d<a.length;d++){e=a.length-d-1;i=a.substr(d,
	1);g=e/4;e=e%4;if(i=="0")j++;else{if(j>0)c+=h[0];j=0;c+=h[Number(i)]+l[e]}if(e==0&&j<4)c+=m[g]}c+=o}if(b!="")for(d=0;d<b.length;d++){i=b.substr(d,1);if(i!="0")c+=h[Number(i)]+n[d]}if(c=="")c=f+o;if(b.length<2)c+=v;return  c
}

/**
 * 转化为中文金额
 * @param a  需要转化的金额
 * @param maxmoney，允许金额的最大值
 */
function numToCnMatch(a,maxmoney){
	var b=maxmoney,f="\u96f6",h="\u58f9",g="\u8d30",e="\u53c1",k="\u8086",p="\u4f0d",q="\u9646",r="\u67d2",s="\u634c",t="\u7396",l="\u62fe",d="\u4f70",i="\u4edf",m="\u4e07",j="\u4ebf",u="人民币",o="\u5706",c="\u89d2",n="\u5206",v="\u6574";a=a.toString();if(a==""){alert("\u8bf7\u8f93\u5165\u6570\u5b57!");return""}if(a.match(/[^,.\d]/)!=null){alert("\u8bf7\u4e0d\u8981\u8f93\u5165\u5176\u4ed6\u5b57\u7b26\uff01");return""}if(a.match(/^((\d{1,3}(,\d{3})*(.((\d{3},)*\d{1,3}))?)|(\d+(.\d+)?))$/)==
	null){alert("\u975e\u6cd5\u683c\u5f0f\uff01");return""}a=a.replace(/,/g,"");a=a.replace(/^0+/,"");if(Number(a)>b){alert("\u5bf9\u4e0d\u8d77,\u4f60\u8f93\u5165\u7684\u6570\u5b57\u592a\u5927\u4e86!\u6700\u5927\u6570\u5b57\u4e3a9999999999999.99\uff01");return""}b=a.split(".");if(b.length>1){a=b[0];b=b[1];b=b.substr(0,2)}else{a=b[0];b=""}h=new Array(f,h,g,e,k,p,q,r,s,t);l=new Array("",l,d,i);m=new Array("",m,j,m);n=new Array(c,n);c="";if(Number(a)>0){for(d=j=0;d<a.length;d++){e=a.length-d-1;i=a.substr(d,
	1);g=e/4;e=e%4;if(i=="0")j++;else{if(j>0)c+=h[0];j=0;c+=h[Number(i)]+l[e]}if(e==0&&j<4)c+=m[g]}c+=o}if(b!="")for(d=0;d<b.length;d++){i=b.substr(d,1);if(i!="0")c+=h[Number(i)]+n[d]}if(c=="")c=f+o;if(b.length<2)c+=v;return  c
}
	 