"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
* @Author: 周海明
* @Date:   2018-01-20 21:07:38
* @Last Modified by:   周海明
* @Last Modified time: 2018-01-25 09:49:57
*/
define(["jquery", "cookie"], function ($) {
	var List = function () {
		function List() {
			_classCallCheck(this, List);
		}
		// 初始化


		_createClass(List, [{
			key: "init",
			value: function init() {
				// 获取事件源
				this.cookie();
				this.all = $(".all");
				this.slideer = $(".slideer");
				this.J_Graphic = $("#J_Graphic");
				this.panel_title = $(".panel-title h1");
				// 图片
				this.img_box = $(".img-box title");
				// 列表
				this.list = $(".primary-slide .list .box ul");
				this.repeat_list = $(".repeat-list");
				// 同类
				this.recommend_list = $(".recommend-list ul");
				// buyer列表
				this.J_RatesBuyerList = $("#J_RatesBuyerList");
				// 表格
				this.tables = $(".size-table");
				// 看了又看模块
				this.graphic_block = $(".load_size");
				// 产品颜色
				this.j_styleList = $(".J_StyleList");
				// 视窗图
				this.J_BigImg = $("#J_BigImg");
				this.J_BigImg_max = $("#J_BigImg_max");
				// 尺寸
				this.J_SizeList = $(".J_SizeList");
				// 顶部悬浮所需元素
				// 店铺名
				this.module_shop = $(".module-shop .shop-hd");
				// 商品详情
				this.module_tabpanel = $(".module-tabpanel .tabbar-box");
				// 背景
				this.tabbar_bg = $(".tabbar-bg");
				// 购物车
				this.cart_hd = $("#J_ModuleCart .cart-hd");
				// 楼梯
				this.extranav_bd = $(".extranav-bd");
				// 距离顶部高度
				this.module_tabpanel_col = $(".col-main");
				this.occupying = $(".tabbar-occupying");
				// 商品描述 
				this.J_Graphic_desc = $("#J_Graphic_desc");
				// 穿着效果
				this.graphic_block_c = $(".block_top");
				// 差值
				this.pops = this.module_tabpanel.height();
				// 尺码说明
				this.J_Graphic_尺码说明 = $("#J_Graphic_尺码说明");
				// 商品推荐
				this.J_RecommendList = $("#J_RecommendList");
				// 选项栏
				this.tabbar_list = $(".tabbar-box .tabbar-list");
				// 评价区
				this.J_ModuleRates = $("#J_ModuleRates");
				// 页面主体
				this.J_ModuleGraphic = $("#J_ModuleGraphic");
				// 商品推荐
				this.J_ModuleRecommend = $("#J_ModuleRecommend");
				// 供应商
				this.liangzhao = $("#liangzhao");
				// 导航页
				this.category_parent = $(".category-parent");
				// 标题
				this.maoni = $("#maoni")[0];
				// 销量
				this.sales = $("#sales");
				// 页数
				this.page = 0;
				// 加入购物车按钮
				this.J_BuyCart = $("#J_BuyCart");
				// 价格
				this.J_NowPrice = $("#J_NowPrice");

				// 绑定事件
				this.all.on("mouseover", $.proxy(this.show, this));
				this.slideer.on("mouseover", $.proxy(this.show, this));
				this.slideer.on("mouseout", $.proxy(this.hide, this));
				this.all.on("mouseout", $.proxy(this.hide, this));
				// 加载
				this.ajax("../json/maoni.json", "GET", $.proxy(this.graphic, this));
				// 加载详情
				this.$ajax("http://event.meilishuo.com/provider/certificate", "GET", "jsonp", {
					itemId: "1kovcl4"
				}, $.proxy(this.load_goods, this));
				// 加载同类
				this.ajax("../json/tonglei.json", "GET", $.proxy(this.load_class, this));
				this.ajax("../json/klyk.json", "GET", $.proxy(this.load_look, this));
				this.ajax("../json/comment.json", "GET", $.proxy(this.load_comment, this));
				// 加载热卖
				this.ajax("../json/remai.json", "GET", $.proxy(this.load_comments, this));
				// 加载简介图片
				this.ajax("../json/maoni.json", "GET", $.proxy(this.load_table, this));
				// 加载尺寸
				this.ajax("../json/maoni.json", "GET", $.proxy(this.load_size, this));
				// 点击打钩
				this.j_styleList.on("click", $.proxy(this.styleAdd, this));
				this.J_SizeList.on("click", $.proxy(this.sizeAdd, this));
				// 顶部悬浮
				$(window).on("scroll", $.proxy(this.scroll, this));
				this.extranav_bd.on("click", $.proxy(this.stairs, this));
				this.tabbar_list.on("click", $.proxy(this.xuanxian, this));
				this.category_parent.on("click", $.proxy(this.fideIn, this));
			}
			// 显示

		}, {
			key: "show",
			value: function show() {
				this.slideer.show();
			}
			// 隐藏

		}, {
			key: "hide",
			value: function hide() {
				this.slideer.hide();
			}
			// 获取本地数据

		}, {
			key: "ajax",
			value: function ajax(url, type, callback) {
				$.ajax({
					url: url,
					type: type,
					dataTupr: "json",
					success: function success(res) {
						callback(res);
					}
				});
			}
		}, {
			key: "$ajax",
			value: function $ajax(url, type, dataType, data, callback) {
				$.ajax({
					url: url,
					type: type,
					dataType: dataType,
					data: data
				}).done(function (res) {
					callback(res);
				});
			}
			// 图文详情

		}, {
			key: "graphic",
			value: function graphic(res) {
				var html = "";
				$(res.data.detailInfos.detailImage[0].list).each(function (index, el) {
					html += "\t<div class=\"graphic-pic\"> \n\t            \t\t\t\t<div class=\"pic-box\" style = 'font-size:0'> \n\t            \t\t\t\t\t<img class=\"lazy\" style=\"left: -350px; display: block;\" src=\"" + el + "\"> \n\t            \t\t\t\t</div> \n\t            \t\t\t</div> ";
				});
				this.J_Graphic.append(html);
			}
		}, {
			key: "load_goods",
			value: function load_goods(res) {
				this.panel_title.html = res.data.title;
				this.img_box.src = res.data.url;
			}
		}, {
			key: "load_comments",
			value: function load_comments(res) {
				var html = "";
				$(res.data.list).each(function (index, el) {
					html += "<li> \n\t\t\t\t\t\t\t<a href=\"javascript:;\" target=\"_blank\"> \n\t\t\t\t\t\t\t\t<img src=\"" + el.image + "\" width=\"120\"> \n\t\t\t\t\t\t\t</a> \n\t\t\t\t\t\t\t<span>\uFFE5" + el.discountPrice + "</span> \n\t\t\t\t\t\t</li>";
				});
				this.list.append(html);
			}
			//看了又看

		}, {
			key: "load_look",
			value: function load_look(res) {
				var html = "";
				$(res.data.list).each(function (index, el) {
					html += "\t<li> \n\t\t\t\t\t\t\t\t<a class=\"pic\" href=\"javascript:;\" target=\"_blank\"> \n\t\t\t\t\t\t\t\t\t<img class=\"lazy\" src=\"" + el.image + "_220x330.jpg\" style=\"display: block;\"> \n\t\t\t\t\t\t\t\t</a> \n\t\t\t\t\t\t\t\t<a class=\"title\" href=\"javascript:;\" target=\"_blank\">\n\t\t\t\t\t\t\t\t\t" + el.title + "\n\t\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t\t<div class=\"info\">\n\t\t\t\t\t\t\t\t\t<div class=\"price\"> \n\t\t\t\t\t\t\t\t\t\t<em class=\"price-u\">\xA5</em> \n\t\t\t\t\t\t\t\t\t\t<span class=\"price-n\">" + el.price + "</span> \n\t\t\t\t\t\t\t\t\t</div> \n\t\t\t\t\t\t\t\t\t<div class=\"fav\"> \n\t\t\t\t\t\t\t\t\t\t<em class=\"fav-i\"></em>\n\t\t\t\t\t\t\t\t\t\t<span class=\"fav-n\">" + el.cfav + "</span> \n\t\t\t\t\t\t\t\t\t</div> \n\t\t\t\t\t\t\t\t</div> \n\t\t\t\t\t\t\t</li>";
				});
				this.repeat_list.append(html);
			}
			// 加载同类

		}, {
			key: "load_class",
			value: function load_class(res) {
				var html = "";
				$(res.data.list).each(function (index, el) {
					html += "\t<li> \n\t\t\t\t\t\t\t\t<a class=\"pic\" href=\"javascript:;\" target=\"_blank\"> \n\t\t\t\t\t\t\t\t\t<img class=\"lazy\" src=\"" + el.image + "_220x330.jpg\" style=\"display: block;\"> \n\t\t\t\t\t\t\t\t</a> \n\t\t\t\t\t\t\t\t<a class=\"title\" href=\"javascript:;\" target=\"_blank\">\n\t\t\t\t\t\t\t\t\t" + el.title + "\n\t\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t\t<div class=\"info\">\n\t\t\t\t\t\t\t\t\t<div class=\"price\"> \n\t\t\t\t\t\t\t\t\t\t<em class=\"price-u\">\xA5</em> \n\t\t\t\t\t\t\t\t\t\t<span class=\"price-n\">" + el.price + "</span> \n\t\t\t\t\t\t\t\t\t</div> \n\t\t\t\t\t\t\t\t\t<div class=\"fav\"> \n\t\t\t\t\t\t\t\t\t\t<em class=\"fav-i\"></em>\n\t\t\t\t\t\t\t\t\t\t<span class=\"fav-n\">" + el.cfav + "</span> \n\t\t\t\t\t\t\t\t\t</div> \n\t\t\t\t\t\t\t\t</div> \n\t\t\t\t\t\t\t</li>";
				});
				this.recommend_list.append(html);
			}
			// 加载评论

		}, {
			key: "load_comment",
			value: function load_comment(res) {
				var html = "";
				$(res.data.list).each(function (index, el) {
					html += "\t<div class=\"items clear\" data-id=\"1yvlcn6\"> \n\t\t\t            \t\t<div class=\"info\"> \n\t\t\t            \t\t\t<div class=\"info-w\"> \n\t\t\t            \t\t\t\t<!-- \u8BC4\u4EF7\u7528\u6237\u3001\u65F6\u95F4 --> \n\t\t\t            \t\t\t\t<div class=\"info-t clear\">  \n\t\t\t            \t\t\t\t\t<span class=\"name\">" + el.userInfo.uname + "</span>  \n\t\t\t            \t\t\t\t\t<span class=\"date\">" + el.formatDate + "</span> \n\t\t\t            \t\t\t\t</div>  \n\t\t\t            \t\t\t\t<!-- \u8BC4\u4EF7\u5185\u5BB9 --> \n\t\t\t            \t\t\t\t<div class=\"info-m\">" + el.content + "</div>  \n\t\t\t            \t\t\t\t<!-- \u5546\u54C1\u5C5E\u6027 --> \n\t\t\t            \t\t\t\t<div class=\"info-b clear\">   \n\t\t\t            \t\t\t\t\t<span>" + el.stock[0] + "</span>  \n\t\t\t            \t\t\t\t\t<span>" + el.stock[1] + "</span>     \n\t\t\t            \t\t\t\t</div>     \n\t\t\t            \t\t\t</div> \n\t\t\t            \t\t</div> \n\t\t\t            \t\t<div class=\"face\">  \n\t\t\t            \t\t\t<img src=\"" + el.userInfo.avatar + "_64x64.jpg\">  \n\t\t\t            \t\t</div> \n\t\t\t            \t</div> ";
				});
				this.J_RatesBuyerList.append(html);
			}
			// 加载表单

		}, {
			key: "load_table",
			value: function load_table(res) {
				var html = "";
				$(res.data.itemParams.rule.tables[0]).each(function (index, el) {
					html += "<tr>  \n\t\t\t\t\t\t\t<td>" + el[0] + "</td>  \n\t\t\t\t\t\t\t<td>" + el[1] + "</td>  \n\t\t\t\t\t\t\t<td>" + el[2] + "</td>  \n\t\t\t\t\t\t\t<td>" + el[3] + "</td>  \n\t\t\t\t\t\t</tr>   ";
				});
				this.tables.append(html);
			}
			// 加载大小

		}, {
			key: "load_size",
			value: function load_size(res) {
				var html = "";
				$(res.data.itemParams.info.images).each(function (index, el) {
					html += "<div class=\"graphic-pic graphic-pic-hf\"> \n    \t\t\t\t\t\t<div class=\"pic-box\"> \n    \t\t\t\t\t\t\t<img class=\"lazy\" style=\"left: -350px; display: block;\" src=\"" + el + "_750x999.jpg\"> \n    \t\t\t\t\t\t</div> \n    \t\t\t\t\t</div>    ";
				});
				this.graphic_block.append(html);
			}
		}, {
			key: "styleAdd",
			value: function styleAdd(e) {
				// 判定是否再次点击，为true取消
				if ($(e.target).parent().attr('class') != "img") {
					$(e.target).parent().removeClass('c');
					return 0;
				}
				var li = this.j_styleList.find('li');
				// 遍历元素取消class
				for (var i = 0; i < li.length; i++) {
					li.removeClass('c');
				}

				// let $index = $(e.target).parent().index();
				// // 视窗图片改变
				// if ($index == 0) {
				// 	this.J_BigImg.attr('src',"http://s3.mogucdn.com/mlcdn/917393/171027_450718k677087f428h1aif2gbjk72_1600x2250.jpg") ;
				// }else {
				// 	this.J_BigImg.attr("src","http://s3.mogucdn.com/mlcdn/917393/171027_4cc85d7c3kalb5l5fk0gacgk0096d_1600x2250.jpg") ;
				// }
				// 添加class
				$(e.target).parent().addClass('c');
			}
		}, {
			key: "sizeAdd",
			value: function sizeAdd(e) {
				if ($(e.target).attr('class') != "") {
					$(e.target).removeClass('c');
					return 0;
				}
				this.J_SizeList.find("li").each(function (index, el) {
					$(el).removeClass('c');
				});
				$(e.target).addClass('c');
			}
			// 顶部悬浮

		}, {
			key: "scroll",
			value: function scroll() {
				var scrollTop = $(window).scrollTop();
				var offsetTop = $(this.module_tabpanel_col).offset().top;
				if (scrollTop > offsetTop) {
					this.extranav_bd.addClass('ui-fixed');
					this.cart_hd.addClass('ui-fixed');
					this.tabbar_bg.addClass('ui-fixed');
					this.occupying.removeClass('ui-hide');
					this.module_tabpanel.addClass('ui-fixed');
					this.module_shop.addClass('ui-fixed');
				} else if (scrollTop < offsetTop) {
					this.extranav_bd.removeClass('ui-fixed');
					this.cart_hd.removeClass('ui-fixed');
					this.tabbar_bg.removeClass('ui-fixed');
					this.occupying.addClass('ui-hide');
					this.module_tabpanel.removeClass('ui-fixed');
					this.module_shop.removeClass('ui-fixed');
				}
				if (scrollTop >= this.J_Graphic_desc.offset().top - this.pops) {
					this.extranav_bd.find("li").removeClass('selected');
					this.extranav_bd.find("li").eq(0).addClass('selected');
				}
				if (scrollTop >= this.graphic_block_c.offset().top - this.pops) {
					this.extranav_bd.find("li").removeClass('selected');
					this.extranav_bd.find("li").eq(1).addClass('selected');
				}
				if (scrollTop >= this.J_Graphic_尺码说明.offset().top - this.pops) {
					this.extranav_bd.find("li").removeClass('selected');
					this.extranav_bd.find("li").eq(2).addClass('selected');
				}
				if (scrollTop >= this.J_RecommendList.offset().top - this.pops) {
					this.extranav_bd.find("li").removeClass('selected');
					this.extranav_bd.find("li").eq(3).addClass('selected');
				}
			}
		}, {
			key: "stairs",
			value: function stairs(e) {
				var target = this.extranav_bd.find("li");
				var that = this;
				$(this.extranav_bd.find("li")).each(function (index, el) {
					$(el).removeClass("selected");
					el.index = index;
				});
				$(this.extranav_bd.find("a")).each(function (index, el) {
					el.index = index;
				});
				$(target[e.target.index]).addClass('selected');
				if (e.target.index == 0) {
					$("html").animate({
						scrollTop: this.J_Graphic_desc.offset().top - this.pops + 10
					});
				} else if (e.target.index == 1) {
					$("html").animate({
						scrollTop: this.graphic_block_c.offset().top - this.pops + 10
					});
				} else if (e.target.index == 2) {
					$("html").animate({
						scrollTop: this.J_Graphic_尺码说明.offset().top - this.pops + 10
					});
				} else if (e.target.index == 3) {
					$("html").animate({
						scrollTop: this.J_RecommendList.offset().top - this.pops + 10
					});
				}
			}
		}, {
			key: "xuanxian",
			value: function xuanxian(e) {
				$(this.tabbar_list).find("li").each(function (index, el) {
					$(el).removeClass('selected');
					el.index = index;
				});
				var list = $(e.target).parent();
				$(e.target).parent().addClass('selected');
				if (list[0].index == 0) {
					this.J_ModuleRates.hide();
					this.J_ModuleGraphic.show();
					this.J_ModuleRecommend.show();
					this.extranav_bd.show();
					this.liangzhao.show();
				}
				if (list[0].index == 1) {
					this.J_ModuleGraphic.hide();
					this.J_ModuleRates.show();
					this.J_ModuleRecommend.hide();
					this.extranav_bd.hide();
					this.liangzhao.hide();
				}
				if (list[0].index == 2) {
					this.J_ModuleRates.hide();
					this.J_ModuleGraphic.hide();
					this.extranav_bd.hide();
				}
			}
		}, {
			key: "fideIn",
			value: function fideIn(e) {
				if ($(e.target).siblings().attr("class") == "category-subList") {
					$(e.target).siblings().slideUp();
					$(e.target).siblings().addClass("ui-hide");
					return 0;
				}
				$(e.target).siblings().slideDown();
				$(e.target).siblings().removeClass("ui-hide");
			}
		}, {
			key: "cookie",
			value: function cookie() {
				var that = this;
				var timer = setInterval(function () {
					if (that.page >= 7) {
						clearInterval(timer);
					}
					that.page++;
					that.ajaxs();
				}, 30);
				this.ajaxJrxp();
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
						page: that.page
					}
				})
				// 数据请求成功
				.done(function (res) {
					$.proxy(that.ajaxRes(res), that);
				});
			}
		}, {
			key: "ajaxJrxp",
			value: function ajaxJrxp() {
				var that = this;
				$.ajax({
					url: 'http://simba-api.meilishuo.com/mlselection/top/v1/topGoodsList/h5',
					dataType: 'jsonp',
					data: {
						"type": "mrsx",
						"cid": "mrsx",
						"ffset": 0,
						"limit": 20
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
				var that = this;
				$(res.data.list).each(function (index, el) {
					if ($.cookie("list") == el.item_id) {
						$(that.J_BigImg).attr("src", el.image);
						$(that.J_BigImg_max).attr("src", el.image);
						$(that.maoni).html(el.title);
						$(that.sales).html(el.itemLikes);
						$(that.J_BuyCart).attr("data-id", el.item_id);
						$(that.J_NowPrice).attr("data-price", el.discountPrice);
						$(that.J_NowPrice).html("¥" + el.discountPrice);
					}
				});
				$(res.data.rows).each(function (index, el) {
					if ($.cookie("list") == el.signGoodsId) {
						$(that.J_BigImg).attr("src", el.image);
						$(that.J_BigImg_max).attr("src", el.image);
						$(that.maoni).html(el.title);
						$(that.sales).html(el.itemLikes);
						$(that.J_NowPrice).html("¥" + el.discountPrice);
						$(that.J_BuyCart).attr("data-id", el.signGoodsId);
						$(that.J_NowPrice).attr("data-price", el.discountPrice);
					}
				});
			}
		}]);

		return List;
	}();

	return new List();
});