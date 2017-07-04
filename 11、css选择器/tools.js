//添加事件委托（也叫夸浏览器事件绑定）

//为每个事件分配一个计数器
addEvent.ID = 1;

function addEvent(obj, type, fn) {
	if(typeof obj.addEventListener != "undefined") {
		obj.addEventListener(type, fn, false);
	} else {
		//创建文件的散列表
		if(!obj.events) obj.events = {};

		//第一次执行时执行
		if(!obj.events[type]) {
			obj.events[type] = fn; //创建一个存放事件处理函数的数组
			if(obj['on' + type]) obj.events[type][0] = fn; //把第一次的事件处理函数放在第一个位置上
		} else { //同一个注册函数 不添加到计数器中（重复函数不添加）
			if(addEvent.equal(obj.events[type], fn)) return false;
		};
		//从第二次开始我们用事件计数器来进行存储
		obj.events[type][addEvent.ID++] = fn;
		//执行事件处理函数
		obj['on' + type] = addEvent.exec;
	};
};
//执行事件处理函数
addEvent.exec = function(event) {
	var e = event || addEvent.fixEvent(window.event);
	var es = this.events[e.type];
	for(var i in es) {
		es[i].call(this, e);
	};
}
//同一个注册函数进行屏蔽
addEvent.equal = function(es, fn) {
	for(var i in es) {
		if(es[i] == fn) {
			return true;
		} else {
			return false;
		};
	};
};

//把IE常用的event对象配置到W3C中
addEvent.fixEvent = function(event) {
	event.preventDefault = addEvent.fixEvent.preventDefault;
	event.stopPropagation = addEvent.fixEvent.stopPropagation;
	event.target = event.srcElement;
	return event;
}
//IE阻止默认行为
addEvent.fixEvent.preventDefault = function() {
	this.returnValue = false;
};
//IE取消冒泡
addEvent.fixEvent.stopPropagation = function() {
	this.cancelBubble = true;
};
//移除事件绑定（夸浏览器删除事件）
function removeEvent(obj, type, fn) {
	if(typeof obj.removeEventListener != "undefined") {
		obj.removeEventListener(type, fn, false);
	} else {
		if(obj.events) {
			for(var i in obj.events[type]) {
				if(obj.events[type][i] == fn) {
					delete obj.events[type][i];
				};
			};
		};
	};
};
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
function hasClass(element, className) {
	return element.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
};
//删除空格
function trim(str) {
	return str.replace(/(^\s*)(\s*$)/g, '');
};
//滚动条清零事件
function scrollTop() {
	document.body.scrollTop = 0;
	document.documentElement.scrollTop = 0;
};