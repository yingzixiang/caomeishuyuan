 	(function({
 		if(/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
			$("select").css("-webkit-appearance", "none");
		}
 	})();
 	//验证码倒计时
	var wait = 60; //设置刷新时间  
	function time(btn) {  
	    if(wait == 0) {  
	    	btn.style.backgroundColor = '#ff6666';
	        btn.removeAttribute("disabled");  
	        btn.innerHTML = "获取验证码";  
	        wait = 60;  
	    } else {  
	    	btn.style.backgroundColor = '#AFAFAF';
	        btn.setAttribute("disabled", true);  
	        (wait<10) ? wait="0"+wait : wait=wait;
	        btn.innerHTML = "重新发送" + wait;  
	        wait--;  
	        setTimeout(function() { 
	            time(btn)  
	        },1000)  
	    }  
	}  
	//手机号码正则判断
	function checkMobile(obj){ 
	    var sMobile = obj.value;
	    if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(sMobile))){ 
	        alert("不是完整的11位手机号或者正确的手机号前七位"); 
	        obj.value="";
	        return false; 
	    } 
	} 
	
