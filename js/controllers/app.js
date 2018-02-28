(function() {
	'use strict';

	angular
		.module('app')
		.controller('AppController', appController);

	appController.$inject = ['$scope','FilMovies'];

	function appController($scope, FilMovies) {
		//get categories from API
		$scope.categories = [];
		FilMovies.getAllCategories().then(function(data) { 
			$scope.categories = data;
		}, function(){}); 
	}
})();