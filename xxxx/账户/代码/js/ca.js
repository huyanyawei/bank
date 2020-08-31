var keyStr = "ABCDEFGHIJKLMNOP" + "QRSTUVWXYZabcdef" + "ghijklmnopqrstuv"
		+ "wxyz0123456789+/" + "=";
function encode64(input) {
	input = unicodetoBytes(input);
	var output = "";
	var chr1, chr2, chr3 = "";
	var enc1, enc2, enc3, enc4 = "";
	var i = 0;
	do {
		chr1 = input[i++];
		chr2 = input[i++];
		chr3 = input[i++];
		enc1 = chr1 >> 2;
		enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
		enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
		enc4 = chr3 & 63;
		if (isNaN(chr2)) {
			enc3 = enc4 = 64;
		} else if (isNaN(chr3)) {
			enc4 = 64;
		}
		output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2)
				+ keyStr.charAt(enc3) + keyStr.charAt(enc4);
		chr1 = chr2 = chr3 = "";
		enc1 = enc2 = enc3 = enc4 = "";
	} while (i < input.length);
	return output;
}
function decode64(input) {
	var output = "";
	var chr1, chr2, chr3 = "";
	var enc1, enc2, enc3, enc4 = "";
	var i = 0;
	// remove all characters that are not A-Z, a-z, 0-9, +, /, or =
	var base64test = /[^A-Za-z0-9\+\/\=]/g;
	if (base64test.exec(input)) {
		alert("There were invalid base64 characters in the input text.\n"
				+ "Valid base64 characters are A-Z, a-z, 0-9, '+', '/', and '='\n"
				+ "Expect errors in decoding.");
	}
	input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
	output = new Array();
	do {
		enc1 = keyStr.indexOf(input.charAt(i++));
		enc2 = keyStr.indexOf(input.charAt(i++));
		enc3 = keyStr.indexOf(input.charAt(i++));
		enc4 = keyStr.indexOf(input.charAt(i++));
		chr1 = (enc1 << 2) | (enc2 >> 4);
		chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
		chr3 = ((enc3 & 3) << 6) | enc4;
		output.push(chr1);
		if (enc3 != 64) {
			output.push(chr2);
		}
		if (enc4 != 64) {
			output.push(chr3);
		}
		chr1 = chr2 = chr3 = "";
		enc1 = enc2 = enc3 = enc4 = "";
	} while (i < input.length);
	return bytesToUnicode(output);
}
function unicodetoBytes(s) {
	var result = new Array();
	if (s == null || s == "")
		return result;
	result.push(255); // add "FE" to head
	result.push(254);
	for ( var i = 0; i < s.length; i++) {
		var c = s.charCodeAt(i).toString(16);
		if (c.length == 1)
			i = "000" + c;
		else if (c.length == 2)
			c = "00" + c;
		else if (c.length == 3)
			c = "0" + c;
		var var1 = parseInt(c.substring(2), 16);
		var var2 = parseInt(c.substring(0, 2), 16);
		result.push(var1);
		result.push(var2);
	}
	return result;
}
function bytesToUnicode(bs) {
	var result = "";
	var offset = 0;
	if (bs.length >= 2 && bs[0] == 255 && bs[1] == 254)
		offset = 2; // delete "FE"
	for ( var i = offset; i < bs.length; i += 2) {
		var code = bs[i] + (bs[i + 1] << 8);
		result += String.fromCharCode(code);
	}
	return result;
}

function doSign() {
	var dn = getCertificateDN();
	var pubkey = getFtPubKey(dn);
	var certInfo = getCertInfo(dn);
	var hardid = omy.getHardId(dn);
	var clearcode = getClearCode();
	var encryptcode = doFtSign(clearcode, dn);
	putValues(hardid, pubkey, clearcode, encryptcode, certInfo);
}

function FtCheckKey() {
	try {
		var yes = omy.checkUSBKey();
		return (yes);
	} catch (e) {
		return '';
	}
}

function getFtSTime(dn) {
	try {
		return (omy.getSTime(dn));
	} catch (e) {
		return '';
	}
}

function getFtETime(dn) {
	return (omy.getETime(dn));
}

function getFtHardID(dn) {
	try {
		return (omy.getHardId(dn));
	} catch (e) {
		return '';
	}
}

function doFtSign(beSign, dn) {
	try {
		var sv = omy.Sign(dn, encode64(beSign));
		return (sv);
	} catch (e) {
		return '';
	}
}

function getFtPubKey(dn) {
	try {
		var yes = omy.getPublicKey(dn);
		return (yes);
	} catch (e) {
		return '';
	}
}

