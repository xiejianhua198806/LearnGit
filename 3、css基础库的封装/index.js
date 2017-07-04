//前台调用
var $ = function() {
	return new base();
};

//基础库
function base() {
	this.elements = []; //变成私有样式
};
//创建一个数组来存储style的样式
//base.prototype.elements = [];
//获取id节点
base.prototype.getId = function(id) {
	//将获取到的存储到数组里面
	this.elements.push(document.getElementById(id));
	//为了进行链式操作需要return出一个this供后面进行调用
	return this;
};
//获取元素节点--tagName
base.prototype.getTagName = function(tag) {
	var tags = document.getElementsByTagName(tag);
	//因为有多个p标签 需要将其进行循环才能获取每个
	for(var i = 0; i < tags.length; i++) {
		this.elements.push(tags[i]);
	};
	return this;
};

//获取多个class节点 --className
base.prototype.getClass = function(className, idName) {
	var node = null;
	if(arguments.length == 2) {
		node = document.getElementById('idName')
	} else {
		node = document;
	}
	var all = node.getElementsByTagName('*'); //获取所有的class名
	for(var i = 0; i < all.length; i++) {
		if(all[i].className == className) {
			this.elements.push(all[i]);
		};
	};
	return this;
}
//获取多个class节点中其中一个 --className
base.prototype.getElement = function(num) {
	var element = this.elements[num];
	this.elements = [];
	this.elements[0] = element;
	return this;
};

//设置css样式
base.prototype.css = function(attr, value) {
	for(var i = 0; i < this.elements.length; i++) {
		//arguments:表示参数的个数
		if(arguments.length == 1) { //获取css样式(link引入)
			if(typeof window.getComputedStyle != "undefined") { //w3c
				return window.getComputedStyle(this.elements[i], null)[attr];
			} else if(typeof this.elements[i].currentStyle != "undefined") { //ie
				return this.elements[i].currentStyle[attr];
			};

			return this.elements[i].style[attr];
		};
		this.elements[i].style[attr] = value;
	};
	return this;
}

//添加class
base.prototype.addClass = function(className) {
	//如果有多个则需要进行遍历
	for(var i = 0; i < this.elements.length; i++) {

		//防止重复添加class名
		if(!this.elements[i].className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))) {
			this.elements[i].className += " " + className;
		};

	};
	return this;
}

//移除class
base.prototype.removeClass = function(className) {
	//如果有多个则需要进行遍历
	for(var i = 0; i < this.elements.length; i++) {
		//防止重复添加class名
		if(this.elements[i].className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))) {
			this.elements[i].className = this.elements[i].className.replace(new RegExp('(\\s|^)' + className + '(\\s|$)'), '');
	};

};
return this;
}

//设置innerhtml内容
base.prototype.html = function(str) {
	for(var i = 0; i < this.elements.length; i++) {

		//获取html内容
		if(arguments.length == 0) {
			return this.elements[i].innerHTML;
		}
		this.elements[i].innerHTML = str;
	};
	return this;
}
//触发点击事件
base.prototype.click = function(fn) {
	for(var i = 0; i < this.elements.length; i++) {
		this.elements[i].onclick = fn;
	};
	return this;
}