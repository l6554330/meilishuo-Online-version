"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

define(["jquery"], function ($) {
	var Magnifying = function () {
		function Magnifying() {
			_classCallCheck(this, Magnifying);

			this.init();
		}

		_createClass(Magnifying, [{
			key: "init",
			value: function init() {
				this.J_BigImg_max = $("#J_BigImg_max");
				this.shade = $(".shade");
				this.smll_magnifying = $("#smll_magnifying");
				this.magnifying_img = $("#magnifying_img");
				// this.J_BigImg_max.css({
				// 	width: $(J_BigImg_max).width() * 2,
				// 	height: $(J_BigImg_max).height() * 2
				// })
				this.shade.on("mousemove", $.proxy(this.max, this));
				this.shade.on("mouseout", $.proxy(this.hide, this));
			}
			// 鼠标移入

		}, {
			key: "max",
			value: function max(e) {
				this.smll_magnifying.show();
				this.magnifying_img.show();
				var left = e.pageX - $(e.target).offset().left - this.smll_magnifying.width() / 2;
				var sTop = e.pageY - $(e.target).offset().top - this.smll_magnifying.height() / 2;
				var maxLeft = $(e.target).width() - this.smll_magnifying.width() - 3;
				var maxTop = $(e.target).height() - this.smll_magnifying.height() - 3;
				// 边界检测 start
				left = left < 0 ? 2 : left;
				sTop = sTop < 0 ? 2 : sTop;
				left = left > maxLeft ? maxLeft : left;
				sTop = sTop > maxTop ? maxTop : sTop;
				// 边界检测 end
				this.smll_magnifying.css({
					left: left,
					top: sTop
				});

				var popLeft = Math.round(left / maxLeft * 100) / 100;
				var popTop = Math.round(sTop / maxTop * 100) / 100;
				var maxBigLeft = $(smll_magnifying).width() - $(J_BigImg_max).width() - $(J_BigImg_max).width() / 2;
				var maxBigTop = $(smll_magnifying).height() - $(J_BigImg_max).height() - 280;
				this.J_BigImg_max.css({
					left: maxBigLeft * popLeft + $(J_BigImg_max).width() / 2,
					top: maxBigTop * popTop + 280
				});
			}
			// 移出隐藏

		}, {
			key: "hide",
			value: function hide() {
				this.smll_magnifying.hide();
				this.magnifying_img.hide();
			}
		}]);

		return Magnifying;
	}();

	new Magnifying();
});