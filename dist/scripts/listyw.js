
require(["scripts/config.js"],function ($) {
	// console.log(1)
	require(["jquery","listPage","ajaxmh","particulars","cookie","script"],function($,list,ajaxmh,particulars,cookie,script) {
		list.init();
		// 模糊搜索
		ajaxmh.init();
	})
})