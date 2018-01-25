/*
* @Author: 周海明
* @Date:   2018-01-16 22:03:33
* @Last Modified by:   周海明
* @Last Modified time: 2018-01-24 20:41:19
*/
//callback=jQuery112408703731435959745_1516246745898&type=mrsx&cid=mrsx&offset=0&limit=20&_=1516246745899
define(["jquery"],function ($) {
	$(".banner_box").on("mouseover",(function(event) {
		$(".b_btn a").css({
			display:"inline"
		})
		// .end()
		.stop()
		.animate({
			opacity:.3
		},300 )
	}));
	$(".banner_box").on("mouseout",(function(event) {
		$(".b_btn a").css({
			display:"none"
		})
		.stop()
		.animate({
			opacity:0
		},300)
	}));
	var tops =  $(window).height() ;
		// console.log(tops)
	$(".act_left_box").css({
		top:parseInt(tops * 0.7)
	})
	$(".left_ad_close").on("click",function () {
		$(".global-act-left").hide();
	})
	$(".drop:first").on("mouseover",function () {
		$(".down:first").show();
	})
	$(".drop:first").on("mouseout",function () {
		$(".down:first").hide();
	})
	$(".drop:last").on("mouseover",function () {
		$(".down:last").show();
	})
	$(".drop:last").on("mouseout",function () {
		$(".down:last").hide();
	})
	$(".drop:eq(1)").on("mouseover",function () {
		$(".down:eq(1)").show();
	})
	$(".drop:eq(1)").on("mouseout",function () {
		$(".down:eq(1)").hide();
	})
	var offsetTop;
	try {
		// statements
		offsetTop = $("#global-sec-nav").offset().top
	} catch(e) {
		// statements
		// console.log(e);
	}
	$(window).on("scroll",function () {
		var scrollTop = $(window).scrollTop();
		if (scrollTop > offsetTop) {
			$("#global-sec-nav").addClass('fixed')
		}else if (scrollTop < offsetTop) {
			// console.log(1)
			$("#global-sec-nav").removeClass('fixed')
		}
		if (scrollTop > 0) {
			$(".biu-go2top").show();
		}else {
			$(".biu-go2top").hide();
		}
	})
	var scrolldelay = null;
	$(".biu-go2top").on("click",function () {
		// console.log(1)
		// $("body").animate({
		// 	scrollTop:0
		// },300)
		// $.animate(,300);
		// scrolldelay=setInterval(pageScroll,30);
		$("html").animate({
			"scrollTop":0
		},500)
	})
	// function pageScroll() {
	// 	window.scrollBy(0,-400);
	// 	// console.log($(window).scrollTop())
	// 	if (($(window).scrollTop()) == 0) {
	// 		clearInterval(scrolldelay)
	// 	}
	// }
})