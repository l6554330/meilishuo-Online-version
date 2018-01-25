/*
* @Author: 周海明
* @Date:   2018-01-23 12:26:08
* @Last Modified by:   周海明
* @Last Modified time: 2018-01-25 15:04:21
*/
require(["scripts/config.js"],function ($) {
	// console.log(1)
	require(["jquery","list","ajaxmh","shoppingCar","script","magnifying","particulars"],function($,list,ajaxmh,shoppingCar,script,magnifying,particulars) {
		list.init();
		// 模糊搜索
		ajaxmh.init();
		// 加入购物车
		shoppingCar.init();                                             
	})
})