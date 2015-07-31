var component = require('../../lib/js/component');


/**
 * RelatedProductsCarousel component definition.
 */
function RelatedProductsCarousel() {


  /**
   * Initialize a RelatedProductsCarousel instance.
   * @param {HTMLElement} element The root HTML element of the component.
   * @param {Object} options Optional component configuration.
   */
  this.initialize = function(element, options) {
    
    // Only use drag on touch devices
  	var hasTouch = Modernizr.touch;

    this.carousel = this.$element.owlCarousel({
      items: 1,
      loop: hasTouch,
      mouseDrag: hasTouch,
      pullDrag: hasTouch,
      responsive:{
        768: {
          items: 2
        },
        1260: {
          items: 3,
          dots: false
        }
      }    
    }).data('owlCarousel');  

  };
}

module.exports = component(RelatedProductsCarousel);






