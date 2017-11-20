//页面加载前自动加载  window.onload 在页面完全加载完后执行


addLoadEvent(getSize);
//当页面大小变化时，执行函数
window.onresize = function(){
	getSize();
}
function getSize(){
	var winWidth = document.body.clientWidth;//获取网页可见区宽度
	var font_Size = 40*(winWidth/320);
	document.getElementsByTagName('html')[0].style.fontSize = font_Size + "px";//通过js给html添加文字大小
}
//可以添加多个window.onload函数
function addLoadEvent(func) {
    var oldonload = window.onload;//将现有的事件处理函数的值存入变量中
    if (typeof window.onload != 'function') {
        window.onload = func;//如果这个事件处理函数没有绑定任何函数，就把新函数添加给它
    } else {
        window.onload = function() {
            oldonload();
            func();//如果已经绑定了函数，就把新函数追加到现有指令的末尾
      }
    }
}