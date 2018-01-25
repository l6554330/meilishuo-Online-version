/*
* @Author: 周海明
* @Date:   2018-01-19 10:03:57
* @Last Modified by:   周海明
* @Last Modified time: 2018-01-22 21:13:07
*/
define(["jquery"],function ($) {
	class Hotword{
		constructor(){
		}
		// 初始化
		init(){
			this.ajax();
		}
		// AJAX获取
		ajax(){
			var that = this;
			$.ajax({
				url: 'http://mce.mogucdn.com/jsonp/multiget/3?pids=5604,5571',
				dataType: 'jsonp'
			})
			.done(function(res) {
				$.proxy(that.load(res),that);
			})
			
		}
		// 商品加载
		load(res){  
			var html = "";
			$(res.data[5571].list).each(function(index, el) { 
				html += `<a style = 'color:${el.color}' href="">${el.word}</a>`;
			});
			$(".hotword").append(html);  
		}
	}
	return new Hotword();
})