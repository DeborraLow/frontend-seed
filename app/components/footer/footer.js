var utils = require('../../lib/js/utils.js');

module.exports = function() {
  $(function(){
    // Variables
    var $submitBtn = $('#submit-button'),
        $signUpForm = $('#sign-up-form'),
        $emailInput = $('#newsletter-email'),
        $message = $('.newsletter-message');

    // Initialize dropkick dropdown select box styling
    $(".dk-select-language").dropkick({
      mobile: true
    });

    // Add placeholders to input and textarea for IE9
    utils.placeholder();

    jQuery.validator.addMethod("betterEmail", function(value, element) {
      // allow any non-whitespace characters as the host part
      return this.optional( element ) || /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/.test( value );
    }, 'Please enter a valid email address.');

    // Form validation jquery validate
    $signUpForm.validate({
      debug: false,
      errorClass: "error",
      errorElement: "div",
      rules: {
        email: {
          betterEmail: true,
          required: true,
          email: true
        }
      },
      invalidHandler: function(event, validator) {
        var requiredErrors = validator.errorList.filter(function(error) {
          return error.method === 'required';
        });
        if (requiredErrors.length) {
          $signUpForm.one('keydown', function() {
            $signUpForm.validate().resetForm();
          });
        }
      },
      errorPlacement: function(error, element) {
        error.insertBefore($('#newsletter-email'));
      },

      submitHandler: function(form) {
        // Remove errors from inputs
        $('.error', $(form)).removeClass('error');

        // On successful form submit, display a thank you message
        $submitBtn.add('#newsletter-email').css('display','none');
        $message.css('display','inline-block').animate({
          opacity: 1
        }).text('Thank You!');

        // Add real submit in integration
        // $('#sign-up-form').submit();
      }
    });

    

  });
};
