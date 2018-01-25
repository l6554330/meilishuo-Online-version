"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
* @Author: 周海明
* @Date:   2018-01-20 11:13:23
* @Last Modified by:   周海明
* @Last Modified time: 2018-01-23 10:34:40
*/
define(["jquery"], function ($) {
	var Ajaxmh = function () {
		function Ajaxmh() {
			_classCallCheck(this, Ajaxmh);
		}
		// 初始化


		_createClass(Ajaxmh, [{
			key: "init",
			value: function init() {
				// 获取元素
				this.seach = $("#search_txt");
				this.suggest = $(".suggest-box");
				this.seach.on("input", $.proxy(this.mh, this));
			}
			// ajax获取

		}, {
			key: "ajax",
			value: function ajax() {
				var val = this.seach.val();
				var that = this;
				$.ajax({
					url: 'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=' + val + '&cb=callback',
					type: "GET",
					dataType: "jsonp",
					jsonpCallback: "callback",
					data: {
						wd: val

					},
					// 成功时返回
					success: function success(res) {
						that.content(res);
					}
				});
			}
			// 事件触发

		}, {
			key: "mh",
			value: function mh() {
				this.ajax();
			}
			// 加载数据

		}, {
			key: "content",
			value: function content(res) {
				this.suggest.show();
				this.suggest.html("");
				var html = "";
				$(res.s).each(function (index, el) {
					html += "<div>" + el + "</div>";
				});
				this.suggest.append(html);
			}
		}]);

		return Ajaxmh;
	}();

	return new Ajaxmh();
});