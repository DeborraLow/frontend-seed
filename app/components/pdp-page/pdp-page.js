var component = require('../../lib/js/component');
var TechSpecs = require('../tech-specs/tech-specs.js');
var RelatedProductsCarousel = require('../related-products-carousel/related-products-carousel.js');
var ProductFeatures = require('../product-features/product-features.js');

/**
 * PDP page component.
 */
function PDPPage() {
  
  /**
   * Initialize the component.
   *   * Initialize RelatedProductsCarousel component. 
   */
  this.initialize = function() {    
    this.find('.tech-specs').attach(TechSpecs);
    this.find('.related-products-carousel').attach(RelatedProductsCarousel);
    this.find('.product-features').attach(ProductFeatures);
  };
}

module.exports = component(PDPPage);
