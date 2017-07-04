//跨浏览器获取视口（因为火狐与ie和谷歌对视口要求不一样）
function getInner() {
	if(typeof window.innerWidth != 'undefined') {
		return {
			width: window.innerWidth,
			height: window.innerHeight
		};
	} else {
		return {
			width: document.documentElement.clientWidth,
			height: document.documentElement.clientHeight
		};
	};
};
//跨浏览器获取style
function getStyle(elemnet, attr) {
	if(typeof window.getComputedStyle != 'undefined') { //w3c
		return window.getComputedStyle(elemnet, null)[attr];
	} else if(typeof elemnet.currentStyle != 'undefined') {
		return elemnet.currentStyle[attr];
	};
};
//判断class是否存在
function hasClass(element,className) {
	
	return element.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
};