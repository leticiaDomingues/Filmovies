(function() {
	'use strict';

	angular
		.module('app')
		.controller('AppController', appController);

	appController.$inject = ['$scope','FilMovies', '$location'];

	function appController($scope, FilMovies, $location) {
		var self = this;

		$scope.activePageClasses = ['active', '', '', '', '', '', '', '', '', '', '', '','', '', '', '', ''];

		//get categories from API
		$scope.categories = [];
		FilMovies.getAllCategories().then(function(data) { 
			$scope.categories = data;
		}, function(){}); 

		$scope.changeActivePageClass = function(item) {
			$scope.activePageClasses = ['', '', '', '', '', '', '', '', '', '', '', '','', '', '', '', ''];
			$scope.activePageClasses[item] = 'active';
		}

		$scope.$watch('search', function() {
			$scope.activePageClasses = ['active', '', '', '', '', '', '', '', '', '', '', '','', '', '', '', ''];
			if($scope.search != "")
	        	$location.path("movies/search-" + $scope.search);
	        else {
	        	$location.path("#/");
	        }
	    });
	}
})();