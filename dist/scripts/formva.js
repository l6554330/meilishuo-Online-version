"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
* @Author: 周海明
* @Date:   2018-01-19 20:50:59
* @Last Modified by:   周海明
* @Last Modified time: 2018-01-25 13:45:59
*/
define(["jquery", "cookie"], function ($) {
	var Formva = function () {
		function Formva() {
			_classCallCheck(this, Formva);
		}
		// 初始化


		_createClass(Formva, [{
			key: "init",
			value: function init() {
				this.tip = $(".error_tip");
				this.uip = $('#ui_input');
				this.list = $(".list_mod");
				this.mb = $(".mobile");
				// console.log(this.tip)
				this.psw = $("#psw");
				this.poww = $("#poww");
				this.sub_mit = $("#sub_mit");
				this.submit_dl = $("#submit_dl");
				this.check_ed = $(".check_ed");

				this.psw.on("blur", $.proxy(this.pass, this));
				this.poww.on("blur", $.proxy(this.pass, this));
				this.mb.on("blur", $.proxy(this.mobile, this));
				this.list.on("click", $.proxy(this.active, this));
				this.sub_mit.on("click", $.proxy(this.verify, this));
				this.submit_dl.on("click", $.proxy(this.verify_dl, this));
			}
			// 表单验证
			// 手机号验证

		}, {
			key: "mobile",
			value: function mobile() {
				var val = this.mb.val();
				var reg = /^[a-z]+[1-9]+$/i;
				if (val.match(reg) && val != "") {
					$(this.tip).hide();
				} else {
					console.log(1);
					this.tip.html("请输入正确的账号，账号为字母开头的纯数字");
					$(this.tip).show();
				}
			}
			// 密码验证

		}, {
			key: "pass",
			value: function pass(e) {
				var str = $(e.target).val();
				var reg = /^[^/\\\*\<>\|\?]{6,20}$/;
				var count = 0;
				// console.log(reg.test(str))
				// 判断是否符合正则规则
				if (reg.test(str)) {
					if (/\d/g.test(str)) {
						count++;
					}
					if (/[a-z]/gi.test(str)) {
						count++;
					}
					if (/[!@#\$%\^&\*\(\)]/gi.test(str)) {
						count++;
					}
					// console.log(count)
					switch (count) {
						case 1:
							this.tip.html("密码太弱");
							break;
						case 2:
							this.tip.html("密码中等");
							break;
						case 3:
							this.tip.html("密码保密性高");
							break;
					}
				} else {
					this.tip.html("请输入正确的密码，不包含特殊字符!@#$%^&*");
					$(this.tip).show();
				}
			}
			// 样式调整

		}, {
			key: "active",
			value: function active(e) {
				for (var i = 0; i < this.list.length; i++) {
					this.list[i].index = i;
					$(this.list[i]).removeClass('tab_on');
					$($(".mod_box")[i]).hide();
				}
				$(this.list[e.target.index]).addClass('tab_on');
				$($(".mod_box")[e.target.index]).show();
			}
		}, {
			key: "verify",
			value: function verify() {
				if ($(this.check_ed).prop("checked") != true && this.poww != "" && this.mb != "") {
					this.tip.html("请勾选美丽说注册条款");
					$(this.tip).show();
				} else {
					$(this.tip).hide();
					if ($.cookie("word")) {
						console.log($.cookie("word"));
						var oCookie = JSON.parse($.cookie("word"));
						var that = this;
						$(oCookie).each(function (index, el) {
							console.log(el);
							if (el.name == that.mb.val()) {
								el.paseword = that.poww.val();
							} else {
								var arr = {
									"name": that.mb.val(),
									"paseword": that.poww.val()
								};
								oCookie.push(arr);
							}
						});
						var aCookie = JSON.stringify(oCookie);
						$.cookie("word", aCookie, {
							"path": "/",
							"expires": new Date("2019-8-8")
						});
						location.href = "register.html";
					} else {
						$.cookie("word", "[{\n\t\t\t\t\t\t\"name\":\"" + this.mb.val() + "\",\n\t\t\t\t\t\t\"paseword\":\"" + this.poww.val() + "\"\n\t\t\t\t\t}]", {
							"path": "/",
							"expires": new Date("2019-8-8")
						});
					}
				}
			}
		}, {
			key: "verify_dl",
			value: function verify_dl() {
				if (!$.cookie("word")) {
					this.tip.html("请先注册账号");
					$(this.tip).show();
					return 0;
				} else {
					$(this.tip).hide();
				}
				console.log($.cookie("word"));
				var oCookie = JSON.parse($.cookie("word"));
				var that = this;
				$(oCookie).each(function (index, el) {
					if (that.uip.val() == el.name) {
						if (that.psw.val() == el.paseword) {
							location.href = "index.html";
						} else {
							that.tip.html("密码不正确");
							$(that.tip).show();
						}
					} else {
						that.tip.html("账号不正确");
						$(that.tip).show();
					}
				});
			}
		}]);

		return Formva;
	}();

	return new Formva();
});