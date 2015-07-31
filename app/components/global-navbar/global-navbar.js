require('../../vendor/bower_components/gsap/src/uncompressed/TweenLite');
require('../../vendor/bower_components/gsap/src/uncompressed/plugins/CSSPlugin');

module.exports = function() {
  $(function(){
		var navigationUtil = navigationUtil || {},
        $globalNav = $('#global-navbar'),
	  		$navIcon = $("#nav-icon"),
	  		$subnav = $("#subnav"),
	  		$links = $subnav.find(".links"),
	  		lastScroll = 0,
	  		currentScroll = 0;

		navigationUtil = {
	    init: function () {
	      var _self = this;
	      $(window).scroll(function () {
	        _self.handleScroll();
	      });
	      _self.handleScroll();
	    },
	    handleScroll: function() {
	     	currentScroll = $(window).scrollTop();
        if($subnav.hasClass('hide-sub-nav')) {
          TweenLite.to($navIcon, .2, {top:"35px", alpha: "1", ease:Power3.easeOut});
          $subnav.addClass("collapsed");
        }
        // Only open subnav with a click not on scroll
        else if ($subnav.hasClass('open-on-click')) {
          TweenLite.to($navIcon, .2, {top:"35px", alpha: "1", ease:Power3.easeOut});
          $subnav.addClass("collapsed").removeClass("initial-transparency");
          TweenLite.to($subnav, .33, {top:"70px", ease:Power1.easeOut});
        }
        // Never run again on the homepage after load
        else if (!$subnav.hasClass('home-nav')) {
  	     	if(currentScroll == 0) $subnav.addClass("initial-transparency");
  	      if(currentScroll-lastScroll > 0) {
  	      	$subnav.addClass("collapsed").removeClass("initial-transparency");
  	      	TweenLite.to($subnav, .33, {top:"70px", ease:Power1.easeOut});
  	      	TweenLite.to($navIcon, .2, {top:"35px", alpha: "1", ease:Power3.easeOut});
  	      }else{
  	      	TweenLite.to($subnav, .33, {top:"105px", ease:Power1.easeOut});
  	      	TweenLite.to($navIcon, .2, {top:"-35px", alpha: ".5", ease:Power3.easeOut});
  	      }
  	      lastScroll=currentScroll;
        }
	    }
		};
		navigationUtil.init();

		//this adds the hidden class IF the nav bar should be hidden on load.
		//we are defaulting to FRB everytime so its always visible to start.
		$navIcon.on("click", function(event) {
			if($subnav.hasClass("collapsed")) {
			  $subnav.removeClass("collapsed");
			  TweenLite.to($subnav, .33, {top:"105px", ease:Power1.easeOut});
		 	}else{
		  	$subnav.addClass("collapsed");
		  	TweenLite.to($subnav, .33, {top:"70px", ease:Power1.easeOut});
		  }

      // Only on sub nav sticky elements
      if($subnav.hasClass('hide-sub-nav')) {
        recalculateFixedElements();
      }
 		});

    // If there is another sticky sub nav recalculate it's position
    function recalculateFixedElements() {
      var $stickeySubNav = $('.sticky-sub-nav');

      if($stickeySubNav.hasClass('lock-sub-nav')) {
        if($subnav.hasClass("collapsed")) {
          $stickeySubNav.animate({
            top: $globalNav.outerHeight()
          }, 50);
        }
        else {
          $stickeySubNav.animate({
            top: $globalNav.outerHeight() + $subnav.outerHeight()
          }, 400);
        }
      }
    }
	});
};
