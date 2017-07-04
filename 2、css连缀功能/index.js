//使用对象的方法来获取名称
//var base={
//	getId:function(id){
//		return document.getElementById(id)
//	},
//	getName:function(name){
//		return document.getElementsByName(name)
//	},
//	getTagName:function(tag){
//		return document.getElementsByTagName(tag)
//	}
//};

//另外一种书写方式------封装,因为要实现改变style的样式





//为了不使所有的方法都统一,每次都new 一个base，导致html里 var base 需要注释
//且var base 下的base 需要改成$();

var $=function(){
	return new base();
}



function base() {
	//创建一个数组来存储style的样式
	this.elements = [];
	//获取id
	this.getId = function(id) {
		//将获取到的存储到数组里面
		this.elements.push(document.getElementById(id));
		//为了进行链式操作需要return出一个this供后面进行调用
		return this;
	};
	//获取元素节点--tagName
	this.getTagName = function(tag) {
		var tags = document.getElementsByTagName(tag);
		//因为有多个p标签 需要将其进行循环才能获取每个
		for(var i = 0; i < tags.length; i++) {
			this.elements.push(tags[i])
		};
		return this;
	};
}

//使用继承来实现css样式
base.prototype.css = function(attr, value) {
	for(var i = 0; i < this.elements.length; i++) {
		this.elements[i].style[attr] = value;
	};
	return this;
}
//获取html内容
base.prototype.html = function(str) {
	for(var i = 0; i < this.elements.length; i++) {
		this.elements[i].innerHTML = str;
	};
	return this;
}
//增加点击事件
base.prototype.click=function(fn){
	for (var i = 0; i < this.elements.length; i++) {
		this.elements[i].onclick=fn;
	};
	return this;
}
