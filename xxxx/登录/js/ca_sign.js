
 	
 	var selectFlag = false;
 	
 	var subjectFilter = "CFCA";
 	
	var flag=true;
	function error_report(err_name,err_message){

		alert("error:" + err_name + "\n:" + err_message);
	}
	
	function selectCert()
	{
	 

		try{
			selectFlag = CFCACrypto.CFCA_SelectSignCerts(subjectFilter,false);
		}
		catch(e)
		{
			alert('未检测到USBKey，请检查是否已插入USBKey!');//
			flag = false;
		}
	}

	/**
	 * 检查是否为飞天旧KEY；true/false
	 */
	function checkFtOldKey(){
		var is=false;
 
		try{//3000
			var okey=ftkey.CheckToken('');
			if(okey==1){
				return true;
			}
		}catch(e){
			
		}
		try{//3000
			var okey=hxkeydll.CheckToken('');
			if(okey==1){
				return true;
			}
		}catch(e){
			
		}

		return is;
	}
	function validateCA(certEnabled,dn)
	{
		 
		if(certEnabled){
			
			var cn=getCN(dn);
			if(cn!=null&&cn!=''){
				subjectFilter=cn;
			}
			var encryptcode=""; 

			try{
				CFCACrypto.CFCA_Initialize("CFCALicense.dll");
				
 			}catch(e){
				selectCert();
				error_report(e.number,e.message);
				 
				return false;
			}
			CFCACrypto.CFCA_ClearUseCerts(true);
			 
			try{						
				CFCACrypto.CFCA_AddUseCertBySubject(true,subjectFilter);
				
			}catch(e){
				 
				selectCert();
			}
			
			if(flag){
					var cert = CFCACrypto.CFCA_GetCertContent(true,0);
					 
					var dn = CFCACrypto.CFCA_GetCertDN(cert);
					var sn = CFCACrypto.CFCA_GetCertSN(cert);
					 document.getElementById("caInfoArea.signHardId").value="E799991234567";	
					document.getElementById("signCSPName").value = 'EnterSafe ePass3003 CSP v1.0 for HXB';
					document.getElementById("caInfoArea.signCertDN").value = dn;
					document.getElementById("caInfoArea.signCertSN").value = sn;
					try{
					 document.getElementById("caInfoArea.signCertMacAddr").value =document.all.ipmacObject.ClientMac; 
					 document.getElementById("caInfoArea.signCertClientIp").value =document.all.ipmacObject.ClientIP; 
					}catch(e){}
					//var clearCode=getClearCode();
					var clearCode=document.getElementById("caInfoArea.signClearCode").value;
					if(!checkFtOldKey()){
						 alert("未识别你的Key证书，请使用网银助手修复!");
						 return false;

					}
					//document.getElementById("caInfoArea.signHardId").value =ft.GetUSBKeySerialNumber(); 	
					//sign
					try{						
						CFCACrypto.CFCA_SetAlgorithm(0,"1.3.14.3.2.26");
						encryptcode = CFCACrypto.CFCA_SignMessage(clearCode);  
					   
						//document.getElementById("caInfoArea.signClearCode").value = clearCode; 
						document.getElementById("caInfoArea.signEncryptCode").value = encryptcode;
				
				
					}catch(e){
						
							error_report(e.number,e.message);
						//if choose cert cannel ,insert info here
						return false;	
					}
							
/*					//重置usbkey，重复了
					if(ft.CheckToken('')==1){
						ft.ResetPIN('');
					}*/
					
					//clear certs
					try{
						CFCACrypto.CFCA_ClearUseCerts(true);
					}catch(e){

					}
					// alert(encryptcode);
					

					return true;
			}else{
				return false;
				}
		}else{
			return true;
		}
		
	}
	
 	
 
 
	
	/**
	 * 
	 * @param certEnabled
	 * @param dn
	 * @param algorithm
	 *            sha1; sha256:二代KEY回显算法
	 * @return
	 */
	function validateCA11(certEnabled, dn, algorithm,gmflag) {

		if (certEnabled) {
			if(algorithm==null||algorithm==""){
				algorithm="sha1";
				
			}
			var subjectFilter = "CFCA";
			var cn = getCN(dn);
			if (cn != null && cn != '') {
				subjectFilter = cn;
			}
			var encryptcode = "";
			var cfcaobj=getCFCAVersion();
			if(gmflag==null||gmflag==""){
				gmflag="0";
			}

			try {
				if(2==cfcaobj){
					if("1"==gmflag){
						CFCACrypto.CFCA_SetCertType("SM2");
					}else{
						CFCACrypto.CFCA_SetCertType("RSA");
					}
				}
				try {
					var hxCSPList = "EnterSafe ePass3003 CSP v1.0 for HXB||EnterSafe ePass2000Auto CSP v1.0 for HXBank||EnterSafe_CSPv2.0_for_HXB||Watch_CSPv2.0_for_HXB||Haitai_CSPv2.0_for_HXB||Hengbao_CSPv2.0_for_HXB||Tendyron_CSPv2.0_for_HXB";
					CFCACrypto.CFCA_SetSM2CSPList(hxCSPList);
				} catch (e) {
				}
				CFCACrypto.CFCA_SelectCertificate(subjectFilter, "");
				 
			} catch (e) {
				alert(CFCACrypto.CFCA_GetLastErrorDesc());
				return false;
			}

			var dn = CFCACrypto.CFCA_GetCertInfo("SubjectDN");
			var sn = CFCACrypto.CFCA_GetCertInfo("SerialNumber");

			document.getElementById("caInfoArea.signCertDN").value = dn;
			document.getElementById("caInfoArea.signCertSN").value = sn;
			try {
				document.getElementById("caInfoArea.signCertMacAddr").value = document.all.ipmacObject.ClientMac;
				document.getElementById("caInfoArea.signCertClientIp").value = document.all.ipmacObject.ClientIP;
			} catch (e) {
			}
			// var clearCode=getClearCode();
			var clearCode = document.getElementById("caInfoArea.signClearCode").value;


			// sign
			try {
				var cspname = CFCACrypto.CFCA_GetCertInfo("CSPName");
				 if(cspname.indexOf("CSPv2.0_for_HXB")<0){
					 algorithm="sha1";
				}
				encryptcode = CFCACrypto.CFCA_SignMessage(algorithm, clearCode);

				document.getElementById("caInfoArea.signEncryptCode").value = encryptcode;
				document.getElementById("signCSPName").value =CFCACrypto.CFCA_GetCertInfo("CSPName");
			} catch (e) {
				alert(CFCACrypto.CFCA_GetLastErrorDesc());
	 			return false;
			}


			return true;

		} else {
			return true;
		}

	}
	
	function getClearCode(){
	     var valString="";
			$.each($("input:hidden"), function(i, n){
				 var val=n.value;
				 if(val==null||val==''){
					 val="--";
				 }
				  valString=valString+"##"+val;
				
				
				});
			 
		return valString;
		
	}
	
	function getCN(loginDn){
		 
		var cn='CFCA';
		if(loginDn&&loginDn.indexOf("CN=")>-1){
			var si=loginDn.indexOf("CN=");
			var subDn=loginDn.substr(si);
			var ei=subDn.indexOf(","); 
			cn=subDn.substr(0,ei);
			 }
		return cn;
		
	}
	
	function getClearCodeByForm(formId){
		 
	     var valString="";
			$.each($("#"+formId+" input"), function(i, n){
				 var val=n.value;
				 var name=n.name;
		 
				 if(('text'==n.type||'hidden'==n.type)&&val!=null&&val!=''&&name!=null&&name!=''){
					  valString=valString+"##"+val;
				 }
				
				});
			 
		return valString;
		
	}
