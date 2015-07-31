require('../../vendor/bower_components/gsap/src/uncompressed/TweenLite');
require('../../vendor/bower_components/gsap/src/uncompressed/plugins/CSSPlugin');

module.exports = function() {

		var $categoryTab = $("#category-tab"),
			$categoryList = $("#category-list"),
			$filterByList = $("#filter-by-list"),
			$filterByTab = $("#filter-by-tab"),
			$filterByFilter = $("#filter-by-filter"),
			$sortByTab = $("#sort-by-tab"),
 			$sortByList = $("#sort-by-list"),
 			$allProductTiles = $("#products-grid").find(".product-tile"),
 			filterListTimer,
	 		categoryListTimer,
	 		sortByListTimer,
	 		numComparedItems = 0,
	 		numItemsShown = 0,
	 		lastCategory = "",
	 		currentCategory = "";

		var CategoryFilterSorter = (function () {
			var model = {
				category: "all",
				filters: [],
				sortBy: ""
			};

			function _setCategory (value) {
				lastCategory = model.category;
				model.category = value;
				currentCategory = model.category;
			}

			function _getCategory () {
				return model.category;
			}

			function _setSortBy (value) {
				model.sortBy = value;
			}

			function _getSortBy () {
				return model.sortBy;
			}

			function _addFilter (value) {
				var currentFilters = CategoryFilterSorter.getFilters();
				if(currentFilters.indexOf(value) < 0) {
					model.filters.push(value);
				}
			}

			function _removeFilter (value) {
				var currentFilters = CategoryFilterSorter.getFilters();
				index = model.filters.indexOf(value);
				if(index > -1) {
					model.filters.splice(index, 1);
					_filterProducts();
				}
			}

			function _getFilters () {
				return model.filters;
			}

			function _clearFilters () {
				model.filters = [];
			}

			function _updateNumProductsShowing() {
				var $includedTiles = $(".product-tile").filter(".included");
				numItemsShown = $includedTiles.length;
				var plural = (numItemsShown != 1) ? "s" : "";
		    $("#num-showing").html("Showing "+numItemsShown+" item"+plural);
		    if(numItemsShown==0) {
					$("#no-results-found").show();
				}else{
				 $("#no-results-found").hide();
				}
			}

			function _categorizeProducts () {
				//reset filters IF we had some set and we are changing the category without turning them off.
				if( currentCategory != lastCategory ) {
					resetAllFilters();
					resetAllCompareCheckboxes();
					showHideCompareButton();
				}
				$(".feature-tile").hide();
				if(_getCategory() === "all") {
					disableFilterBy();
					$("#products-grid").append($allProductTiles);
					$(".compare-checkbox").attr('checked', false);
					$allProductTiles.each( function(index,item) {
						$(item).addClass("included").fadeIn();
					});
				}else{
					$allProductTiles.each(function(index,item) {
						if(_getCategory() === $(item).attr("data-product-type")) {
							$(item).addClass("included").fadeIn().addClass("included");
						}else{
							$(item).removeClass("included").fadeOut().removeClass("included");
						}
					});
					enableFilterBy();
				}
				CategoryFilterSorter.updateNumProductsShowing();
			}

			function enableFilterBy() {
				$("#category-filter").removeClass("col-sm-6").addClass("col-sm-4");
				$("#filter-by-filter").addClass("col-sm-4").show();
				$("#sort-by-filter").removeClass("col-sm-6").addClass("col-sm-4");
			}

			function disableFilterBy() {
				$("#category-filter").removeClass("col-sm-4").addClass("col-sm-6");
				$("#filter-by-filter").hide();
				$("#sort-by-filter").removeClass("col-sm-4").addClass("col-sm-6");
			}

			function _sortProducts(sortType) {
				$(".feature-tile").detach();
				var $includedProducts = $("#products-grid").find(".product-tile").filter(".included");
				switch(sortType){
					case "price_low_high":
						$includedProducts.detach();
						$includedProducts.filter(".included").sort( function (a, b) {
						   return Math.ceil(a.getAttribute('data-price')) - Math.ceil(b.getAttribute('data-price'));
						}).appendTo($("#products-grid"));
						CategoryFilterSorter.updateNumProductsShowing();
					break;
					case "price_high_low":
						$includedProducts.detach();
						$includedProducts.filter(".included").sort( function (a, b) {
						   return Math.ceil(b.getAttribute('data-price')) - Math.ceil(a.getAttribute('data-price'));
						}).appendTo($("#products-grid"));
						CategoryFilterSorter.updateNumProductsShowing();
					break;
					default: break;
				}
			}

			function _filterProducts() {
				var currentSelectedFilters = CategoryFilterSorter.getFilters();
				if(currentSelectedFilters.length > 0) {
					var $allProducts = $("#products-grid").find(".product-tile");
					var cat = CategoryFilterSorter.getCategory();
					$allProducts.each(function(index, item) { 
						var $item = $(item);
						if($item.attr("data-product-type") == cat) {
							var currentProductAttributes = $item.attr("data-filters").split(",");
							var matches = currentProductAttributes.diff(currentSelectedFilters); 
							if(matches.length == currentSelectedFilters.length) { 
								$item.fadeIn().addClass("included");
							}else{
								$item.fadeOut().removeClass("included");
							}
						}
					});
				}else{
					CategoryFilterSorter.categorizeProducts(); 
				}
				CategoryFilterSorter.updateNumProductsShowing();
			}

			return {
				setCategory: _setCategory,
				setSortBy: _setSortBy,
				getCategory: _getCategory,
				getSortBy: _getSortBy,
				categorizeProducts: _categorizeProducts,
				sortProducts: _sortProducts,
				addFilter: _addFilter,
				removeFilter: _removeFilter,
				getFilters: _getFilters,
				filterProducts: _filterProducts,
				updateNumProductsShowing: _updateNumProductsShowing
			}

		}()); //close CategoryFilterSorter

		//set defaults 
		$categoryList.addClass("collapsed");
		$categoryTab.find(".triangle-up").addClass("hide");
		$filterByList.addClass("collapsed");
		$filterByTab.find(".triangle-up").addClass("hide");
	 	$sortByList.addClass("collapsed");
	  $sortByTab.find(".triangle-up").addClass("hide");
		$("#filter-by-filter").hide();
	 	$allProductTiles.addClass("included").fadeIn();
	 	$('[data-toggle="tooltip"]').tooltip();
	 	resetAllCompareCheckboxes();
	 	showHideCompareButton();

	 	//checkboxes in the filter by dropdown
	 	$("input.feature_checkbox").on("click", function(event) {
			if( $(this).is(":checked") ) {
				CategoryFilterSorter.addFilter( $(this).attr("value") );
			}else{
				CategoryFilterSorter.removeFilter( $(this).attr("value") );
			}
			CategoryFilterSorter.filterProducts();
			CategoryFilterSorter.sortProducts(CategoryFilterSorter.getSortBy());
		});
	  
		$categoryTab.on("click", function(event) {
			if($categoryList.hasClass("collapsed")) {
				$categoryList.removeClass("collapsed");
				TweenLite.to($categoryList, .33, {"height":"550px", "border-bottom": "20px solid #ededed", ease:Power2.easeIn});
				$categoryTab.addClass("active");
				$categoryTab.find(".triangle-down").addClass("hide");
				$categoryTab.find(".triangle-up").removeClass("hide");
			  
		 	}else{
		 		collapseList($categoryList);
		 		$categoryTab.removeClass("white");
				$categoryTab.find(".tab-label").removeClass("hide");
				$categoryTab.find(".triangle-down").removeClass("hide");
				$categoryTab.find(".triangle-up").addClass("hide");
		  	$categoryList.addClass("collapsed");
		  }
		});

		$categoryList.find("li").on("click", function() {
			$categoryList.find("li").removeClass("active");
			$(this).addClass("active");
			CategoryFilterSorter.setCategory($(this).attr("data-product-type")); //this is used by product tiles to allow compare action 
			$("#products-grid").attr("data-category", CategoryFilterSorter.getCategory());
			$categoryTab.find(".tab-label").html($(this).html()); //set tab text to active selection
			CategoryFilterSorter.categorizeProducts();
			$categoryList.addClass("collapsed");
			collapseList($categoryList);
			$categoryTab.find(".tab-label").removeClass("hide");
			$categoryTab.find(".triangle-down").removeClass("hide");
			$categoryTab.find(".triangle-up").addClass("hide");
		});

		$filterByTab.on("click", function(event) {
			if($filterByList.hasClass("collapsed")) {
				$filterByTab.addClass("active");
				TweenLite.to($filterByList, .33, {"height":"587px", "border-bottom": "20px solid #ededed", ease:Power2.easeIn});
				$filterByTab.find(".triangle-down").addClass("hide");
				$filterByTab.find(".triangle-up").removeClass("hide");
			  $filterByList.removeClass("collapsed");
		 	}else{
		 		$filterByTab.removeClass("active");
		 		collapseList($filterByList);
				$filterByTab.find(".triangle-down").removeClass("hide");
				$filterByTab.find(".triangle-up").addClass("hide");
		  	$filterByList.addClass("collapsed");
		  }
		});
		$filterByTab.find("li").on("click", function() {
			$filterByTab.find(".tab-label").html($(this).html()); //set tab text to active selection
			$filterByList.addClass("hide");
			$filterByTab.find(".tab-label").removeClass("hide");
			$filterByTab.find(".triangle-down").removeClass("hide");
			$filterByTab.find(".triangle-up").addClass("hide");
		});

		$sortByTab.on("click", function(event) {
			if($sortByList.hasClass("collapsed")) {
				$sortByTab.addClass("active");
				$sortByList.removeClass("collapsed");
				TweenLite.to($sortByList, .33, {"height":"255px", "border-bottom": "20px solid #ededed", ease:Power2.easeIn});
				$sortByTab.find(".triangle-down").addClass("hide");
				$sortByTab.find(".triangle-up").removeClass("hide");
		 	}else{
		 		$sortByTab.removeClass("active");
		 		collapseList($sortByList);
		 		$sortByTab.find(".tab-label").removeClass("hide");
				$sortByTab.find(".triangle-down").removeClass("hide");
				$sortByTab.find(".triangle-up").addClass("hide");
		  	$sortByList.addClass("collapsed");
		  }
		});
		$sortByList.find("li").on("click", function() {
			CategoryFilterSorter.setSortBy($(this).attr("data-sort-type"));
			CategoryFilterSorter.sortProducts(CategoryFilterSorter.getSortBy());
			$sortByTab.find(".tab-label").html($(this).html()); //set tab text to active selection
			$sortByTab.removeClass("active");
			$sortByList.addClass("collapsed");
			collapseList($sortByList);
			$sortByTab.find(".tab-label").removeClass("hide");
			$sortByTab.find(".triangle-down").removeClass("hide");
			$sortByTab.find(".triangle-up").addClass("hide");
		});
		CategoryFilterSorter.updateNumProductsShowing();
		
		//clear all button turns off all filters and recategorizes.
		$("#clear-all").on("click", function(event) {
			resetAllFilters();
			CategoryFilterSorter.categorizeProducts();
	 	});

	 	$("#category-tab, #category-list").on("mouseleave", function() {
	 		categoryListTimer = setTimeout( function(){
	 			$categoryList.addClass("collapsed");
	 			collapseList($categoryList);
				$categoryTab.find(".triangle-down").removeClass("hide").end().find(".triangle-up").addClass("hide");
	 		}, 1000);
	 	}).on("mouseenter", function() {
	 		clearTimeout(categoryListTimer);
	 	});

	 	$("#filter-by-tab, #filter-by-list").on("mouseleave", function() {
	 		filterListTimer = setTimeout( function(){
	 			$filterByList.addClass("collapsed");
	 			$filterByTab.removeClass("active");
	 			collapseList($filterByList);
				$filterByTab.find(".triangle-down").removeClass("hide").end().find(".triangle-up").addClass("hide");
	 		}, 1000);
	 	}).on("mouseenter", function() {
	 		clearTimeout(filterListTimer);
	 	});

	 	$("#sort-by-tab, #sort-by-list").on("mouseleave", function() {
	 		sortByListTimer = setTimeout( function(){
	 			$sortByList.addClass("collapsed");
	 			$sortByTab.removeClass("active");
	 			collapseList($sortByList);
				$sortByTab.find(".triangle-down").removeClass("hide").end().find(".triangle-up").addClass("hide");
	 		}, 1000);
	 	}).on("mouseenter", function() {
	 		clearTimeout(sortByListTimer);
	 	});
  
	  $(".product-tile").find(".compare-checkbox").on("click", function(event){
	    var $target = $(event.target);
	    numComparedItems = ($target.is(":checked") && numComparedItems >= 0) ? numComparedItems+1 : numComparedItems-1;
	    testForMaxCompare();
	    if(numComparedItems > 1) {
	    	$("#compare-choices-btn").html("Compare ("+numComparedItems+")");
	      compareButtonInit();
	    }else{
	      compareButtonDestroy();
	    }
	    showHideCompareButton();
	  });
	  //moves feature tile to fill second row
	  $(".feature-tile").insertAfter($(".product-tile")[2]);

		function collapseList(element){
			TweenLite.to(element, .1, {"height":"0", "border-bottom": "0", ease:Power2.easeIn});
		}

		function resetAllFilters() {
	 		$("input.feature_checkbox").attr("checked", false);
		}

		function resetAllCompareCheckboxes() {
	 		$("input.compare-checkbox").attr("checked", false)
	 		$(".compare-checkbox-group").hide();
	 		numComparedItems = 0;
		}

		//lets user compare up to 4, disables past that point
	  function testForMaxCompare() {
	    if(numComparedItems < 4) {
	      var $allCheckboxes = $(".product-tile.included").find(".compare-checkbox");
	      $.each($allCheckboxes, function() {
	        $(this).attr("disabled", false).next().html("Compare").removeClass("maxCompare");
	      });
	    }else{
	      var $unusedCheckboxes = $(".product-tile.included").find(".compare-checkbox").not(":checked");
	      $.each($unusedCheckboxes, function() {
	        $(this).attr("disabled", true).next().html("Max (4) products").addClass("maxCompare");
	      });
	    }
	  }

	  // Compare product button functionality init
	  var $productGrid = $('#products-grid'),
	      $compareChoicesBtn = $("#compare-choices-btn");

	  function compareButtonInit() {
	    // Position compare button on init
	    calculateCompareButton();

	    // Compare button bounds to not overlap footer or header areas
	    $(window).on('scroll', calculateCompareButtonOnScroll);

	    // On resize reposition compare button
	    $(window).on('resize', resizeCompareButton);
	  }

	  // On resize reposition compare button
	  function resizeCompareButton() {
	    // For position absolute, don't recalculate
	    if ($compareChoicesBtn.css("position") !== "absolute") {
	      calculateCompareButton();
	    }
	  }

	  function compareButtonDestroy() {
	    $(window).off("resize", resizeCompareButton);
	    $(window).off("scroll", calculateCompareButtonOnScroll);
	  }

	  // Position compare button
	  function calculateCompareButton() {
	    var productGridPos = $productGrid.offset().left;
	    $compareChoicesBtn.css({right:productGridPos-10});
	  }

	  function showHideCompareButton() {
			if (numItemsShown >= 2 && numComparedItems>=2) {
				$("#compare-choices-btn").show();
			}else{
				$("#compare-choices-btn").hide();
			}
	  }

	  // Scroll variables
	  var currentScroll,lastScroll;

	  function calculateCompareButtonOnScroll() {
	    currentScroll = $(window).scrollTop();
	    if(currentScroll-lastScroll > 0) {

	      if($(window).scrollTop() >= $('footer').offset().top - window.innerHeight) {
	        $compareChoicesBtn.css({'top':'auto','bottom':0,'right':-10,'position':'absolute'});
	      }
	      else {
	        $compareChoicesBtn.css({'top':'auto','bottom':'50px','position':'fixed'});
	        calculateCompareButton();
	      }
	    }
	    else {
	      if($(window).scrollTop() >= $('footer').offset().top - window.innerHeight) {
	        $compareChoicesBtn.css({'top':'auto','bottom':0,'right':-10,'position':'absolute'});
	      }
	      else if ($(window).scrollTop() + window.innerHeight <= $productGrid.offset().top) {
	        $compareChoicesBtn.css({'top':0, 'bottom':'auto', 'right':-10,'position':'absolute'});
	      }
	      else {
	        $compareChoicesBtn.css({'top':'auto','bottom':'50px','position':'fixed'});
	        calculateCompareButton();
	      }
	    }
	    lastScroll=currentScroll;
	  }

}