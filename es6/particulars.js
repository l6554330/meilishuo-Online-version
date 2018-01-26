define(["jquery","cookie"],function ($) {
	// 点击跳转详情页
	class Particulars {
		constructor(){
			this.init()
		}
		init(){ 
			this.item = $(".concas");
			this.cart_goods_t = $("#cartOrderTable");
			this.titleLoca = $(".cart-goods");

			// 购物结算
			// 全选
			this.s_all_h = $("#s_all_h");
			// 店铺全选
			this.s_shopall = $(".s_shopall");
			// 单选
			this.cart_thcheck = $(".cart_thcheck");

			this.md_process_sd = $(".md_process_sd");

			this.item.on("click",".item",this.list)
			this.cart_goods_t.on("click",".cart_goods_t",this.listShopping)
			this.titleLoca.on("click",".titleLoca",this.listSmllShopping)
			// 单选框选中
			this.s_all_h.on("click",$.proxy(this.cheack,this))
			this.s_shopall.on("click",$.proxy(this.cheackStore,this))
			this.cart_thcheck.on("click",$.proxy(this.cheackOne,this)) 



			// 判断购物车是否有物品
			this.cart_account = $(".cart-account");
			this.cart_num = $(".cart-num");

			// 和
			this.pop;
			this.goodsSum = $(".goodsSum")


			// 点击删除
			this.del_cart_goods = $(".cart-goods");
			this.clones = $("#cartOrderTable");
			this.clones.on("click",".clones",this.coles)
			this.del_cart_goods.on("click",".del-cart-goods",this.coles)

			// 清空购物车
			this.cartRemoveChecked = $("#cartRemoveChecked");
			this.cartRemoveChecked.on("click",$.proxy(this.cart,this))
			// 结算
			this.payBtn = $("#payBtn");
			this.cart_nobdbtm = $(".cart_nobdbtm")
			this.J_productPay = $("#J_productPay")
			this.payhover = $(".payhover .num")
			this.payBtn.on("click",$.proxy(this.sum,this))

			this.hover()
		}
		cart(){
			if (!$.cookie("shopping")) {
				return 0;
			}
			let oCookie = JSON.parse($.cookie("shopping"));
			if ($(this.s_all_h).prop("checked") == true) {
				$.cookie("shopping","")
				location.reload() 
			}else {
				let flag = false;
				$(this.cart_thcheck).each(function(index, el) {
					if ($(el).prop("checked") == true) {
						oCookie.splice(index,1);
						flag = true;
					}
				});
				let aCookie = JSON.stringify(oCookie);
				if (flag) {
					$.cookie("shopping",aCookie,{
			 			"path":"/", 
			 			"expires":new Date("2019-8-8")
			 		})
			 		location.reload()
				}
			}
		}
		hover(){
			if ($.cookie("shopping") != "[]" && $.cookie("shopping")) {
				this.cart_account.show()
				this.cart_account.parent().css("border","1px solid #eee")
				this.cart_num.show()
			}else {
				this.cart_account.hide()
				this.cart_account.parent().css("border","none")
				this.cart_num.hide()
			}
		}
		list(){
			$.cookie("list",$(this).find("a").attr("data-id"));
			location.href = "details.html";
		}
		listShopping(){
			$.cookie("list",$(this).attr("data-id"));
			location.href = "details.html";
		}
		listSmllShopping(){
			$.cookie("list",$(this).attr("data-id"));
			location.href = "details.html";
		}
		coles(){
			let id = $(this).attr("data-id");
			let color = $(this).attr("data-color");
			let size = $(this).attr("data-size");
			if (!$.cookie("shopping")) {
				return 0;
			}
			let oCookie = JSON.parse($.cookie("shopping"));
			$(oCookie).each(function(index, el) {
				if (el.id == id && el.color == color && el.size == size) {
					oCookie.splice(index,1);
				}
			});
			let aCookie = JSON.stringify(oCookie);
			$.cookie("shopping",aCookie,{
	 			"path":"/", 
	 			"expires":new Date("2019-8-8")
	 		})
	 		location.reload()
		}
		cheack(e){
			if ($(e.target).prop("checked") != true) {
				this.s_all_h.prop("checked",false)
				this.cart_thcheck.prop("checked",false)
				this.s_shopall.prop("checked",false)
				return 0;
			}
			this.s_all_h.prop("checked",true)
			this.s_shopall.prop("checked",true)
			this.cart_thcheck.prop("checked",true)
			if (!$.cookie("shopping")) {
				return 0;
			}
			let pop = 0;
			let oCookie = JSON.parse($.cookie("shopping"));
			$(oCookie).each(function(index, el) {
				pop += parseFloat(el.priceSum) 
			});
			this.goodsSum.html("¥"+pop);

		}
		cheackStore(e){
			if ($(e.target).prop("checked") != true) {
				this.cart_thcheck.prop("checked",false)
				return 0;
			}
			this.cart_thcheck.prop("checked",true)
			this.s_shopall.prop("checked",true)
			if (!$.cookie("shopping")) {
				return 0;
			}
			let pop = 0;
			let oCookie = JSON.parse($.cookie("shopping"));
			$(oCookie).each(function(index, el) {
				pop += parseFloat(el.priceSum) 
			});
			this.goodsSum.html("¥"+pop);
		}
		cheackOne(){
			if (!$.cookie("shopping")) {
				return 0;
			}
			let pop = 0;
			let oCookie = JSON.parse($.cookie("shopping"));
			let that = this;
			$(oCookie).each(function(index, el) {
				if ($(that.cart_thcheck[index]).prop("checked")  == true) {
					if (el.id == $(that.cart_thcheck).attr("data-stockid")) {
						pop += parseFloat(el.priceSum) 
					}
				}
			});
			this.goodsSum.html("¥"+pop.toFixed(2));
		}
		sum(){
			this.cart_nobdbtm.hide()
			this.J_productPay.show()
			this.payhover.html(this.goodsSum.html())
			
			this.md_process_sd.width("500")
		}

	}
	new Particulars();
})