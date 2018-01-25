"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

define(["jquery"], function ($) {
	var Ajaxlist = function () {
		// 初始化
		function Ajaxlist() {
			_classCallCheck(this, Ajaxlist);
		}

		_createClass(Ajaxlist, [{
			key: "init",
			value: function init() {

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

				this.borderright.on("click", $.proxy(this.fash, this));
				this.OnSaleNows.on("click", $.proxy(this.OnSaleNow, this));
				this.orderInfo.on("click", $.proxy(this.sorts, this));
				this.new.on("click", $.proxy(this.snew, this));
				this.down.on("click", $.proxy(this.prev, this));
				this.up.on("click", $.proxy(this.next, this));
				$(window).on("scroll", $.proxy(this.load_img, this));
				this.ajaxs();
			}
			// 数据请求

		}, {
			key: "ajaxs",
			value: function ajaxs() {
				var that = this;
				$.ajax({
					url: 'http://mce.meilishuo.com/jsonp/get/3',
					dataType: 'jsonp',
					data: {
						offset: 0,
						frame: this.form,
						trace: 0,
						limit: 10,
						endId: 0,
						pid: 78492,
						page: this.page
					}
				})
				// 数据请求成功
				.done(function (res) {
					$.proxy(that.ajaxRes(res), that);
				});
			}
			// 拼接数据

		}, {
			key: "ajaxRes",
			value: function ajaxRes(res) {
				var html = "";
				$(res.data.list).each(function (index, el) {
					html += "<div class=\"item\">\n\t\t\t\t\t\t\t<a href=\"javascript:;\" class=\"pic_box\" data-id=\"" + el.item_id + "\" style = 'background-image:url(" + el.item_pc_img + ");background-size: cover'>\t\n\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t<div class=\"info\">\n\t\t\t\t\t\t\t\t<div class=\"part\">\n\t\t\t\t\t\t\t\t\t<div class=\"price\">\n\t\t\t\t\t\t\t\t\t\t" + el.price + "\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t<div class=\"collect\">\n\t\t\t\t\t\t\t\t\t\t<i class=\"icon_star\"></i>\n\t\t\t\t\t\t\t\t\t\t" + el.itemLikes + "\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<p class=\"title\">\n\t\t\t\t\t\t\t\t\t<i class=\"icon_select\"></i>\n\t\t\t\t\t\t\t\t\t" + el.title + "\n\t\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>";
				});
				this.product.append(html);

				this.load();
				this.fash = res;
			}
		}, {
			key: "load",
			value: function load() {
				$(".item").each(function (index, el) {
					if ((index + 1) % 5 == 0) {
						$($(".item")[index]).addClass('is-side');
					}
				});
			}
			// 流行排序

		}, {
			key: "fash",
			value: function fash() {
				this.fashion("itemLikes", "+");
			}
		}, {
			key: "fashion",
			value: function fashion(itemLikes, lists) {
				this.product.html("");
				function paixu(pre, next) {
					lists = lists != "-" ? next.itemLikes - pre.itemLikes : pre.itemLikes - next.itemLikes;
					return lists;
				}
				var list = this.fash.data.list.sort(paixu);
				var html = "";
				$(list).each(function (index, el) {
					html += "<div class=\"item\">\n\t\t\t\t\t\t\t<a href=\"javascript:;\" class=\"pic_box\" data-id=\"" + el.item_id + "\" style = 'background-image:url(" + el.item_pc_img + ");background-size: cover'>\t\n\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t<div class=\"info\">\n\t\t\t\t\t\t\t\t<div class=\"part\">\n\t\t\t\t\t\t\t\t\t<div class=\"price\">\n\t\t\t\t\t\t\t\t\t\t" + el.price + "\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t<div class=\"collect\">\n\t\t\t\t\t\t\t\t\t\t<i class=\"icon_star\"></i>\n\t\t\t\t\t\t\t\t\t\t" + el.itemLikes + "\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<p class=\"title\">\n\t\t\t\t\t\t\t\t\t<i class=\"icon_select\"></i>\n\t\t\t\t\t\t\t\t\t" + el.title + "\n\t\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>";
				});
				this.product.append(html);
				this.load();
			}
			// 热销排序

		}, {
			key: "OnSaleNow",
			value: function OnSaleNow() {
				this.fashion("itemLikes", "-");
			}
		}, {
			key: "sorts",
			value: function sorts(e) {
				$(e.target).siblings().removeClass('on');
				$(e.target).addClass('on');
			}
		}, {
			key: "snew",
			value: function snew() {
				this.fashion("itemSale", "-");
			}
		}, {
			key: "prev",
			value: function prev() {
				this.fashion("price", "-");
			}
		}, {
			key: "next",
			value: function next() {
				this.fashion("price", "+");
			}
		}]);

		return Ajaxlist;
	}();

	return new Ajaxlist();
});