var slider = require('../homepage-slider/homepage-slider.js');

module.exports =  (function() {

  function init ($el) {
    if($el.length) {
     	slider.init($("body.home")); //initialize home page slider
    }
 	}

  return {
    init: init
  }
}());
