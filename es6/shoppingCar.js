define(["jquery","cookie"],function ($) {
	class ShoppingCar{
		constructor(){
			
		}
		init(){
			// 加入购物车
			this.J_BuyCart = $("#J_BuyCart");
			// 样式
			this.img = $(".img")
			// 大小
			this.J_SizeList = $(".J_SizeList").find("li");
			// 样式组
			this.J_GoodsSku = $("#J_GoodsSku");
			// 按钮组
			this.goods_buy = $(".goods-buy");
			// 点击关闭
			this.J_PannelClose = $(".J_PannelClose");
			this.J_Close = $(".J_Close");
			// 确认
			this.J_PannelOK = $(".J_PannelOK");
			// 加入购物车成功
			this.J_AddCartBox = $("#J_AddCartBox");
			// 图片
			this.J_BigImg = $("#J_BigImg");
			// title
			this.maoni = $("#maoni");
			// 价格
			this.J_NowPrice = $("#J_NowPrice");
			// 件数
			this.num_input = $(".num-input");
			// 件数减
			this.reduce = $(".num-reduce");
			// 件数加
			this.add = $(".num-add");
			this.num = this.num_input.val();
			// 购物车
			this.cartOrderTable = $("#cartOrderTable");
			// 购物车是空的
			this.cartEmptyPage = $("#cartEmptyPage");
			this.cart_goods = $(".cart-goods");
			this.cart_account = $(".cart-account .num")
			this.cart_num = $(".drop .cart-num")
			this.sidebar_btn = $(".sidebar-btn .sidebar-num")

			



			this.J_BuyCart.on("click",$.proxy(this.shopping,this))
			this.J_PannelClose.on("click",$.proxy(this.close,this))
			this.J_Close.on("click",$.proxy(this.closeShopping,this))
			this.J_PannelOK.on("click",$.proxy(this.shopping,this))
			
			// 点击加
			this.add.on("click",$.proxy(this.num_add,this))
			// 点击减
			this.reduce.on("click",$.proxy(this.num_reduce,this))

			this.load();
		}
	 	num_add(){
	 		if (this.num >= 1) {
	 			$(this.reduce).css({
	 				opacity : 1
	 			})
	 		}
	 		this.num++;
	 		$(this.num_input).val(this.num)
	 	}
	 	num_reduce(){ 
	 		
	 		this.num--;
	 		$(this.num_input).val(this.num) 
	 		if(this.num < 1){
	 			this.num = 1; 
	 			$(this.reduce).css({
	 				opacity : .3
	 			})
	 			
	 		}
	 	} 
		shopping(){
		 	let decide = this.J_SizeList.attr("class")  == "c" || $(this.J_SizeList[1]).attr("class") == "c"|| $(this.J_SizeList[2]).attr("class") == "c";
		 	if (decide) {
		 		this.close()
		 		this.shoppingCar();
		 		return 0;
		 	}
		 	if (this.img.attr("class")  == "img c" || $(this.img[1]).attr("class") == "img c") {
		 		if (decide) {
		 			this.shoppingCar();
		 		}else {
		 			this.J_GoodsSku.addClass('goods-pannel')
		 		}
		 	}else{
		 		this.J_GoodsSku.addClass('goods-pannel')
		 	}
	 	}
	 	close(){
		 	this.J_GoodsSku.removeClass('goods-pannel')
 		} 
	 	closeShopping(){
	 		this.J_AddCartBox.hide();
	 	}
	 	shoppingCar(){ 
	 		let title = "";
	 		let color = "";
	 		for (var i = 0; i < this.J_SizeList.length; i++) {
	 			if ($(this.J_SizeList[i]).attr("class") == "c") {
		 			title = $(this.J_SizeList[i]).attr("title")
		 		}
	 		}
	 		for (var i = 0; i < this.img.length; i++) {
	 			if ($(this.img[i]).attr("class") == "img c") {
		 			color = $(this.img[i]).attr("title")
		 		}
	 		}
	 		let oCookie = $.cookie("shopping")
		 	if ($.cookie("shopping")) {
		 		this.J_AddCartBox.show();
		 		this.J_AddCartBox.css({
		 			left:($("html").width() / 2) - (this.J_AddCartBox.width() / 2),
		 			top:(($("html").height() / 2)  + $("html").scrollTop()) - (this.J_AddCartBox.height() / 2)
		 		})

		 		var flag = false;
				var aCookie = JSON.parse(oCookie);
				for (var i = 0; i < aCookie.length; i++) {
					if (aCookie[i].id == this.J_BuyCart.attr("data-id") && aCookie[i].color == color && aCookie[i].size == title ) {
						flag = true;
						break;
					}
				}
				if (flag) {
					aCookie[i].priceSum = (parseFloat(aCookie[i].priceSum )+ parseFloat(this.J_NowPrice.attr("data-price"))).toFixed(2);  
					aCookie[i].input = parseInt(parseInt(aCookie[i].input) + parseInt(this.num_input.val()));
				}else {
					aCookie.push({
			 			"id":`${this.J_BuyCart.attr("data-id")}`,
			 			"img":`${this.J_BigImg.attr("src")}`,
			 			"title":`${this.maoni.html()}`,
			 			"price": `${this.J_NowPrice.attr("data-price")}`,
			 			"priceSum": `${this.J_NowPrice.attr("data-price")}`,
			 			"input":`${this.num_input.val()}`,
			 			"size":`${title}`,
			 			"color":`${color}`
					});
				}
				$.cookie("shopping",JSON.stringify(aCookie),{
		 			"path":"/", 
		 			"expires":new Date("2019-8-8")
		 		})
		 	}else {
		 		let arr = 	`[{
					 			"id":"${this.J_BuyCart.attr("data-id")}",
					 			"img":"${this.J_BigImg.attr("src")}",
					 			"title":"${this.maoni.html()}",
			 					"price": "${Number(this.J_NowPrice.attr("data-price"))}",
			 					"priceSum": "${Number(this.J_NowPrice.attr("data-price"))}",
					 			"input":"${this.num_input.val()}",
					 			"size":"${title}",
					 			"color":"${color}"
					 		}]`
		 		$.cookie("shopping",arr,{
		 			"path":"/", 
		 			"expires":new Date("2019-8-8")
		 		})
		 	}
	 	}
	 	load(){	 		
	 		if (!$.cookie("shopping")) {
	 			this.cartOrderTable.hide()
	 			this.cartEmptyPage.show()
	 			return 0;
	 		}else {
	 			this.cartOrderTable.show()
	 			this.cartEmptyPage.hide()
	 		}
	 		var aCookie =  JSON.parse($.cookie("shopping"));
	 		let html = "";
	 		let htmlTwo = "";
	 		$(aCookie).each(function(index, el) {
	 			html += `<tr class="cart_mitem "> 
			   					<td class="vm ">   
			   						<input type="checkbox" class="cart_thcheck" data-stockid="${el.id}">   
			   					</td> 
			   					<td class="cart_table_goods_wrap"  data-id="${el.id}">
			   						<!-- 商品 --> 
			   						<a href="javascript:;" target="_blank" class="cart_goods_img"> 
			   							<img class="cartImgTip" src="${el.img}" width="78" height="78" alt="${el.title}">  
			   						</a> 
			   						<!-- 商品title --> 
			   						<a href="javascript:;" target="_blank" class="cart_goods_t cart_hoverline" title="${el.title}"> 
				   						${el.title}
				   					</a>
				   					<p class="remind_btm"> 
				   						<!-- 降价信息 -->  
				   					</p> 
				   				</td> 
				   				<td>  
				   					<p class="cart_lh20">颜色：${el.color}</p>  
				   					<p class="cart_lh20">尺码：${el.size}</p>  
				   				</td> <td class="cart_alcenter">
				   					<!-- 单价 -->  
				   					<p class="cart_lh20 cart_bold cart_data_sprice" data-price="790"> ${el.price} </p>   
				   				</td> 
				   				<td class="cart_alcenter">
				   					<!-- 数量 -->  
				   					<div> 
				   						<div class="cart_num cart_counter"> 
				   							<input type="text" class="cart_num_input cart_bold" maxlength="3" value="${el.input}">  
				   							<span class="cart_num_add"></span> 
				   							<span class="cart_num_reduce"></span>   
				   						</div> 
				   					</div>   
				   				</td> 
				   				<td class="cart_alcenter">
				   					<!-- 小计 --> 
				   					<p class="cart_deep_red cart_font16 item_sum">${el.priceSum}</p> 
				   				</td> 
				   				<td class="cart_alcenter">
				   					<!-- 操作 --> 
				   					<a href="javascript:;" class="cart_hoverline clones delete" data-color="${el.color}" data-size="${el.size}" data-id="${el.id}">删除</a> 
				   				</td> 
				   			</tr>`
				htmlTwo += `<li class="clones_item"> 
								<a href="javascript:;" target="_blank" style="padding: 0; float: left;"> 
									<span class="cart-goods-img" style="background-image: url(${el.img})">
										
									</span> 
								</a> 
								<div class="cart-goods-desc"> 
									<p> 
										<a href="javascript:;" class="titleLoca" style="padding: 0; float: left;"  data-id="${el.id}"> 
											<span class="cart-goods-title">${el.title}</span> 
										</a> 
										<span class="cart-goods-price">￥${el.price}</span> 
									</p> 
									<p class="cart-goods-info"> 
										<span class="cart-goods-title">  
											<span>颜色:${el.color}</span>
											 &nbsp;&nbsp;  
											 <span>尺码:${el.size}</span> 
											 &nbsp;&nbsp;  
											 <!--<span>颜色:灰色</span> &nbsp;&nbsp;<span>尺码:75B</span>&nbsp;&nbsp;--> 
											</span> 
											<em class="del-cart-goods" data-stock="1wegpze" data-color="${el.color}" data-size="${el.size}" data-id="${el.id}"></em> 
										</p> 
									</div>
								</li>`
	 		});
	 		$(this.cartOrderTable).append(html)
	 		$(this.cart_goods).append(htmlTwo)
	 		$(this.cart_account).text(aCookie.length)
	 		$(this.cart_num).text(aCookie.length)
	 		$(this.sidebar_btn).text(aCookie.length)

	 	}
	}
	return new ShoppingCar();
})