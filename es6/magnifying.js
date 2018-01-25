define(["jquery"],function ($) {
	class Magnifying{
		constructor(){
			this.init();
		}
		init(){
			this.J_BigImg_max = $("#J_BigImg_max");
			this.shade = $(".shade");
			this.smll_magnifying = $("#smll_magnifying");
			this.magnifying_img = $("#magnifying_img");
			// this.J_BigImg_max.css({
			// 	width: $(J_BigImg_max).width() * 2,
			// 	height: $(J_BigImg_max).height() * 2
			// })
			this.shade.on("mousemove",$.proxy(this.max,this))
			this.shade.on("mouseout",$.proxy(this.hide,this))

		}
		// 鼠标移入
		max(e){
			this.smll_magnifying.show();
			this.magnifying_img.show();
			let left = e.pageX - $(e.target).offset().left - this.smll_magnifying.width() / 2;
			let sTop = e.pageY - $(e.target).offset().top  - this.smll_magnifying.height() / 2;
			let maxLeft = $(e.target).width()   - this.smll_magnifying.width() -3 ;
			let maxTop =   $(e.target).height() - this.smll_magnifying.height() -3 ;
			// 边界检测 start
			left = left < 0 ? 2 : left;
			sTop = sTop < 0 ? 2 : sTop;
			left = left >  maxLeft ? maxLeft : left; 
			sTop = sTop >  maxTop ? maxTop : sTop; 
			// 边界检测 end
			this.smll_magnifying.css({ 
				left:left,
				top:sTop
			})



			let popLeft = Math.round(left / maxLeft * 100) / 100;
			let popTop =  Math.round(sTop / maxTop  * 100) / 100 ;
			var maxBigLeft = $(smll_magnifying).width() - $(J_BigImg_max).width() - $(J_BigImg_max).width() / 2 ;
			var maxBigTop = $(smll_magnifying).height()  - $(J_BigImg_max).height()  - 280 ;
			this.J_BigImg_max.css({
				left: maxBigLeft * popLeft + $(J_BigImg_max).width() / 2,
				top:maxBigTop * popTop + 280
			})

		}
		// 移出隐藏
		hide(){
			this.smll_magnifying.hide();
			this.magnifying_img.hide();
		}
	}
	new Magnifying();
})