/*
Homepage scroll jacking functionality based on the Pagepiling plugin and
a custom handler to transition between the normal page and pagepiling.
*/

require('../../vendor/bower_components/gsap/src/uncompressed/TweenLite');
require('../../vendor/bower_components/gsap/src/uncompressed/plugins/CSSPlugin');
require('../../vendor/custom-plugin/jquery.fittext.js');

module.exports =  (function() {

  var $panelStack = $('#panel-stack'),
      $body = $('body'),
      $section = $('.section'),
      $productImg = $('.product-image').find('img'),
      $productText = $('.panel-text-transform'),
      $lastPanel = $('.last-panel'),
      $panelPage = $('.panel-page'),
      $globalNav = $("#global-navbar"),
      $navIcon = $("#nav-icon"),
      $subNav = $('#subnav'),
      $categoryTiles = $('.home-category-grid-tiles'),
      $footer = $('footer'),
      $window = $(window),
      $document = $(document),
      animationTime = 600;

  function init() {

    // Run page piling only on page with panel stack
    if($panelStack.length > 0) {

      // Full width responsive text for the h1 headlines
      $("#slide1 h1.full").fitText(0.55);
      $("#slide3 h2.full").fitText(0.8);
      $("#slide4 h2.full").fitText(0.3);
      $("#slide5 h2.full").fitText(0.4);

      // Add overflow hidden for fullscreen effect
      $body.add('html').css({"overflow":"hidden"});

      // Setup transitions
      $section.find($productText).css({
        'top': '-300px',
        'opacity': '0'
      });

      $section.find($productImg).css({
        'top': '200px',
        'opacity': '0'
      });

      $section.eq(0).find($productText).animate({
        'top': '0',
        'opacity': '1'
      }, animationTime);

      $section.eq(0).find($productImg).animate({
        'top': '0',
        'opacity': '1'
      }, animationTime);

      // Initialize pagepiling
      $panelStack.pagepiling({
        menu: null,
        direction: 'vertical',
        verticalCentered: false,
        sectionsColor: [],
        anchors: [],
        scrollingSpeed: 700,
        easing: 'swing',
        loopBottom: false,
        loopTop: false,
        css3: true,
        navigation: {
          'textColor': '#fff',
          'bulletsColor': '#fff',
          'position': 'left'
        },
        normalScrollElements: null,
        normalScrollElementTouchThreshold: 5,
        touchSensitivity: 5,
        keyboardScrolling: true,
        sectionSelector: '.section',
        animateAnchor: false,


        // Triggered when scrolling through slides
        onLeave: function (index, nextIndex, direction) {

          // Transition panel text in
          $section.eq(nextIndex - 1).find($productText).animate({
            'top': '0',
            'opacity': '1'
          }, animationTime);

          // Tranistion panel image in
          $section.eq(nextIndex - 1).find($productImg).animate({
            'top': '0',
            'opacity': '1'
          }, animationTime);

          // Tranistion previous panel text out
          $section.eq(index - 1).find($productText).animate({
            'top': '-300px',
            'opacity': '0'
          }, animationTime);

          // Tranistion previous panel image out
          $section.eq(index - 1).find($productImg).animate({
            'top': '200px',
            'opacity': '0'
          }, animationTime);

          // Last slide show content below
          if (nextIndex == 6) {
            // Display normal page layout
            showPage();
          }
        }

      });
    }

    // Hides pp-nav on mobile
    $('#pp-nav').addClass('hidden-xs');

    // Bring back slideshow on scroll
    $body.on({
      'DOMMouseScroll mousewheel wheel': scrollEnd
    });

    // Bring back slideshow on keypress
    $body.keydown(function(e){
      // Up Arrow & Home
      if(e.keyCode === 38 || e.keyCode === 36) {
        $body.animate({ scrollTop: 0 }, "slow");
        showPagePile();
      }
    });

    // Touch listeners on the body
    $body.on({
      'touchstart': touchStart,
      'touchmove': touchMove,
      'touchend': touchEnd
    });

  }

  // TOUCH
  var dragThreshold = 0.10, // "percentage" to drag before engaging
  dragStart = null,  // used to determine touch / drag distance
  percentage = 0,
  target,
  previousTarget,
  windowHeight = $(window).height();


  // Capture where the viewport was touched
  function touchStart(event) {
    if (dragStart !== null) { return; }

    if (event.originalEvent.touches) {
      event = event.originalEvent.touches[0];
    }

    dragStart = event.clientY;
  }

  // Capture the touch drag events
  function touchMove(event) {

    if (dragStart === null) { return; }
    if (event.originalEvent.touches) {
      event = event.originalEvent.touches[0];
    }

    delta = dragStart - event.clientY;
    percentage = delta / windowHeight;
  }

  function touchEnd() {
    dragStart = null;

    if (percentage >= dragThreshold) {}
    // Touch direction is up show pagepile
    else if (Math.abs(percentage) >= dragThreshold) {
      if ($(window).scrollTop() <= 0) {
        showPagePile();
      }
    }

    percentage = 0;
  }

  // Turn pagepiling back on
  function showPagePile() {
    // Check if pagepiling is hidden
    if($panelStack.hasClass('hide-pagepiling')) {

      // Remove class hidden
      $panelStack.removeClass('hide-pagepiling');

      // Pagepiling return to the last slide
      $.fn.pagepiling.moveTo(5);

      // Turn normal scrolling off
      $body.add('html').css({"overflow":"hidden"});

      // Display the pagepiling navigation
      $('#pp-nav').css('display','block');

      // Remove overflow hidden to allow normal page scroll on the last panel
      $panelPage.css({
        'height': '100%',
      });

      // Show pagepiling navigation
      $globalNav.add('#subnav').removeClass("purple-bg");
      $subNav.removeClass('open-on-click collapsed').addClass('initial-transparency');
      TweenLite.to($subNav, .33, {top:"105px", ease:Power1.easeOut});
      TweenLite.to($navIcon, .2, {top:"-35px", alpha: ".5", ease:Power3.easeOut});

      // Hide last panel
      setTimeout(function(){
        $panelPage.css('display','none');
      }, 600);


    }
  }

  // Turn category tiles and footer
  function showPage() {
    // Check if pagepiling is hidden
    if(!$panelStack.hasClass('hide-pagepiling')) {
      // Show last panel
      $panelPage.css('display','block');

      // Global nav revert to normal
      $globalNav.add('#subnav').addClass("purple-bg");
      $subNav.addClass('open-on-click collapsed').removeClass('initial-transparency');
      TweenLite.to($subNav, .33, {top:"70px", ease:Power1.easeOut});
      TweenLite.to($navIcon, .2, {top:"35px", alpha: "1", ease:Power3.easeOut});
      $subNav.addClass('home-nav');

      // Add class hidden to page piling
      $panelStack.addClass('hide-pagepiling');

      // Hide the last panel
      $lastPanel.css({
        '-webkit-transform' : 'translate3d(0px, -100%, 0px)',
        'transform'         : 'translate3d(0px, -100%, 0px)',
        'display':'none'
      });

      // Hide the nav
      $('#pp-nav').css('display','none');

      // Wait for animation end so that scroll does not bounce to the bottom
      setTimeout(function(){
        // Remove overflow hidden to allow normal page scroll on the body
        $body.add('html').css({"overflow-y":"scroll"});

        // // Remove overflow hidden to allow normal page scroll on the last panel
        $panelPage.css({
          'height': 'auto',
        });
      }, 1000);

    }
  }

  // Bring pagepiling back
  function scrollEnd(e) {
    //IE11 fix for scroll up
    if(typeof(e.originalEvent.wheelDelta) === 'undefined') {
      if(e.originalEvent.deltaY < 0 && $(window).scrollTop() <= 0) {
        showPagePile();
      }
    }

    // Scrolling up show pagepile
    else if (e.originalEvent.detail < 0 || e.originalEvent.wheelDelta > 0) {
      if ($(window).scrollTop() <= 0) {
        showPagePile();
      }
    }
  }

  return {
    init: init
  }
}());