/**
 * 新控件取KEY编号
 * @param cspname
 * @param sn
 * @returns
 */
    function getLoginKeyNO(cspname,sn){
     var keyno= "";
   	if(cspname&&cspname.indexOf("EnterSafe")>-1){
   	  
   	    try{keyno = ftkey.GetKeySN(sn);}catch(e){}
   	       
   	     if(keyno.length>5&&(keyno.indexOf('E')<0&&keyno.indexOf('P')<0)){
   	    	 keyno='E799991234567';
   	     }
           
       }        
   	if(cspname&&cspname.indexOf("Watch_CSP")>-1){
   		keyno= wckey2.GetKeySN(sn);
       }

   	if(cspname&&cspname.indexOf("Haitai_CSP")>-1){ 
   	       keyno= htkey.GetKeySN(sn);           
       }
   	if(cspname&&cspname.indexOf("Hengbao_CSP")>-1){ 
	       keyno= hbkey.GetKeySN(sn);           
    }
   	if(cspname&&cspname.indexOf("Tendyron_CSP")>-1){ 
	       keyno= tdrkey.GetKeySN(sn);           
    }
   	if(keyno&&keyno.length>10){
   		return keyno;
   	}
       return "";
   }
    
    
    function loginResetPin(sn,pin){
   	    if("true"!=pin){
   	    	try{ftkey.ResetPin(sn);}catch(e){}
   	    	try{ftkey.ResetPIN('');}catch(e){}
   	        try{ wckey2.ResetPin(sn);}catch(e){}
   	        try{htkey.ResetPin(sn); }catch(e){}
   	        try{hbkey.ResetPin(sn); }catch(e){}
   	        try{tdrkey.ResetPin(sn); }catch(e){}
   	    }

    }
    
  //判断CFCA控件版本
    function getCFCAVersion(){
       var version = "0";
       try{
           version = CFCACrypto.CFCA_GetVersion(); 
           if(version==null || version==""){
	          try{
	            CFCACrypto.CFCA_GetLastErrorDesc();
	            version = "1";
	         }catch(e){
	            version = "0";
	         }
           }else{
             version = "2";
           }          
       }catch(e){
         try{
            CFCACrypto.CFCA_GetLastErrorDesc();
            version = "1";
         }catch(e){
            version = "0";
         }
       }
       return version;
    }