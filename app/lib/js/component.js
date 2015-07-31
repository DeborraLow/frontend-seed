var slice = Array.prototype.slice;


/**
 * Component factory builder.
 * @param {Function} definition Function that builds/modifies the component
 *   prototype.
 * @return {Function} Factory function that instantiates the component using the
 *   specified element and optional configuration.
 */
function component(definition) {


  /**
   * Component constructor. Set up bindings and initialize the component.
   * @param {HTMLElement} element The root HTML element of the component.
   * @param {Object} options Optional component configuration.
   */
  function Component(element, options) {

    // Set component element.
    this.element = element;
    this.$element = $(element);

    // Set options.
    this.options = options;
    
    // Set root element (used for pubsub events).
    this.$root = $(element.ownerDocument.documentElement);
    
    // Initialize component.
    this.initialize(element, options);
  }

  Component.prototype = {


    /**
     * Empty abstract function.
     */
    initialize: function() {},
    

    /**
     * A smarter alternative to just using jQuery. Finds elements by selector
     * within the confines of the component element.
     * @param {String|HTMLElement|jQuery} selector Any acceptable argument for
     *   initializing a jQuery collection, preferably a String.
     * @return {jQuery} [description]
     */
    find: function(selector) {
      return this.$element.find(selector);
    },

    
    /**
     * Trigger a component event. Similar to Flight.js, the component uses the
     * element and native DOM events for communication.
     * @see http://api.jquery.com/category/events/ jQuery's documentation for 
     *   details on trigger's polymorphic signature.
     * @return {Component} The component instance.
     */
    trigger: function() {
      this.$element.trigger.apply(this.$element, arguments);
      return this;
    },


    /**
     * Listen to an ancestor event. 
     * @see http://api.jquery.com/category/events/ jQuery's documentation for 
     *   details on listen's polymorphic signature.
     * @return {Component} The component instance.
     */
    listen: function() {      
      this.$root.on.apply(this.$root, prepareEvent(this, arguments, findClosest));
      return this;
    }
  };
  
  // Map jQuery event listener methods to component prototype for convenience
  // and safety.
  $.each(['on', 'one', 'off'], function(i, name) {


    /**
     * Bind/unbind an event listener.
     * @see http://api.jquery.com/category/events/ jQuery's documentation for 
     *   details on listen's polymorphic signature.
     * @return {Component} The component instance.
     */
    Component.prototype[name] = function() {
      this.$element[name].apply(this.$element, prepareEvent(this, arguments));
      return this;
    }
  });

  
  /**
   * Bind all found callbacks in jQuery's polymorphic event signature.
   * @param {Component} context Component instance to be used as context for 
   *   callbacks.
   * @param {Arguments} args Original arguments passed to the event method.
   * @param {Function} wrap Wrapper function used only to test ancestry for 
   *   listen method.
   * @return {Arguments} Modified arguments object.
   */
  function prepareEvent(context, args, wrap) {

    var event = args[0];
    var bound;
    var callbackIndex;
    var callback;
    
    // If first argument (event) is an object, it is a hash of event listeners 
    // mapped to event keys.
    if ($.isPlainObject(event)) {
      
      bound = {};
      
      // Bind each of the callbacks to the component.
      $.each(event, (function(name, callback) {
        if ($.isFunction(callback)) {

          // Bind the callback to the component using $.proxy for tracking 
          // rather than bind to allow for use with the Component.off() 
          // method.
          bound[name] = $.proxy(wrap ? wrap(callback) : callback, context);
        }
      }).bind(context));
      
      args[0] = bound;

    // If first argument is a string, it is an event name or names. Bind the 
    // callback to the component.
    } else {
      
      // The last argument should always be a function.
      callbackIndex = args.length - 1;
      callback = args[callbackIndex];      
      
      if ($.isFunction(callback)) {

        // Bind the callback to the component using $.proxy for tracking 
        // rather than bind to allow for use with the Component.off() 
        // method.
        args[callbackIndex] = $.proxy(wrap ? wrap(callback) : callback, context);
      }
    }
    
    return args;
  }
  
  
  /**
   * Wrapper used to detect ancestry for listen events.
   * @param {Function} callback Original callback to execute if ancestor is 
   *   found.
   * @return {Function} Callback wrapped by proper ancestry detection.
   */
  function findClosest(callback) {
    return function(event) {
      // Only execute callback if the broadcaster of the event is in the 
      // component element's ancestry.
      if (this.$element.closest(event.target).length) {
        callback.apply(this, arguments);          
      }
    }
  }
  
  // Modify the base component using the definition function.
  definition.call(Component.prototype);
  
  
  /**
   * Factory method for creating component instances.
   * @param {HTMLElement} element The root HTML element of the component.
   * @param {Object} options Optional component configuration.
   * @return {Object} Component instance.
   */
  function factory(element, options) {
    return new Component(element, options);
  }
    
  // The component API is exposed through the factory.
  return factory;
}


/**
 * jQuery adapter
 * @param {Function} component 
 * @param {Object} options 
 * @return {jQuery} 
 */
$.fn.attach = function(component, options) {

  if (this.length) {
    this.each(function() {
      component(this, options);
    });
  }
  
  return this;
};


module.exports = component;
