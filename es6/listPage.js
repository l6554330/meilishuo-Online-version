define(["jquery"],function ($) {
 	class Ajaxlist {
 		// 初始化
 		constructor(){

 		} 
 		init(){

 			this.page = parseInt(Math.random() * 7);
 			this.form = 0;
 			this.product = $(".product");
 			// 排序
 			this.borderright = $(".borderright"); 
 			// 热售
 			this.OnSaleNows = $(".OnSaleNow");
 			this.orderInfo = $(".orderInfo");
 			// 上新
 			this.new = $(".new");
 			this.down = $(".down");
 			this.up = $(".up");



 			this.borderright.on("click",$.proxy(this.fash,this));
 			this.OnSaleNows.on("click",$.proxy(this.OnSaleNow,this));
 			this.orderInfo.on("click",$.proxy(this.sorts,this));
 			this.new.on("click",$.proxy(this.snew,this));
 			this.down.on("click",$.proxy(this.prev,this));
 			this.up.on("click",$.proxy(this.next,this));
 			$(window).on("scroll",$.proxy(this.load_img,this)) 
 			this.ajaxs();
 		}
 		// 数据请求
 		ajaxs(){
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
			this.product.append(html);
			
			
			this.load()
			this.fash = res;
			
		}
		load(){
			$(".item").each(function(index, el) {
				if ((index + 1)%5 == 0) {
					$($(".item")[index]).addClass('is-side') 
				}
			});	

		}
		// 流行排序
		fash(){
			this.fashion("itemLikes","+")
		}
		fashion(itemLikes,lists){
			this.product.html("");
			function paixu(pre,next){  
				lists = lists != "-" ? next.itemLikes - pre.itemLikes:pre.itemLikes - next.itemLikes ;
			     return lists;
			}
			var list = this.fash.data.list.sort(paixu); 
			let html = "";
			$(list).each(function(index, el) {
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
			this.product.append(html);
			this.load()
		}
		// 热销排序
		OnSaleNow(){
			this.fashion("itemLikes","-")
		}
		sorts(e){
			$(e.target).siblings().removeClass('on');
			$(e.target).addClass('on');
		}
		snew(){
			this.fashion("itemSale","-")
		}
		prev(){
			this.fashion("price","-")
		}
		next(){
			this.fashion("price","+")
		}

 	}
 	return new Ajaxlist();
})  