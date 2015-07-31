/*
	Array.diff function
	courtesy of solution found at http://stackoverflow.com/questions/12433604/how-can-i-find-matching-values-in-two-arrays
	usage: array1.diff(array2);
*/
Array.prototype.diff = function(arr2) {
  var ret = [];
  for(i in this) {
      if(arr2.indexOf( this[i] ) > -1){
          ret.push( this[i] );
      }
  }
  return ret;
};

module.exports = (function() {
	/* price formatter global fn.
	converts $99.99 for example, to $99 with a superscript 99 and no dot separator.
	usage: formatPrice(69.99) returns 69<sup>99</sup>
	*/
	function formatPrice(price) {
	  return price.split(".")[0] + "<sup>" + price.split(".")[1] + "</sup>";
	}

  /* debounce global fn. throttles function calls */
  function debounce(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    }
  }

  // placeholder polyfill for IE9
  function placeholder(){
    if (!Modernizr.input.placeholder) {
      $("[placeholder]").each(function() {
        var initial_value, input;
        input = $(this);
        initial_value = input.attr("placeholder");
        input.val(initial_value);
        input.focus(function() {
          if (input.val() === input.attr("placeholder")) {
            return input.val("");
          }
        });
        return input.blur(function() {
          if (input.val() === "") {
            return input.val(initial_value);
          }
        });
      });
    }
  }

  return {
    formatPrice: formatPrice,
    debounce: debounce,
    placeholder: placeholder
  }

}());
