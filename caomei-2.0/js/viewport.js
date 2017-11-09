//页面加载前自动加载  window.onload 在页面完全加载完后执行

window.onload=function(){
	getSize();
}
//当页面大小变化时，执行函数
window.onresize = function(){
	getSize();
}
function getSize(){
	var winWidth = document.body.clientWidth;//获取网页可见区宽度
	var font_Size = 40*(winWidth/320);
	document.getElementsByTagName('html')[0].style.fontSize = font_Size + "px";//通过js给html添加文字大小
}
