//插件入口
base.prototype.extend = function(name, fn) {
	base.prototype[name] = fn;
};

$().extend("drag", function(tags) {
	for(var i = 0; i < this.elements.length; i++) {
		addEvent(this.elements[i], 'mousedown', function(e) {
			if(trim(this.innerHTML).length == 0) e.preventDefault();
			var _this = this;
			var diffX = e.clientX - _this.offsetLeft; //框到浏览器之间的距离
			var diffY = e.clientY - _this.offsetTop;
			//自定义拖拽区
			var flag=false;
			for (var i=0;i<tags.length;i++) {//判断有几个可以拖动的点
				if(e.target==tags[i]){//只要确定一个点可以拖动，就会跳出循环
					flag=true;
					break;
				};
			};
			
			if(flag) { //只有当鼠标放在H2上面才能才能拖动
				addEvent(document, 'mousemove', move);
				addEvent(document, 'mouseup', up);
			} else {
				removeEvent(document, 'mousemove', move);
				removeEvent(document, 'mouseup', up);
			};

			function move(e) {
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

				if(typeof _this.setCapture != 'undefined') {
					_this.setCapture(); //阻止IE在拖拽到边界时出现空白区域
				};
			};

			function up() {
				removeEvent(document, 'mousemove', move)
				removeEvent(document, 'mouseup', up)
				if(typeof _this.releaseCapture != 'undefined') {
					_this.releaseCapture(); //阻止IE在拖拽到边界时出现空白区域
				};
			};
		});

	};
	return this;
});

