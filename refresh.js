var MyScrollComponent = function (option, callbackfun) {
		if (!document.getElementById(option.id)) {
			return console.log("cannot find object");
		}
		var MyScroll = function () {
		};
		MyScroll.prototype = {
			startY: 0,//the start y-coordinate of the document this.obj
			preY: 0,
			init: function () {
				var _this = this;
				this.obj = document.getElementById(option.id);
				this.freshnotice,
					this.fontsize = option.fontsize >= 15 ? option.fontsize : 15;
				this.obj.style.fontsize = this.fontsize + "px";
				option.style = option.style ? option.style : "ANDROID_1";
				document.addEventListener('touchstart', domtouched, false);
				document.addEventListener('touchmove', domtouched, false);
				document.addEventListener('touchend', domtouched, false);
				function domtouched(e) {
					var event = e || window.event;
					switch (event.type) {
						case "touchstart":
							_this.setoptions(option.style);
							_this.freshnotice.getElementsByTagName('p')[0].innerHTML = "下拉刷新";
							_this.startY = 0, _this.preY = 0;
							_this.startY = event.touches[0].clientY;
							break;
						case "touchmove":
							_this.preY = event.touches[0].clientY;
							var movelength = _this.preY - _this.startY;
							if (movelength > 0) {
								if (_this.obj.scrollTop == 0) {
									_this.obj.style.overflow = "hidden";
									_this.obj.addEventListener('touchmove', objtouched, false);
									_this.obj.addEventListener('touchend', objtouched, false);
								}
							}
							break;
						case "touchend":
							_this.obj.removeEventListener('touchmove', objtouched, false);
							_this.obj.removeEventListener('touchend', objtouched, false);
							break;
					}
				}
				function objtouched(e) {
					var event = e || window.event;
					switch (event.type) {
						case "touchstart":
							break;
						case "touchmove":
							_this.preY = event.touches[0].clientY;
							var movelength = _this.preY - _this.startY;
							if (option.style == "ANDROID_1") {
								_this.ANDROID_1(movelength);
							}
							break;
						case "touchend":
							_this.obj.style.overflow = "auto";
							if (option.style == "ANDROID_1") {
								var movelength = _this.preY - _this.startY;
								var duration = option.duration || 0.4;
								if (movelength > 60) {
									_this.obj.style.transition = "transform " + duration + "s";
									_this.obj.style.transform = "translateY(0)";
									_this.freshnotice.getElementsByTagName('p')[0].innerHTML = "正在刷新...";
									new loading1({ "id": "myCanvas" });
									callbackfun(_this);
								} else {
									_this.obj.style.transform = "translateY(-60px)";
									_this.freshnotice.getElementsByTagName('p')[0].innerHTML = "下拉刷新";
									_this.freshnotice.getElementsByClassName('logo')[0].style.transform = "rotate(0)";
								}
							}
							break;
					}
				}
			},
			ANDROID_1: function (Y) {
				if (Y < -60) {
					this.obj.style.transform = "translateY(-60px)";
					this.freshnotice.getElementsByTagName('p')[0].innerHTML = "下拉刷新";
					this.obj.style.overflow = "auto";
				} else {
					this.obj.style.transform = "translateY(" + Y + "px)";
					if (Y > 60) {
						this.freshnotice.getElementsByTagName('p')[0].innerHTML = "释放立即刷新";
						this.freshnotice.getElementsByClassName('logo')[0].style.transform = "rotate(180deg)";
					} else {
						this.freshnotice.getElementsByTagName('p')[0].innerHTML = "下拉刷新";
						this.freshnotice.getElementsByClassName('logo')[0].style.transform = "rotate(0)";
					}
				}
			},
			setoptions: function (scrolltype) {
				var content = "下拉刷新";
				if (scrolltype == "ANDROID_1") {
					if (!document.getElementsByClassName('this.freshnotice')[0]) {
						this.freshnotice = document.createElement('div');
						this.freshnotice.setAttribute('class', 'this.freshnotice');
						this.freshnotice.innerHTML = "";
					}
					return this.arrows(content);
				}
			},
			arrows: function (content) {
				var icon = document.createElement('div');
				icon.setAttribute('class', "logo");
				icon.style.cssText = "width:30px;height:35px;position:absolute;left:25%;bottom:10px;text-align:center";
				var _canvas = document.createElement('canvas');
				_canvas.setAttribute("id", "myCanvas");
				_canvas.width = "26";
				_canvas.height = "38";
				icon.appendChild(_canvas);
				this.freshnotice.innerHTML = '<div style="width:100%;line-height:60px;"><p style="font-size:' + this.fontsize + 'px">' + content + '</p></div>';
				this.freshnotice.style.cssText = 'line-height:60px;text-align:center;position:relative;';
				var ctx = _canvas.getContext("2d");
				ctx.clearRect(0, 0, 26, 38);
				ctx.beginPath();
				ctx.moveTo(6, 25);
				ctx.quadraticCurveTo(10, 21, 13, 0);
				ctx.quadraticCurveTo(16, 21, 20, 25);
				ctx.closePath();
				ctx.fillStyle = "#777";
				ctx.fill();
				ctx.beginPath();
				ctx.moveTo(2, 24);
				ctx.lineTo(24, 24);
				ctx.lineTo(13, 38);
				ctx.closePath();
				ctx.fill();
				this.freshnotice.insertBefore(icon, this.freshnotice.childNodes[0]);
				this.obj.insertBefore(this.freshnotice, this.obj.childNodes[0]);
				this.obj.style.transform = "translateY(-60px)";
				icon.style.transition = "transform .2s";
			},
			stop: function () {
				var _this = this;
				if (option.style == "ANDROID_1") {
					this.obj.style.transform = "translateY(-60px)";
					setTimeout(function () {
						_this.obj.style.transition = "transform 0s";
						_this.freshnotice.getElementsByTagName('p')[0].innerHTML = "下拉刷新";
						_this.freshnotice.getElementsByClassName('logo')[0].style.transform = "rotate(0)";
					}, 400);
				}
			}
		}
		var setscroll = new MyScroll();
		setscroll.init();
		function loading1(arg) {
			this.init(arg);
		}
		loading1.prototype = {
			init: function (arg) {
				this.block = arg.block ? arg.block : 12;
				this.height = arg.height ? arg.height : 5;
				this.width = arg.width ? arg.width : 2;
				this.time = arg.time ? arg.time : 100;

				this.cvs = document.getElementById(arg.id),
					this.ctx = this.cvs.getContext("2d");
				this.ctx.clearRect(0, 0, 26, 38);
				this.ctx.width = this.height * 6;
				this.ctx.height = this.height * 6;

				this.ctx.translate(13, 22);
				var radius = 2;
				this.view(radius);
			},
			loop: function (alpha) {
				this.ctx.rotate(Math.PI * 2 / this.block);
				// console.log(this.ctx.width,this.height);
				this.ctx.beginPath();
				this.ctx.fillStyle = "rgba(0,0,0," + alpha + ")";
				this.ctx.arc(0, this.ctx.width / 2 - this.height * 2, this.width / 2, 0, Math.PI, true);
				this.ctx.arc(0, this.ctx.width / 2 - this.height, this.width / 2, Math.PI, 0, true);
				this.ctx.closePath();
				this.ctx.fill();
			},
			view: function (radius) {
				var that = this;
				this.ctx.rotate(Math.PI * 2 / this.block);
				for (var i = 1; i <= this.block; i++) {
					this.loop(i / this.block);
				}
				setTimeout(function () {
					that.ctx.clearRect(-that.ctx.width / 2, -that.ctx.height / 2, that.ctx.width, that.ctx.height);
					radius >= that.block ? radius = 1 : radius += 1;
					that.view(radius);
				}, that.time);

			}
		}
	}