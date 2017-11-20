var OP;
function getClocked(options){
  OP= options;
  calUtil.ajaxApiInit(OP);
  calUtil.bindEnvent();
  calUtil.ajaxApilink();
  calUtil.menuDiv();
}
var calUtil = {
  //当前日历显示的年份
  showYear:2017,
  //当前日历显示的月份
  showMonth:1,
  //当前日历显示的天数
  showDays:1,
 	linkInline:"",
  eventName:"load",
  IsClick:true,
  IsTure: true,
  //初始化日历
  init:function(OP){
    calUtil.setMonthAndDay();
    calUtil.draw(OP);
    calUtil.bindThis();
  },
  //初始化日历
  initAgain:function(OP){
    calUtil.draw(OP);
    calUtil.bindThis();
  },
  //考勤接口调用
  ajaxApiInit:function(){
  	var dataStr = OP.urlStr;
  	$.ajax({
	  	url: dataStr,
	  	data: {
	  		"year": calUtil.showYear,
	  		"month": calUtil.showMonth
	  	},
				type: 'get',
				async:false, 
				dataType: 'json',
				success: function(data) {
					if(calUtil.IsTure){
						calUtil.init(data);
					}else{
						calUtil.initAgain(data);
					}
  				return;
				},
				error: function(){
					alert("出错了！");
					return false;
				}
	  })
  },
  //当日信息
  ajaxApilink:function(){
  	var dataStr = OP.urlStr;
  	var clickDay = $(".clicknow").text();
  	clickDay = clickDay ? clickDay : $(".now").text();
  	$.ajax({
	  	url: dataStr,
	  	data: {
	  		"year": calUtil.showYear,
	  		"month": calUtil.showMonth,
	  		"clickDay": clickDay
	  	},
				type: 'get',
				async:false, 
				dataType: 'json',
				success: function(data) {
					$(".list-block").html(calUtil.linkInline);
  				return;
				},
				error: function(){
					alert("出错了！");
					return false;
				}
	  })
  },  
  draw:function(OP){
    //绑定日历
    var str = calUtil.drawCal(calUtil.showYear,calUtil.showMonth,OP);
    $("#calendar").html(str);
    //绑定日历表头
    var calendarName=calUtil.showYear+"年"+calUtil.showMonth+"月";
    $("#nowDate").html(calendarName);  
  },
  //绑定事件
  bindEnvent:function(){
  	
    //绑定上个月事件
    calUtil.IsTure = false;
    $(".month_prev").click(function(dataStr){
      //ajax获取日历json数据
      calUtil.eventName="prev";
      calUtil.setMonthAndDay();
      calUtil.ajaxApiInit();
      calUtil.menuDiv();
    });
    //绑定下个月事件
    $(".month_next").click(function(dataStr){
      //ajax获取日历json数据
      calUtil.eventName="next";
      calUtil.setMonthAndDay();
      calUtil.ajaxApiInit();
      calUtil.menuDiv();
    });
  },
  //点击当前日期
  bindThis:function(){
    $(".thnum").click(function(){
			$(".thnum").removeClass("clicknow");
			$(this).addClass("clicknow");
			$(".now").removeClass("nowStyle");
			var nowdays = $(this).text();
			calUtil.linkInline = '<ul style="height: 80px;"><li class="item-content"><div class="item-inner" style="padding: 0; justify-content: flex-start;">';
			calUtil.linkInline += '<div class="item-title" style="height: 80px; padding-top: 10px; padding-right: 15px; border-right: 1px solid #e7e7e7;">' + calUtil.showMonth + '/' + nowdays +'</div>'
			calUtil.linkInline += '<div class="item-title" style="height: 80px; padding: 10px 15px 0;">本周复习</div>'
			calUtil.linkInline += '<div class="item-after" style="position: absolute; right: 15px; top: 10px;"><span class="btn-goread"></span></div></div></li></ul>'
			calUtil.ajaxApilink();
    });
  },
  //加载菜单
  menuDiv:function(){
  		var flake = '<div class="edu-explain"><div class="edu-btn-1"></div><div class="edu-btn-2"></div><div class="edu-btn-3"></div></div>';
			$(".note-p-1").after(flake);
  },
  //获取当前选择的年月
  setMonthAndDay:function(){
    switch(calUtil.eventName)
    {
      case "load":
        if(calUtil.IsClick){
           var current = new Date();
           calUtil.showYear=current.getFullYear();
           calUtil.showMonth=current.getMonth() + 1;
        }
        break;
      case "prev":
        var nowMonth=$("#nowDate").html().split("年")[1].split("月")[0];
        calUtil.showMonth=parseInt(nowMonth)-1;
        if(calUtil.showMonth==0)
        {
            calUtil.showMonth=12;
            calUtil.showYear -= 1;
        }
        calUtil.IsClick=false;
        break;
      case "next":
        var nowMonth=$("#nowDate").html().split("年")[1].split("月")[0];
        calUtil.showMonth=parseInt(nowMonth)+1;
        if(calUtil.showMonth==13)
        {
            calUtil.showMonth=1;
            calUtil.showYear += 1;
        }
        calUtil.IsClick=false;
        break;
    }
  },
  getDaysInmonth : function(iMonth, iYear){
   var dPrevDate = new Date(iYear, iMonth, 0);
   return dPrevDate.getDate();
  },
  bulidCal : function(iYear, iMonth) {
   var aMonth = new Array();
   aMonth[0] = new Array(7);
   aMonth[1] = new Array(7);
   aMonth[2] = new Array(7);
   aMonth[3] = new Array(7);
   aMonth[4] = new Array(7);
   aMonth[5] = new Array(7);
   aMonth[6] = new Array(7);
   var dCalDate = new Date(iYear, iMonth - 1, 1);
   var iDayOfFirst = dCalDate.getDay();
   var iDaysInMonth = calUtil.getDaysInmonth(iMonth, iYear);
   var iVarDate = 1;
   var d, w;
   aMonth[0][0] = "日";
   aMonth[0][1] = "一";
   aMonth[0][2] = "二";
   aMonth[0][3] = "三";
   aMonth[0][4] = "四";
   aMonth[0][5] = "五";
   aMonth[0][6] = "六";
   for (d = iDayOfFirst; d < 7; d++) {
    aMonth[1][d] = iVarDate;
    iVarDate++;
   }
   for (w = 2; w < 7; w++) {
    for (d = 0; d < 7; d++) {
     if (iVarDate <= iDaysInMonth) {
      aMonth[w][d] = iVarDate;
      iVarDate++;
     }
    }
   }
   return aMonth;
  },
  ifHasSigned : function(signList,day){
   var signed = false;
   $.each(signList.sign,function(index,item){
    if(item.signDay == day) {
     signed = true;
     return false;
    }
   });
   return signed ;
  },
  ifUnSigned : function(signList,day){
   var unsigned = false;
   $.each(signList.unsign,function(index,item){
    if(item.signDay == day) {
     unsigned = true; 
     return false;
    }
   });
   return unsigned ;
  },
  drawCal : function(iYear, iMonth ,signList) {
   var myDate = new Date(); 
   var myMonth = calUtil.bulidCal(iYear, iMonth);
   var htmls = new Array();
   htmls.push("<div class='sign' id='sign_cal'>");
   htmls.push("<table>");
   htmls.push("<tr>");
   htmls.push("<th class='week'>" + myMonth[0][0] + "</th>");
   htmls.push("<th class='week'>" + myMonth[0][1] + "</th>");
   htmls.push("<th class='week'>" + myMonth[0][2] + "</th>");
   htmls.push("<th class='week'>" + myMonth[0][3] + "</th>");
   htmls.push("<th class='week'>" + myMonth[0][4] + "</th>");
   htmls.push("<th class='week'>" + myMonth[0][5] + "</th>");
   htmls.push("<th class='week'>" + myMonth[0][6] + "</th>");
   htmls.push("</tr>");
   var d, w;
   for (w = 1; w <=6; w++) {
    htmls.push("<tr>");
    for (d = 0; d < 7; d++) {
     var ifHasSigned = calUtil.ifHasSigned(signList,myMonth[w][d]);
     var ifUnSigned = calUtil.ifUnSigned(signList,myMonth[w][d]);
     if(ifHasSigned){
     	if(iYear == myDate.getFullYear() && iMonth == myDate.getMonth()+1 && myMonth[w][d] == myDate.getDate() ){
     		htmls.push("<td class='thnum on now nowStyle'>" + (!isNaN(myMonth[w][d]) ? myMonth[w][d] : " ") + "</td>");
     	}else{
     		htmls.push("<td class='thnum on'>" + (!isNaN(myMonth[w][d]) ? myMonth[w][d] : " ") + "</td>");
     	}
     }else if(ifUnSigned){
     		if(iYear == myDate.getFullYear() && iMonth == myDate.getMonth()+1 && myMonth[w][d] == myDate.getDate() ){
	     		htmls.push("<td class='thnum off now nowStyle'>" + (!isNaN(myMonth[w][d]) ? myMonth[w][d] : " ") + "</td>");
	     	}else{
	     		htmls.push("<td class='thnum off'>" + (!isNaN(myMonth[w][d]) ? myMonth[w][d] : " ") + "</td>");
	     	}
     }else if(!isNaN(myMonth[w][d])) {
     		if(iYear == myDate.getFullYear() && iMonth == myDate.getMonth()+1 && myMonth[w][d] == myDate.getDate() ){
	     		htmls.push("<td class='thnum calendar_record now nowStyle'>" + (!isNaN(myMonth[w][d]) ? myMonth[w][d] : " ") + "</td>");
	     	}else{
	     		htmls.push("<td class='thnum calendar_record'>" + (!isNaN(myMonth[w][d]) ? myMonth[w][d] : " ") + "</td>");
	     	}
     }else{
     	htmls.push("<td class='nodate'>" + " " + "</td>");
     }
    }
    htmls.push("</tr>");
   }
   htmls.push("</table>");
   htmls.push("</div>");
   return htmls.join('');
  }
};
