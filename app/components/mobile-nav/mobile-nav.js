module.exports = function() {  
  $(function(){ 
	  var $body = $("body"),
	  		$navIconMobile = $("#nav-icon-mobile"),
	  		$mobileNavMenu = $("#mobile-nav-menu"),
	  		$mobileNav = $("#mobile-nav"),
	  		$mobileLogo = $("#mobile-logo");

 		$navIconMobile.on("click", function(event) {
			if($mobileNavMenu.hasClass("hidden")) {
				$body.addClass("no-scroll");
				$mobileNav.css("height","100%");
			  $mobileNavMenu.removeClass("hidden");
		 	}else{
				$mobileNav.css("height","10%");
		 		$body.removeClass("no-scroll");
		  	$mobileNavMenu.addClass("hidden");
		  }
 		}); 
	});
};
