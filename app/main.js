require('./vendor/bower_components/waypoints/lib/jquery.waypoints');
require('./vendor/bower_components/bootstrap-sass/assets/javascripts/bootstrap.js');
require('./vendor/bower_components/pagepiling.js/jquery.pagepiling.js');
require('./vendor/bower_components/dropkick/build/js/dropkick.min.js');
require('./vendor/bower_components/owl.carousel/dist/owl.carousel.min.js');
require('./vendor/bower_components/jquery-validation/dist/jquery.validate.js');
require('./vendor/bower_components/jquery-mousewheel/jquery.mousewheel.js');

var globalNavbar = require('./components/global-navbar/global-navbar.js');
globalNavbar();

var mobileNav = require('./components/mobile-nav/mobile-nav.js');
mobileNav();

var categoryFilterSorter = require('./components/category-filter-sorter/category-filter-sorter.js');
categoryFilterSorter();

var categoryFilterSorterMobile = require('./components/category-filter-sorter-mobile/category-filter-sorter-mobile.js');
categoryFilterSorterMobile();

var productTile = require('./components/product-tile/product-tile.js');
productTile();

var footer = require('./components/footer/footer.js');
footer();

var featureRow = require('./components/feature-row/feature-row.js');
featureRow();

var compareProducts = require('./components/compare-product-tiles/compare-product-tiles.js');
compareProducts();

var productHero = require('./components/product-hero/product-hero.js');
productHero();

var home = require('./components/homepage/homepage.js');
home.init($("body.home"));

var PDPPage = require('./components/pdp-page/pdp-page.js');
$('body.pdp, body.pdp-legacy').attach(PDPPage);
