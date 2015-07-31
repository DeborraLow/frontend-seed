var utils = require('../../lib/js/utils.js');

module.exports = function() {
  //initialize all reversed color boxes.
  $.each( $(".product-tile"), function(index, item) {
    if($(this).hasClass("reverse-colors")) $(this).addClass("force-white-text");
  });

  $.each( $(".product-info").find(".price"), function(index, item) {
    var price = $(item).html();
    $(this).html( utils.formatPrice(price) );
  });

  var tap = ("ontouchstart" in document.documentElement);

  // rollover fn for all tiles
	$(".product-tile").on("mouseenter", function(event) {
    if(!tap) {
      var ct = $(event.currentTarget);
      if(ct.hasClass("reverse-colors")) {
  		  ct.removeClass("force-white-text").addClass("force-dark-text");
  		}
      ct.find(".product-description").show();
      if ($("#products-grid").attr("data-category") != "all") { //only show compare IF a category has been chosen.
  		  ct.find(".compare-checkbox-group").show();
      }
      if ($(".product-tile.included").length < 2) $(".product-tile").find(".compare").hide();
  		ct.find(".color-swatches").show();
  		ct.addClass("touched");
    }
	});

//show product description by default on touch devices
$(".touch .product-description").show();
  //rollout fn for all tiles
 	$(".product-tile").on("mouseleave", function(event) {
    if(!tap) {
      var ct = $(event.currentTarget);
      if(ct.hasClass("reverse-colors")) {
   		 ct.removeClass("force-dark-text").addClass("force-white-text");
      }
      ct.find(".product-description").hide();
      if(ct.find("input:checked").length == 1) { //if the input box is checked, let it stay visible
        ct.find(".compare-checkbox-group").show();
      }else{
  		  ct.find(".compare-checkbox-group").hide();
      }
  		ct.find(".color-swatches").hide();
      ct.removeClass("touched");
    }
	});

};
