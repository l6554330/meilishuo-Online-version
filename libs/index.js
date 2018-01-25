/*
* @Author: 周海明
* @Date:   2018-01-11 11:24:32
* @Last Modified by:   周海明
* @Last Modified time: 2018-01-24 21:24:28
*/
require(["scripts/config.js"],function ($) {
	// console.log(1)
	require(["jquery","script","ajaxmrjx","Carousel","ajaxmlyx","ajaxhotword","ajaxmh","particulars","cookie","shoppingCar"],function($,script,ajaxmrjx,Carousel,ajaxmlyx,ajaxhotword,ajaxmh,particulars,cookie,shoppingCar) {
		// 搜索框下面的nav
		ajaxhotword.init();
		// 模糊搜索
		ajaxmh.init();
		// 瀑布流加载
 		ajaxmlyx.ajaxs();
		// 加载优选
		ajaxmrjx.init();
		// 轮播图
		Carousel.init();
		// 加入购物车
		shoppingCar.init()
	})
})