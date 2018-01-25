/*
* @Author: 周海明
* @Date:   2018-01-20 11:13:23
* @Last Modified by:   周海明
* @Last Modified time: 2018-01-23 10:34:40
*/
define(["jquery"],function ($) {
	 class Ajaxmh{
	 	constructor(){

	 	}
	 	// 初始化
	 	init(){
	 		// 获取元素
	 		this.seach = $("#search_txt");
	 		this.suggest = $(".suggest-box");
	 		this.seach.on("input",$.proxy(this.mh,this))
	 	}
	 	// ajax获取
	 	ajax(){
	 		let val = this.seach.val();
	 		let that = this;
	 		$.ajax({
	 			url: 'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd='+val+'&cb=callback',
	 			type:"GET", 
	 			dataType:"jsonp",
	 			jsonpCallback:"callback",
	 			data:{
	 				wd:val,  
	 				
	 			},
	 			// 成功时返回
	 			success:function (res) {
 					that.content(res)
 				}
	 		})

	 		
	 	}
	 	// 事件触发
	 	mh(){
	 		this.ajax()
	 	}
	 	// 加载数据
	 	content(res){
	 		this.suggest.show()
	 		this.suggest.html("");
			var html = "";
	 		$(res.s).each(function(index, el) {
	 			html += `<div>${el}</div>`;
	 		});
	 		this.suggest.append(html)
	 	}
	 }
	 return new Ajaxmh()
})