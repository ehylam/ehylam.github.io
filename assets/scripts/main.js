// @codekit-prepend "src/jquery-3.4.1.min.js" , "src/three.min.js","src/TimelineMax.min.js","src/aos.js", "src/TweenMax.min.js","src/ScrollMagic.min.js","src/animation.gsap.js";
$(document).ready(function() {
	AOS.init();

	$(function() {
		$('.meme-container')
			.mousemove(function(e) {
				$('.doge').show().css({
					left: e.clientX,
					top: e.clientY
				});
			})
			.mouseout(function() {
				$('.doge').hide();
			});
	});
});
