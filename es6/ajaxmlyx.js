/*
* @Author: 周海明
* @Date:   2018-01-18 18:15:48
* @Last Modified by:   周海明
* @Last Modified time: 2018-01-23 17:33:27
*/
define(["jquery"],function ($) {
 	class Ajaxset {
 		// 初始化
 		constructor(){
 			this.page = 1;
 			this.form = 0;
 			this.timer = null;
 			
 			$(window).on("scroll",$.proxy(this.load_img,this)) 
 		} 
 		// 数据请求
 		ajaxs(){
 			if (this.page > 7) {
 				$(".pullup").css({
					display : "none"
				})
 			}
 			var that = this;
 			$.ajax({
				url: 'http://mce.meilishuo.com/jsonp/get/3', 
				dataType: 'jsonp',
				data: {
					offset : 0,
					frame : this.form ,
					trace : 0,
					limit : 10,
					endId : 0,
					pid : 78492,
					page : this.page
				}
			})
			// 数据请求成功
			.done(function (res) {
				$.proxy(that.ajaxRes(res),that)
			})
 		}
 		// 拼接数据
 		ajaxRes(res) { 
			var html = "";
			$(res.data.list).each(function(index, el) {
				html += `<div class="item">
							<a href="javascript:;" class="pic_box" data-id="${el.item_id}" style = 'background-image:url(${el.item_pc_img});background-size: cover'>	
							</a>
							<div class="info">
								<div class="part">
									<div class="price">
										${el.price}
									</div>
									<div class="collect">
										<i class="icon_star"></i>
										${el.itemLikes}
									</div>
								</div>
								<p class="title">
									<i class="icon_select"></i>
									${el.title}
								</p>
							</div>
						</div>`;
						
			});
			$(".waterfall-container").append(html);
			$(".item").each(function(index, el) {
				if ((index + 1)%5 == 0) {
					$($(".waterfall-container .item")[index]).addClass('is-side')
				}
			});
			
			
		}
		// 瀑布流加载
		load_img(){
			clearTimeout(this.timer)
			try {
				var offset = $(".waterfall-container .item:last").offset().top;
			} catch(e) {
			}
			var that = this;
			if (($(window).scrollTop() + $(window).height()) > offset) {
					this.timer = setTimeout(function () {
						if (that.page == 8) {
							return 0;
						}else{
							that.page++;
							that.form++;
							that.ajaxs()
						}
					},500)
			}
		}
 	}
 	return new Ajaxset();
}) 