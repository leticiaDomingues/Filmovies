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
			
			data.forEach(function(movie) { 
				movie.Year = movie.ReleaseDate.substring(0,4);			
				movie.Stars = $scope.$parent.$parent.calculateStars(movie.Rate);
			});

			self.movies = data;
		}, function(){}); 
	}
})();