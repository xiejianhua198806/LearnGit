//使用对象的方法来获取名称
var base={
	getId:function(id){
		return document.getElementById(id)
	},
	getName:function(name){
		return document.getElementsByName(name)
	},
	getTagName:function(tag){
		return document.getElementsByTagName(tag)
	}
};
