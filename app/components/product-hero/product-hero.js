module.exports = function() {
  $(function(){
    var $productsCarousel = $("#product-carousel");

    // Initialize dropkick dropdown select box styling
    $(".dk-select-product").dropkick({
      mobile: true
    });

    // Product carousel in small
    var $owl = $productsCarousel.owlCarousel({
      items: 1,
      loop: true
    });

    $(".product-thumbnail-image").on('click', function() {
      var $productImage = $('#product-images > .product-image'),
          index = $(this).data('product');

      $productImage.removeClass('selected');
      $productImage.each(function() {
        if( $(this).attr('data-product-index') === index ) {
          $(this).addClass('selected');
        }
      });
    });


  });
};