function getCertInfo(dn) {
	try {
		var yes = omy.getCertInfo(dn);
		return (yes);
	} catch (e) {
		return '';
	}
}






StringUtil = {
Base64Chars:
    "ABCDEFGHIJKLMNOP" +
    "QRSTUVWXYZabcdef" +
    "ghijklmnopqrstuv" +
    "wxyz0123456789@*" +
    "-",
/**
 * Encode a string to a Base64 string follow Bse64 regular.
 * @param s, a normal string
 * @return a Base64 string
 */
base64Encode: function(s){
    if(!s || s.length == 0) return s;

    var d = "";
    var b = this.ucs2_utf8(s);
    var b0, b1, b2, b3;
    var len = b.length;
    var i = 0;
    while(i < len){
       var tmp = b[i++];
       b0 = (tmp & 0xfc) >> 2;
       b1 = (tmp & 0x03) << 4;
       if(i < len){
          tmp = b[i++];
          b1 |= (tmp & 0xf0) >> 4;
          b2 = (tmp & 0x0f) << 2;
          if(i< len){
             tmp = b[i++];
             b2 |= (tmp & 0xc0) >> 6;
             b3 = tmp & 0x3f;
          }else{
             b3 = 64; // 1 byte "-" is supplement

          }
       }else{
          b2 = b3 = 64; // 2 bytes "-" are supplement

       }

       d+=this.Base64Chars.charAt(b0);
       d+=this.Base64Chars.charAt(b1);
       d+=this.Base64Chars.charAt(b2);
       d+=this.Base64Chars.charAt(b3);
    }

    return d;
    
},
/**
 * Decode a Base64 string to a string follow Base64 regular.
 * @param s, a Base64 string
 * @return a normal string
 */
base64Decode: function(s){
    if(!s) return null;
    var len = s.length;
    if(len%4 != 0){
       throw s+" is not a valid Base64 string.";
    }

    var b = new Array();
    var i=0, j=0, e=0, c, tmp;
    while(i < len){
       c = this.Base64Chars.indexOf(s.charAt(i++));
       tmp = c << 18;
       c = this.Base64Chars.indexOf(s.charAt(i++));
       tmp |= c << 12;
       c = this.Base64Chars.indexOf(s.charAt(i++));
       if(c < 64){
          tmp |= c << 6;
          c = this.Base64Chars.indexOf(s.charAt(i++));
          if(c < 64){
             tmp |= c;
          }else{
             e = 1;
          }
       }else{
          e = 2;
          i++;
       }

       b[j+2] = tmp & 0xff;
       tmp >>= 8;
       b[j+1] = tmp & 0xff;
       tmp >>= 8;
       b[j+0] = tmp & 0xff;
       j += 3;
       
    }
    
    b.splice(b.length-e, e);

    return this.utf8_ucs2(b);
    
},
/** 
 * Encodes a ucs2 string to a utf8 integer array. 
 * @param s, a string
 * @return an integer array
 */
ucs2_utf8: function(s){
    if (!s) return null;
    var d = new Array();
    if (s == "") return d;

    var c = 0, i = 0, j = 0;
    var len = s.length;
    while(i < len){
       c = s.charCodeAt(i++);
       if(c <= 0x7f){
          // 1 byte

          d[j++] = c;
       }else
       if((c >= 0x80) && (c <= 0x7ff)){
          // 2 bytes

          d[j++] = ((c >> 6) & 0x1f) | 0xc0;
          d[j++] = (c & 0x3f) | 0x80;
       }else{
          // 3 bytes

          d[j++] = (c >> 12) | 0xe0;
          d[j++] = ((c >> 6) & 0x3f) | 0x80;
          d[j++] = (c & 0x3f) | 0x80;
       }
    }
    
    return d;
},
/** 
 * Encodes a utf8 integer array to a ucs2 string.
 * @param s, an integer array
 * @return a string
 */
utf8_ucs2: function(s){
    if(!s) return null;
    var len = s.length;
    if(len == 0) return "";

    var d = "";
    var c = 0, i = 0, tmp = 0;
    while(i < len){
       c = s[i++];
       if((c & 0xe0) == 0xe0){
          // 3 bytes

          tmp = (c & 0x0f) << 12;
          c = s[i++];
          tmp |= ((c & 0x3f) << 6);
          c = s[i++];
          tmp |= (c & 0x3f);
       }else
       if((c & 0xc0) == 0xc0){
          // 2 bytes

          tmp = (c & 0x1f) << 6;
          c = s[i++];
          tmp |= (c & 0x3f);
       }else{
          // 1 byte

          tmp = c;
       }
       
       d += String.fromCharCode(tmp);
    }
    
    return d;
}

}