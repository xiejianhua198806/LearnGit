//前台调用
var $ = function(args) {
	return new base(args);
};

//基础库
function base(args) {
	this.elements = []; //变成私有样式
	if(typeof args == 'string') {
		switch(args.charAt(0)) { //args.chartAt(0),截取开头的字符
			case "#":
				this.elements.push(this.getId(args.substring(1)));
				break;
			case ".":
				this.elements=this.getClass(args.substring(1));
				break;
			default:
				this.getTagName(args);
		};
	} else if(typeof args == 'object') {
		if(args != undefined) { //这里的值如果是空的
			this.elements[0] = args;
		};
	};

};
//创建一个数组来存储style的样式
//base.prototype.elements = [];


//获取id节点
base.prototype.getId = function(id) {
	return document.getElementById(id)	
};



//获取元素节点--tagName
base.prototype.getTagName = function(tag) {
	var tags = document.getElementsByTagName(tag);
	//因为有多个p标签 需要将其进行循环才能获取每个
	for(var i = 0; i < tags.length; i++) {
		this.elements.push(tags[i]);
	};
	
};


//获取class节点 --className
base.prototype.getClass = function(className, parentNode) {
	var node = null;
	var temps=[];
	if(parentNode !== undefined) {
		node = parentNode;
	} else {
		node = document;
	}
	var all = node.getElementsByTagName('*'); //获取所有的class名
	for(var i = 0; i < all.length; i++) {
		if(all[i].className == className) {
			temps.push(all[i]);
		};
	};
	return temps;
}
//设置css选择器的子节点
base.prototype.find = function(str) {
	var childElements = [];
	for(var i = 0; i < this.elements.length; i++) {
		switch(str.charAt(0)) { //args.chartAt(0),截取开头的字符
			case "#":
				childElements.push(this.getId(str.substring(1)));
				break;
			case ".":
				var all =this.elements[i].getElementsByTagName('*'); //获取所有的class名
				for(var j = 0; j < all.length; j++) {
					if(all[i].className == str.substring(1)) {
						childElements.push(all[j]);
					};
				};
				break;
			default:
				var tags = this.elements[i].getElementsByTagName(str);
				for(var j = 0; j < tags.length; j++) {
					childElements.push(tags[j]); //将循环后的数据放到空数组里面
				};
		};
	};
	this.elements = childElements;
	return this;
}
//获取某一个节点，并返回这个节点对象
base.prototype.getElement = function(num) {
	return this.elements[num];
};
//获取某一个节点，并返回base对象
base.prototype.eq = function(num) {
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
			return getStyle(this.elements[i], attr);
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
		if(!hasClass(this.elements[i], className)) {
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
		if(hasClass(this.elements[i], className)) {
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
//设置鼠标移入移出方法
base.prototype.hover = function(over, out) {
	for(var i = 0; i < this.elements.length; i++) {
		addEvent(this.elements[i], 'mouseover', over);
		addEvent(this.elements[i], 'mouseout', out);
	};
	return this;
}
//设置显示
base.prototype.show = function() {
	for(var i = 0; i < this.elements.length; i++) {
		this.elements[i].style.display = "block";
	};
	return this;
}
//设置隐藏
base.prototype.hide = function() {
	for(var i = 0; i < this.elements.length; i++) {
		this.elements[i].style.display = "none"
	};
	return this;
};
//触发点击事件
base.prototype.click = function(fn) {
	for(var i = 0; i < this.elements.length; i++) {
		this.elements[i].onclick = fn;
	};
	return this;
};
//设置物体居中
base.prototype.center = function(width, height) {
	var top = (getInner().height - 250) / 2;
	var left = (getInner().width - 350) / 2;
	for(var i = 0; i < this.elements.length; i++) {
		this.elements[i].style.top = top + 'px';
		this.elements[i].style.left = left + 'px';
	};
	return this;
}
//锁屏功能
base.prototype.lock = function() {
	for(var i = 0; i < this.elements.length; i++) {
		this.elements[i].style.width = getInner().width + 'px';
		this.elements[i].style.height = getInner().height + 'px';
		this.elements[i].style.display = "block";
		document.documentElement.style.overflow = "hidden"; //锁屏的时候隐藏滚动条
		addEvent(window, 'scroll', scrollTop);
	};
	return this;
};
//去除锁屏功能
base.prototype.unlock = function() {
	for(var i = 0; i < this.elements.length; i++) {
		this.elements[i].style.display = "none";
		document.documentElement.style.overflow = "auto"; //取消锁屏显示滚动条
		removeEvent(window, 'scroll', scrollTop);
	};
	return this;
};
//拖拽功能
base.prototype.drag = function() {

};
//浏览器窗口事件
base.prototype.resize = function(fn) {
	for(var i = 0; i < this.elements.length; i++) {
		var element = this.elements[i];
		addEvent(window, 'resize', function() {
			fn();
			if(element.offsetLeft > getInner().width - element.offsetWidth) {
				element.style.left = getInner().width - element.offsetWidth + 'px';
			};
			if(element.offsetTop > getInner().height - element.offsetHeight) {
				element.style.top = getInner().height - element.offsetHeight + 'px';
			};
		});
	};
	return this;
};