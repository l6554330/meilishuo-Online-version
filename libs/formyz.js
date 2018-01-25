/*
* @Author: 周海明
* @Date:   2018-01-23 12:28:53
* @Last Modified by:   周海明
* @Last Modified time: 2018-01-23 12:29:28
*/
require(["scripts/config.js"],function ($) {
	// console.log(1)
	require(["jquery","formva"],function($,formva) {
		// 表单验证
		formva.init();
	})
})