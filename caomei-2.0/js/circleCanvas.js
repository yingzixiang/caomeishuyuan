var canvas = document.getElementById('canvas');
var ctx =  canvas.getContext('2d');
var bodyObj = document.body;
var remSize = 40*(bodyObj.clientWidth/320);
canvas.width = bodyObj.scrollWidth * 4;
canvas.height = 4*4*remSize;
//var ring = new Ring(2*Math.PI/3, 50);  // 从2*Math.PI/3弧度开始，进度为50%的环ring.drawRing(ctx);
function Circle() {    
	this.radius = 2*remSize*4;    // 圆环半径   
	this.lineWidth = 10*4;  // 圆环边的宽度   
	this.strokeStyle = '#fff'; //边的颜色    
	this.lineCap = 'round';
}
Circle.prototype.draw = function() {    
	ctx.beginPath();    
	ctx.arc(16*remSize, 2*remSize*4.2, this.radius, Math.PI*0.8, Math.PI*2.2, false);  // 坐标为250的圆，这里起始角度是0，结束角度是Math.PI*2    
	ctx.lineWidth = this.lineWidth;    
	ctx.strokeStyle = this.strokeStyle;    
	ctx.lineCap = this.lineCap; 
	ctx.stroke();  // 这里用stroke画一个空心圆
};
function Ring(startAngle, percent) {    
	Circle.call(this);    
	this.startAngle = startAngle; //弧起始角度    
	this.percent = percent*0.7081;  //弧占的比例
}

Ring.prototype.drawRing = function() {     
	var count = 1, that = this, times = 10, // 分十次绘制蓝弧 
	startAngle = this.startAngle, 
	endAngle = startAngle;
	var grad = ctx.createLinearGradient(8*remSize, 4*4*remSize, 24*remSize, 16*remSize);
	/* 指定几个颜色 */
	grad.addColorStop(0, '#ff7b79');
	grad.addColorStop(0.5, '#ffac93');
	grad.addColorStop(1, '#ffd3a6');
	//this.draw(ctx); 
	var handle = setInterval(function() { 
		if (count == times) { 
			clearInterval(handle); 
		} // angle
		ctx.beginPath(); 
		var anglePerSec = 2 * Math.PI * (that.percent / 100) / times; // 每个间隔滑动的弧度 
		ctx.arc(16*remSize, 2*remSize*4.2, that.radius, Math.PI*0.8, endAngle, false); //这里的圆心坐标要和cirle的保持一致 
		ctx.strokeStyle = grad; 
		ctx.lineCap = that.lineCap; 
		ctx.stroke(); 
		ctx.closePath(); 
		startAngle += anglePerSec - 0.0028; // 消除每次绘环间的计算误差，防止出现空隙 
		endAngle = startAngle + anglePerSec; count++; }, 80);
}

