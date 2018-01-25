
require(["scripts/config.js"],function ($) {
	// console.log(1)
	require(["jquery","shoppingCar","cookie","script","particulars"],function($,shoppingCar,cookie,script,particulars) {
		shoppingCar.init();
	})
})
