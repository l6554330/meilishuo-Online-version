/*
* @Author: 周海明
* @Date:   2018-01-18 16:32:17
* @Last Modified by:   周海明
* @Last Modified time: 2018-01-20 21:07:13
*/
// console.log(1)
define(["jquery"],function ($) {
	// console.log($)
	function Garousel () {
		// this.init();
	}
	// 定义原型
	Garousel.prototype = {
		// 更改constructor指向
		constructor:Garousel,
		// 初始化
		init:function () {
			this.index = 0;
			$(".b_dot li").on("mouseover",$.proxy(this.spBl,this)),
			$(".next").on("click",$.proxy(this.next,this))
			$(".prev").on("click",$.proxy(this.prev,this))
			$.proxy(this.next(),this);
			$(".banner").on("mouseover",$.proxy(this.clearInt,this))
			$(".banner").on("mouseout",$.proxy(this.setInt,this))
			this.timer = setInterval($.proxy(this.next,this),4500);
		},
		// 圆点运动
		spBl:function (e) {
			var index = $(e.target).html() - 1;
			this.animate(index);
		},
		// 下一张
		next:function () {
			if (this.index > 3) {
				this.index = 0
			}else {
				this.index++
			}
			// console.log(this)
			this.animate(this.index)
		},
		// 上一张
		prev:function () {
			if (this.index <= 0) {
				this.index = 4
			}else {
				this.index--
			};
			
			this.animate(this.index);
		},
		// 自动播放
		setInt:function () {
			this.timer = setInterval($.proxy(this.next,this),4300);
		},
		// 关闭定时器
		clearInt:function () {
			clearInterval(this.timer);
		},
		// 动画
		animate:function (index) {
			$(".b_dot li").each(function (index,el) {
				$(el).removeClass('on');
				$(".banner li").css({
					opacity:0
				})
				.removeClass("curren");
				$(".banner li img").css({
					transform: "scaleX(1.1) scaleY(1.1)"
				})
			});
			// console.log(index)
			$($(".banner li")[index])
				.animate({
					opacity:1
				},300)
				.addClass('curren')
			$($(".banner li img")[index]).css({
				transform: ""
			})
			$($(".b_dot li")[index]).addClass('on')
		}
	}
	// function am(index) {
		
	// }
	// function next() {
		
	// }
	// $(".b_dot li").on("mouseover",function () {
	// 	var index = $(this).html() - 1;
	// 	am(index);
	// })
	// var index = 0;
	
	// $(".prev").on("click",function () {
	// 	if (index <= 0) {
	// 		index = 4
	// 	}else {
	// 		index--
	// 	}
		
	// 	am(index)
	// })
	// next();
	// var timer = setInterval(next,4300);
	// $(".banner").on("mouseover",function () {
	// 	clearInterval(timer);
	// })
	// $(".banner").on("mouseout",function () {
	// 	timer = setInterval(next,4300);
	// })
	// console.log(Garousel.prototype.am)
	return new Garousel();
})