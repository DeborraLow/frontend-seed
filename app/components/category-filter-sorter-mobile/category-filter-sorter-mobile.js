module.exports = function() {

  $(function(){
		var $categoryTab = $("#category-filter-sorter-mobile").find("#category-tab-mobile"),
				$categoryList = $("#category-filter-sorter-mobile").find("#category-list-mobile"),
				$allProductTiles = $("#products-grid").find(".product-tile"),
				$filterByTab = $("#filter-by-tab-mobile"),
				$filterByList = $("#filter-by-list-mobile"),
				$filterByFilter = $("#filter-by-filter-mobile"),
				$sortByFilter = $("#sort-by-filter-mobile"),
				$sortByTab = $("#sort-by-tab-mobile"),
				$sortByList = $("#sort-by-list-mobile"),
				$leftside = $("#category-filter-sorter-mobile").find("#left-side")
				$rightside = $("#category-filter-sorter-mobile").find("#right-side");

		//set defaults
		$categoryList.addClass("hide");
		$categoryTab.find(".triangle-up").addClass("hide");
		$filterByList.addClass("hide");
		$filterByTab.find(".triangle-up").addClass("hide");
	 	$sortByList.addClass("hide");
	  $sortByTab.find(".triangle-up").addClass("hide");
	 	$allProductTiles.addClass("included").fadeIn();
	 	$filterByFilter.hide();

		var CategoryFilterSorterMobile = (function () {
			var model = {
				category: "",
				filters: [],
				sortBy: ""
			};

			function _setCategory (value) {
				model.category = value;
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
				var currentFilters = CategoryFilterSorterMobile.getFilters();
				if(currentFilters.indexOf(value) < 0) {
					model.filters.push(value);
				}
			}

			function _removeFilter (value) {
				var currentFilters = CategoryFilterSorterMobile.getFilters();
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
				var numItemsShown = $includedTiles.length;
				var plural = (numItemsShown != 1) ? "s" : "";
		    $("#num-showing").html("Showing "+numItemsShown+" item"+plural);
		   	(numItemsShown==0) ?  $("#no-results-found").show() : $("#no-results-found").hide();
			}

			function _categorizeProducts () {
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
				CategoryFilterSorterMobile.updateNumProductsShowing();
			}


			function enableFilterBy() {
				$filterByFilter.show();
				$filterByFilter.removeClass("col-xs-10").addClass("col-xs-5");
				$sortByFilter.removeClass("col-xs-10").addClass("col-xs-5");
			}

			function disableFilterBy() {
				$filterByFilter.hide();
				$filterByFilter.removeClass("col-xs-5").addClass("col-xs-10");
				$sortByFilter.removeClass("col-xs-5").addClass("col-xs-10");
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
						CategoryFilterSorterMobile.updateNumProductsShowing();
					break;

					case "price_high_low":
						$includedProducts.detach();
						$includedProducts.filter(".included").sort( function (a, b) {
						   return Math.ceil(b.getAttribute('data-price')) - Math.ceil(a.getAttribute('data-price'));
						}).appendTo($("#products-grid"));
						CategoryFilterSorterMobile.updateNumProductsShowing();
					break;
					default: break;
				}
			}

			function _filterProducts() {
				var currentSelectedFilters = CategoryFilterSorterMobile.getFilters();
				if(currentSelectedFilters.length > 0) {
					var $allProducts = $("#products-grid").find(".product-tile");
					var cat = CategoryFilterSorterMobile.getCategory();
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
					CategoryFilterSorterMobile.categorizeProducts(); 
				}
				CategoryFilterSorterMobile.updateNumProductsShowing();
			}

			return {
				setCategory: _setCategory,
				setSortBy: _setSortBy,
				getCategory: _getCategory,
				getSortBy: _getSortBy,
				addFilter: _addFilter,
				removeFilter: _removeFilter,
				categorizeProducts: _categorizeProducts,
				sortProducts: _sortProducts,
				getFilters: _getFilters,
				filterProducts: _filterProducts,
				updateNumProductsShowing: _updateNumProductsShowing
			}

		}());

		function collapseList(element){
			TweenLite.to(element, .33, {"height":"0", "border-bottom": "0", ease:Power2.easeIn});
		}

		$("#category-filter-sorter-mobile input.feature_checkbox").on("click", function(event) {
			if( $(this).is(":checked") ) {
				CategoryFilterSorterMobile.addFilter( $(this).attr("value") );
			}else{
				CategoryFilterSorterMobile.removeFilter( $(this).attr("value") );
			}
			CategoryFilterSorterMobile.filterProducts();
		});

		function hideCategoryList() {
			$categoryTab.removeClass("white");
			$categoryTab.find(".tab-label").removeClass("hide");
			$categoryTab.find(".triangle-down").removeClass("hide");
			$categoryTab.find(".triangle-up").addClass("hide");
	  	$categoryList.addClass("hide");
		}

		function hideFilterByList() {
			$filterByTab.removeClass("active");
			$filterByTab.find(".triangle-down").removeClass("hide");
			$filterByTab.find(".triangle-up").addClass("hide");
		  $filterByList.addClass("hide");
		}

		function hideSortByList() {
			$sortByTab.removeClass("active");
	 		$sortByTab.find(".tab-label").removeClass("hide");
			$sortByTab.find(".triangle-down").removeClass("hide");
			$sortByTab.find(".triangle-up").addClass("hide");
	  	$sortByList.addClass("hide");
		}

		//reset all filters to unchecked when clicked
		$("#category-filter-sorter-mobile #clear-all-mobile").on("click", function(event) {
	 		$("input.feature_checkbox").attr("checked", false);
	 		CategoryFilterSorterMobile.categorizeProducts();
	 	});

		$("#next-filter").on("click", function(event) {
			$leftside.addClass("hidden");
			$rightside.removeClass("hidden");
			hideCategoryList();
			hideFilterByList();
			hideSortByList();
		});

		$("#prev-filter").on("click", function(event) {
			$rightside.addClass("hidden");
			$leftside.removeClass("hidden");
		});

		$categoryTab.on("click", function(event) {
			if($categoryList.hasClass("hide")) {
				$categoryTab.addClass("active");
				$categoryTab.find(".triangle-down").addClass("hide");
				$categoryTab.find(".triangle-up").removeClass("hide");
			  $categoryList.removeClass("hide");
		 	}else{
		 		hideCategoryList();
		  }
		});

		$categoryList.find("li").on("click", function() {
			$categoryList.find("li").removeClass("active");
			$(this).addClass("active");
			CategoryFilterSorterMobile.setCategory($(this).attr("data-product-type")); //this is used by product tiles to allow compare action
			$("#products-grid").attr("data-category", CategoryFilterSorterMobile.getCategory());
			$categoryTab.find(".tab-label").html($(this).html()); //set tab text to active selection
			CategoryFilterSorterMobile.categorizeProducts();
			//close tab
			$categoryList.addClass("hide");
			$categoryTab.find(".tab-label").removeClass("hide");
			$categoryTab.find(".triangle-down").removeClass("hide");
			$categoryTab.find(".triangle-up").addClass("hide");
		});

		$filterByTab.on("click", function(event) {
			if($filterByList.hasClass("hide")) {
				hideSortByList();
				$filterByTab.addClass("active");
				$filterByTab.find(".triangle-down").addClass("hide");
				$filterByTab.find(".triangle-up").removeClass("hide");
			  $filterByList.removeClass("hide");
		 	}else{
		 		hideFilterByList();
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
			if($sortByList.hasClass("hide")) {
				hideFilterByList();
				$sortByTab.addClass("active");
				$sortByTab.find(".triangle-down").addClass("hide");
				$sortByTab.find(".triangle-up").removeClass("hide");
			  $sortByList.removeClass("hide");
		 	}else{
		 		hideSortByList();
		  }
		});
		$sortByList.find("li").on("click", function() {
			CategoryFilterSorterMobile.setSortBy($(this).attr("data-sort-type"));
			CategoryFilterSorterMobile.sortProducts(CategoryFilterSorterMobile.getSortBy());
			$sortByTab.find(".tab-label").html($(this).html()); //set tab text to active selection
			CategoryFilterSorterMobile.sortProducts();
			$sortByTab.removeClass("active");
			$sortByList.addClass("hide");
			$sortByTab.find(".tab-label").removeClass("hide");
			$sortByTab.find(".triangle-down").removeClass("hide");
			$sortByTab.find(".triangle-up").addClass("hide");
		});
		CategoryFilterSorterMobile.updateNumProductsShowing();
 	});
 };
