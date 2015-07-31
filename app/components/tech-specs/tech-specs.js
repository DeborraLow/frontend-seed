var component = require('../../lib/js/component');

function TechSpecs() {

  var OPEN_EVENT = 'tech-specs-should-open';
  var OPEN_CLASS = 'open';

  this.initialize = function() {
    
    this.$body = this.find('.tech-specs-body');

    this.on('click', '.tech-specs-header', this.toggle);

    this.listen(OPEN_EVENT, this.open);

    this.initialized();
  };
  
  this.initialized = function() {
    this.$element.addClass('initialized');
    this.$body.addClass('collapse');
  };

  this.open = function() {
    this.$element.addClass(OPEN_CLASS);
    this.$body.collapse('show');
  };
  
  this.close = function() {
    this.$element.removeClass(OPEN_CLASS);
    this.$body.collapse('hide');
  };
  
  this.toggle = function() {
    if (this.$element.hasClass(OPEN_CLASS)) {
      this.close();
    } else {
      this.open();
    }
  };
}

module.exports = component(TechSpecs);

