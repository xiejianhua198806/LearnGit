//前台调用
var $ = function(_this) {
	return new base(_this);
};

//基础库
function base(_this) {
	this.elements = []; //变成私有样式
	if(_this != undefined) { //这里的值如果是空的
		this.elements[0] = _this;
	};
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
//设置hover方法
base.prototype.hover = function(over, out) {
	for(var i = 0; i < this.elements.length; i++) {
		this.elements[i].onmousemove = over;
		this.elements[i].onmouseout = out;
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
	var top = (document.documentElement.clientHeight - 250) / 2;
	var left = (document.documentElement.clientWidth - 350) / 2;
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

	};
	return this;
};
//去除锁屏功能
base.prototype.unlock = function() {
	for(var i = 0; i < this.elements.length; i++) {
		this.elements[i].style.display = "none";
		document.documentElement.style.overflow = "auto"; //取消锁屏显示滚动条	
	};
	return this;
};
//拖拽功能
base.prototype.drag = function() {
	for(var i = 0; i < this.elements.length; i++) {
		this.elements[i].onmousedown = function(e) {
			//preDef(e); //阻止浏览器默认行为
			var e = getEvent(e); //事件对象
			var _this = this;
			var diffX = e.clientX - _this.offsetLeft; //框到浏览器之间的距离
			var diffY = e.clientY - _this.offsetTop;
			if(typeof _this.setCapture != 'undefined') {
				_this.setCapture(); //阻止IE在拖拽到边界时出现空白区域
			};
			document.onmousemove = function(e) {
				var e = getEvent(e);
				var left = e.clientX - diffX;
				var top = e.clientY - diffY;
				//设定移动的边界
				if(left < 0) {
					left = 0;
				} else if(left > getInner().width - _this.offsetWidth) {
					left = getInner().width - _this.offsetWidth;
				};
				if(top < 0) {
					top = 0;
				} else if(top > getInner().height - _this.offsetHeight) {
					top = getInner().height - _this.offsetHeight;
				};
				_this.style.left = left + 'px';
				_this.style.top = top + 'px';
			};
			document.onmouseup = function() {
				this.onmousemove = null;
				this.onmouseup = null;
				if(typeof _this.releaseCapture != 'undefined') {
					_this.releaseCapture(); //阻止IE在拖拽到边界时出现空白区域
				};
			};
		};
	};
	return this;
};
//浏览器窗口事件
base.prototype.resize = function(fn) {
	for(var i = 0; i < this.elements.length; i++) {
		var element = this.elements[i];
		window.onresize = function() {
			fn();
			if(element.offsetLeft > getInner().width - element.offsetWidth) {
				element.style.left = getInner().width - element.offsetWidth + 'px';
			};
			if(element.offsetTop > getInner().height - element.offsetHeight) {
				element.style.top = getInner().height - element.offsetHeight + 'px';
			};
		};
	};
	return this;
}