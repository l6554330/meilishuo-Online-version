"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

define(["jquery", "cookie"], function ($) {
	var ShoppingCar = function () {
		function ShoppingCar() {
			_classCallCheck(this, ShoppingCar);
		}

		_createClass(ShoppingCar, [{
			key: "init",
			value: function init() {
				// 加入购物车
				this.J_BuyCart = $("#J_BuyCart");
				// 样式
				this.img = $(".img");
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
				this.cart_account = $(".cart-account .num");
				this.cart_num = $(".drop .cart-num");
				this.sidebar_btn = $(".sidebar-btn .sidebar-num");

				this.J_BuyCart.on("click", $.proxy(this.shopping, this));
				this.J_PannelClose.on("click", $.proxy(this.close, this));
				this.J_Close.on("click", $.proxy(this.closeShopping, this));
				this.J_PannelOK.on("click", $.proxy(this.shopping, this));

				// 点击加
				this.add.on("click", $.proxy(this.num_add, this));
				// 点击减
				this.reduce.on("click", $.proxy(this.num_reduce, this));

				this.load();
			}
		}, {
			key: "num_add",
			value: function num_add() {
				if (this.num >= 1) {
					$(this.reduce).css({
						opacity: 1
					});
				}
				this.num++;
				$(this.num_input).val(this.num);
			}
		}, {
			key: "num_reduce",
			value: function num_reduce() {

				this.num--;
				$(this.num_input).val(this.num);
				if (this.num < 1) {
					this.num = 1;
					$(this.reduce).css({
						opacity: .3
					});
				}
			}
		}, {
			key: "shopping",
			value: function shopping() {
				var decide = this.J_SizeList.attr("class") == "c" || $(this.J_SizeList[1]).attr("class") == "c" || $(this.J_SizeList[2]).attr("class") == "c";
				if (decide) {
					this.close();
					this.shoppingCar();
					return 0;
				}
				if (this.img.attr("class") == "img c" || $(this.img[1]).attr("class") == "img c") {
					if (decide) {
						this.shoppingCar();
					} else {
						this.J_GoodsSku.addClass('goods-pannel');
					}
				} else {
					this.J_GoodsSku.addClass('goods-pannel');
				}
			}
		}, {
			key: "close",
			value: function close() {
				this.J_GoodsSku.removeClass('goods-pannel');
			}
		}, {
			key: "closeShopping",
			value: function closeShopping() {
				this.J_AddCartBox.hide();
			}
		}, {
			key: "shoppingCar",
			value: function shoppingCar() {
				var title = "";
				var color = "";
				for (var i = 0; i < this.J_SizeList.length; i++) {
					if ($(this.J_SizeList[i]).attr("class") == "c") {
						title = $(this.J_SizeList[i]).attr("title");
					}
				}
				for (var i = 0; i < this.img.length; i++) {
					if ($(this.img[i]).attr("class") == "img c") {
						color = $(this.img[i]).attr("title");
					}
				}
				var oCookie = $.cookie("shopping");
				if ($.cookie("shopping")) {
					this.J_AddCartBox.show();
					this.J_AddCartBox.css({
						left: $("html").width() / 2 - this.J_AddCartBox.width() / 2,
						top: $("html").height() / 2 + $("html").scrollTop() - this.J_AddCartBox.height() / 2
					});

					var flag = false;
					var aCookie = JSON.parse(oCookie);
					for (var i = 0; i < aCookie.length; i++) {
						if (aCookie[i].id == this.J_BuyCart.attr("data-id") && aCookie[i].color == color && aCookie[i].size == title) {
							flag = true;
							break;
						}
					}
					if (flag) {
						aCookie[i].priceSum = (parseFloat(aCookie[i].priceSum) + parseFloat(this.J_NowPrice.attr("data-price"))).toFixed(2);
						aCookie[i].input = parseInt(parseInt(aCookie[i].input) + parseInt(this.num_input.val()));
					} else {
						aCookie.push({
							"id": "" + this.J_BuyCart.attr("data-id"),
							"img": "" + this.J_BigImg.attr("src"),
							"title": "" + this.maoni.html(),
							"price": "" + this.J_NowPrice.attr("data-price"),
							"priceSum": "" + this.J_NowPrice.attr("data-price"),
							"input": "" + this.num_input.val(),
							"size": "" + title,
							"color": "" + color
						});
					}
					$.cookie("shopping", JSON.stringify(aCookie), {
						"path": "/",
						"expires": new Date("2019-8-8")
					});
				} else {
					var arr = "[{\n\t\t\t\t\t \t\t\t\"id\":\"" + this.J_BuyCart.attr("data-id") + "\",\n\t\t\t\t\t \t\t\t\"img\":\"" + this.J_BigImg.attr("src") + "\",\n\t\t\t\t\t \t\t\t\"title\":\"" + this.maoni.html() + "\",\n\t\t\t \t\t\t\t\t\"price\": \"" + Number(this.J_NowPrice.attr("data-price")) + "\",\n\t\t\t \t\t\t\t\t\"priceSum\": \"" + Number(this.J_NowPrice.attr("data-price")) + "\",\n\t\t\t\t\t \t\t\t\"input\":\"" + this.num_input.val() + "\",\n\t\t\t\t\t \t\t\t\"size\":\"" + title + "\",\n\t\t\t\t\t \t\t\t\"color\":\"" + color + "\"\n\t\t\t\t\t \t\t}]";
					$.cookie("shopping", arr, {
						"path": "/",
						"expires": new Date("2019-8-8")
					});
				}
			}
		}, {
			key: "load",
			value: function load() {
				if (!$.cookie("shopping")) {
					this.cartOrderTable.hide();
					this.cartEmptyPage.show();
					return 0;
				} else {
					this.cartOrderTable.show();
					this.cartEmptyPage.hide();
				}
				var aCookie = JSON.parse($.cookie("shopping"));
				var html = "";
				var htmlTwo = "";
				$(aCookie).each(function (index, el) {
					html += "<tr class=\"cart_mitem \"> \n\t\t\t   \t\t\t\t\t<td class=\"vm \">   \n\t\t\t   \t\t\t\t\t\t<input type=\"checkbox\" class=\"cart_thcheck\" data-stockid=\"" + el.id + "\">   \n\t\t\t   \t\t\t\t\t</td> \n\t\t\t   \t\t\t\t\t<td class=\"cart_table_goods_wrap\"  data-id=\"" + el.id + "\">\n\t\t\t   \t\t\t\t\t\t<!-- \u5546\u54C1 --> \n\t\t\t   \t\t\t\t\t\t<a href=\"javascript:;\" target=\"_blank\" class=\"cart_goods_img\"> \n\t\t\t   \t\t\t\t\t\t\t<img class=\"cartImgTip\" src=\"" + el.img + "\" width=\"78\" height=\"78\" alt=\"" + el.title + "\">  \n\t\t\t   \t\t\t\t\t\t</a> \n\t\t\t   \t\t\t\t\t\t<!-- \u5546\u54C1title --> \n\t\t\t   \t\t\t\t\t\t<a href=\"javascript:;\" target=\"_blank\" class=\"cart_goods_t cart_hoverline\" title=\"" + el.title + "\"> \n\t\t\t\t   \t\t\t\t\t\t" + el.title + "\n\t\t\t\t   \t\t\t\t\t</a>\n\t\t\t\t   \t\t\t\t\t<p class=\"remind_btm\"> \n\t\t\t\t   \t\t\t\t\t\t<!-- \u964D\u4EF7\u4FE1\u606F -->  \n\t\t\t\t   \t\t\t\t\t</p> \n\t\t\t\t   \t\t\t\t</td> \n\t\t\t\t   \t\t\t\t<td>  \n\t\t\t\t   \t\t\t\t\t<p class=\"cart_lh20\">\u989C\u8272\uFF1A" + el.color + "</p>  \n\t\t\t\t   \t\t\t\t\t<p class=\"cart_lh20\">\u5C3A\u7801\uFF1A" + el.size + "</p>  \n\t\t\t\t   \t\t\t\t</td> <td class=\"cart_alcenter\">\n\t\t\t\t   \t\t\t\t\t<!-- \u5355\u4EF7 -->  \n\t\t\t\t   \t\t\t\t\t<p class=\"cart_lh20 cart_bold cart_data_sprice\" data-price=\"790\"> " + el.price + " </p>   \n\t\t\t\t   \t\t\t\t</td> \n\t\t\t\t   \t\t\t\t<td class=\"cart_alcenter\">\n\t\t\t\t   \t\t\t\t\t<!-- \u6570\u91CF -->  \n\t\t\t\t   \t\t\t\t\t<div> \n\t\t\t\t   \t\t\t\t\t\t<div class=\"cart_num cart_counter\"> \n\t\t\t\t   \t\t\t\t\t\t\t<input type=\"text\" class=\"cart_num_input cart_bold\" maxlength=\"3\" value=\"" + el.input + "\">  \n\t\t\t\t   \t\t\t\t\t\t\t<span class=\"cart_num_add\"></span> \n\t\t\t\t   \t\t\t\t\t\t\t<span class=\"cart_num_reduce\"></span>   \n\t\t\t\t   \t\t\t\t\t\t</div> \n\t\t\t\t   \t\t\t\t\t</div>   \n\t\t\t\t   \t\t\t\t</td> \n\t\t\t\t   \t\t\t\t<td class=\"cart_alcenter\">\n\t\t\t\t   \t\t\t\t\t<!-- \u5C0F\u8BA1 --> \n\t\t\t\t   \t\t\t\t\t<p class=\"cart_deep_red cart_font16 item_sum\">" + el.priceSum + "</p> \n\t\t\t\t   \t\t\t\t</td> \n\t\t\t\t   \t\t\t\t<td class=\"cart_alcenter\">\n\t\t\t\t   \t\t\t\t\t<!-- \u64CD\u4F5C --> \n\t\t\t\t   \t\t\t\t\t<a href=\"javascript:;\" class=\"cart_hoverline clones delete\" data-color=\"" + el.color + "\" data-size=\"" + el.size + "\" data-id=\"" + el.id + "\">\u5220\u9664</a> \n\t\t\t\t   \t\t\t\t</td> \n\t\t\t\t   \t\t\t</tr>";
					htmlTwo += "<li class=\"clones_item\"> \n\t\t\t\t\t\t\t\t<a href=\"javascript:;\" target=\"_blank\" style=\"padding: 0; float: left;\"> \n\t\t\t\t\t\t\t\t\t<span class=\"cart-goods-img\" style=\"background-image: url(" + el.img + ")\">\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t</span> \n\t\t\t\t\t\t\t\t</a> \n\t\t\t\t\t\t\t\t<div class=\"cart-goods-desc\"> \n\t\t\t\t\t\t\t\t\t<p> \n\t\t\t\t\t\t\t\t\t\t<a href=\"javascript:;\" class=\"titleLoca\" style=\"padding: 0; float: left;\"  data-id=\"" + el.id + "\"> \n\t\t\t\t\t\t\t\t\t\t\t<span class=\"cart-goods-title\">" + el.title + "</span> \n\t\t\t\t\t\t\t\t\t\t</a> \n\t\t\t\t\t\t\t\t\t\t<span class=\"cart-goods-price\">\uFFE5" + el.price + "</span> \n\t\t\t\t\t\t\t\t\t</p> \n\t\t\t\t\t\t\t\t\t<p class=\"cart-goods-info\"> \n\t\t\t\t\t\t\t\t\t\t<span class=\"cart-goods-title\">  \n\t\t\t\t\t\t\t\t\t\t\t<span>\u989C\u8272:" + el.color + "</span>\n\t\t\t\t\t\t\t\t\t\t\t &nbsp;&nbsp;  \n\t\t\t\t\t\t\t\t\t\t\t <span>\u5C3A\u7801:" + el.size + "</span> \n\t\t\t\t\t\t\t\t\t\t\t &nbsp;&nbsp;  \n\t\t\t\t\t\t\t\t\t\t\t <!--<span>\u989C\u8272:\u7070\u8272</span> &nbsp;&nbsp;<span>\u5C3A\u7801:75B</span>&nbsp;&nbsp;--> \n\t\t\t\t\t\t\t\t\t\t\t</span> \n\t\t\t\t\t\t\t\t\t\t\t<em class=\"del-cart-goods\" data-stock=\"1wegpze\" data-color=\"" + el.color + "\" data-size=\"" + el.size + "\" data-id=\"" + el.id + "\"></em> \n\t\t\t\t\t\t\t\t\t\t</p> \n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</li>";
				});
				$(this.cartOrderTable).append(html);
				$(this.cart_goods).append(htmlTwo);
				$(this.cart_account).text(aCookie.length);
				$(this.cart_num).text(aCookie.length);
				$(this.sidebar_btn).text(aCookie.length);
			}
		}]);

		return ShoppingCar;
	}();

	return new ShoppingCar();
});