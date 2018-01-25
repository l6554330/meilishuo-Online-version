"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

define(["jquery"], function ($) {
	var Mljx = function () {
		function Mljx() {
			_classCallCheck(this, Mljx);
		}
		// c初始化


		_createClass(Mljx, [{
			key: "init",
			value: function init() {
				this.html = "";
				this.ajax();
			}
			// 加载数据

		}, {
			key: "ajax",
			value: function ajax() {
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
				// 加载成功
				.done(function (res) {
					$.proxy(that.load_img(res), that);
				});
			}
			// 添加到页面

		}, {
			key: "load_img",
			value: function load_img(res) {
				var that = this;
				$(res.data.rows).each(function (index, el) {
					that.html += "<div class=\"item\">\n\t\t\t\t\t\t\t<a href=\"javascript:;\" class=\"pic_box\" data-id=\"" + el.signGoodsId + "\" style = 'background-image:url(" + el.image + ");\n\t    background-size: cover'>\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t<div class=\"info\">\n\t\t\t\t\t\t\t\t<div class=\"part\">\n\t\t\t\t\t\t\t\t\t<div class=\"price\">\n\t\t\t\t\t\t\t\t\t\t" + el.discountPrice + "\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t<div class=\"collect\">\n\t\t\t\t\t\t\t\t\t\t<i class=\"icon_star\"></i>\n\t\t\t\t\t\t\t\t\t\t" + el.collectNum + "\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<p class=\"title\">\n\t\t\t\t\t\t\t\t\t<i class=\"icon_select\"></i>\n\t\t\t\t\t\t\t\t\t" + el.title + "\n\t\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>";
				});
				$(".content").append(this.html);
				// 样式调整
				$(".item").each(function (index, el) {
					if ((index + 1) % 5 == 0) {
						$($(".content .item")[index]).addClass('is-side');
					}
				});
			}
		}]);

		return Mljx;
	}();

	return new Mljx();
});