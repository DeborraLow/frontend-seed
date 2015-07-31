var component = require('../../lib/js/component');

function ProductFeatures() {

  this.initialize = function() {
    // Store the list of items
    this.$items = this.find('.features-list-item');
  
    this.on('click', '.feature-title', this.toggle);

    this.initialized();
 	
  };
  
  this.initialized = function() {
    this.$element.addClass('initialized');

    // Open the first item
    this.$items.eq(0).addClass('active open');
  };

  this.toggle = function (event) {
  	
  	// Store title element
    var $title = $(event.target);

    if (!$title) {
      return;
    }

    // Find nearest item from click.
    var $item = $title.closest('.features-list-item');

    // Toggle open class for "zippy" behavior at smaller breakpoint.
    $item.toggleClass('open');

    // Ignore if currently active.
    if ($item.is('.active')) {
      return;
    }

    // Remove the last-active classes
    this.$items.removeClass('last-active');

    // Hide other active items.
    this.$items.each(function(index, element) {
      var $el = $(element);
      if($el.hasClass('active')) {
        $el.removeClass('active').addClass('last-active');
      }
    });
   
    // Make item active.
    $item.addClass('active');

  };


}

module.exports = component(ProductFeatures);