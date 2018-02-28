(function() {
	'use strict';

	angular
		.module('app')
		.controller('HomeController', homeController);

	homeController.$inject = ['$scope', 'FilMovies'];

	function homeController($scope, FilMovies) {
		var self = this;

		//get movies from API
		self.movies = [];
		let promise = FilMovies.getRandomMovies();
		promise.then(function(data) { 
			self.movies = data;
		}, function(){}); 
	}
})();