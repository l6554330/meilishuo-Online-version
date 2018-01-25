
 define(["jquery"],function ($) {
 	class Mljx{
 		constructor(){

 		}
 		// c初始化
 		init(){
 			this.html = "";
 			this.ajax();
 		}
 		// 加载数据
 		ajax(){
 			let that = this;
 			$.ajax({
				url: 'http://simba-api.meilishuo.com/mlselection/top/v1/topGoodsList/h5',
				dataType: 'jsonp',
				data: {
					"type" : "mrsx",
					"cid" : "mrsx",
					"ffset" : 0,
					"limit" : 20
				}
			})
			// 加载成功
			.done(function(res) {
				$.proxy(that.load_img(res),that)
					
			})
 		}
 		// 添加到页面
 		load_img(res){
 			let that = this;
			$(res.data.rows).each(function(index, el) {
				that.html += `<div class="item">
							<a href="javascript:;" class="pic_box" data-id="${el.signGoodsId}" style = 'background-image:url(${el.image});
	    background-size: cover'>
								
							</a>
							<div class="info">
								<div class="part">
									<div class="price">
										${el.discountPrice}
									</div>
									<div class="collect">
										<i class="icon_star"></i>
										${el.collectNum}
									</div>
								</div>
								<p class="title">
									<i class="icon_select"></i>
									${el.title}
								</p>
							</div>
						</div>`;

			});
			$(".content").append(this.html);
			// 样式调整
			$(".item").each(function(index, el) {
				if ((index + 1)%5 == 0) {
					$($(".content .item")[index]).addClass('is-side')
				}
			});
 		}
 	}
	return new Mljx();
	
})   