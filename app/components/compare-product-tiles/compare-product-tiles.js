var utils = require('../../lib/js/utils.js');

module.exports = function() {

  $(function(){

    //Locate the remove "X" for product tile
    var $removeTile = $('.compare-product-remove');
    var $compareProductTiles = $('#compare-product-tiles');
    var $compareFeatureGrid = $('.compare-feature-grid');
    var $shortHeader = $('.short-header');
    var $subNav = $('#subnav');
    var $navIcon = $("#nav-icon");
    var $compareTilesParent = $compareProductTiles.parent();

    function checkCollapse(){
      var $featuresIsExpanded = $('#toggleFeatures').attr("aria-expanded") === 'true';
      var $specsIsExpanded = $('#toggleSpecs').attr("aria-expanded") === 'true'; 
        return !$featuresIsExpanded && !$specsIsExpanded;
    }

    //Listen for scroll events on #compare-product-tiles
    var waypoint = $compareProductTiles.waypoint({
      handler: function(direction) {

        if(checkCollapse()){
            unLockCompareProducts();
        }else{
          if( direction === "down"){
            lockCompareProducts();
          } else {
            unLockCompareProducts();
          }
        }

      },
      offset: $('#global-navbar').outerHeight()
    });

    var locked = false;

    //Add a fixed position to #compare-product-tiles
    function lockCompareProducts() {
      if(!locked) $shim = $compareProductTiles.clone().attr("id","compare-product-tiles-shim").addClass("shim").prependTo($compareTilesParent);
      $compareProductTiles.addClass("lock-sub-nav");
      $compareProductTiles.css('top', $('#global-navbar').outerHeight());
      locked = true;
    }

    //Remove fixed position to #compare-product-tiles
    function unLockCompareProducts() {
      $("#compare-product-tiles-shim").remove();
      $compareProductTiles.removeClass("lock-sub-nav");
      $compareProductTiles.css('top', 'auto');
      locked = false;
    }

    //Bind Click handler to the remove "X"
    $removeTile.click(function(e) {
      removeProductColumn($(e.target));
    });

    //set defaults for toggling arrows
    $('.grid-header-title').find(".triangle-up").addClass("hide");

    //Bind click handler for toggling arrow icon on grid headers
    $('.grid-header-title').click(function(e) {
      //Use the jQuery object of the target clicked
      toggleHeaderArrow($(e.target));
    });

    //Slightly hacky solution for the time-being
    //Want to discuss actual product-ids when products are passed from homepage
    function removeProductColumn($column) {
      //Ensure we are leaving at least 2 products
      if (countComparedProducts() > 2) {
        //Determine the column to remove
        var $selectedColumn = $(".product-column-" + $column.attr("data-product-column"));
        //Remove said column - opted for remove vs hide so that counting works
        $selectedColumn.remove();
        //Disgusting markup dependent solution to find actual product container
        $column.parent().parent().remove();
        //remove the X button
        if(countComparedProducts() <= 2){
          $('.compare-product-remove').toggleClass('hide');
        }

      } else {
        //Cannot compare less than two items/products
      }
    }

    //Counts the number of product tiles remaining in the compare row
    function countComparedProducts() {
      //Count 'em
      return $(".compare-product-tile").length;
    }

    //Function to toggle the header arrow up/down class
    function toggleHeaderArrow ($target) {
      //Determine if we're clicking on the title or the arrow
      //if arrow:
      if ($target.hasClass('triangle-up')) {
        $target.toggleClass('hide');
        $target.parent().find('.triangle-down').toggleClass('hide');

      } else if ($target.hasClass('triangle-down')) {
        $target.toggleClass('hide');
        $target.parent().find('.triangle-up').toggleClass('hide');

      } else {
        $target.find('.triangle-up').toggleClass('hide');
        $target.find('.triangle-down').toggleClass('hide');
      }
    }

    var calculateLockCompareProductsPosition = utils.debounce(function() {
        // Calculate global nav height to determine
        if($compareProductTiles.hasClass("lock-compare-products")) {
          $compareProductTiles.css('top', $('#global-navbar').outerHeight());
        }
    }, 250);

    $(window).resize(calculateLockCompareProductsPosition);

  });
};
