(function() {
	'use strict';

	angular
		.module('app')
		.controller('ExploreController', exploreController);

	exploreController.$inject = ['$scope', 'FilMovies'];

	function exploreController($scope, FilMovies) {
		var self = this;
		$('.carousel').carousel({dist:-50, padding: 50, indicators:true});
		self.watchedMovies = [];
		self.favoriteMovies = [];

		let promise = FilMovies.getMostWatchedMovies();
		promise.then(function(data) { 
			data.forEach(function(movie) { 
				movie.Year = movie.ReleaseDate.substring(0,4);			
				movie.Stars =$scope.$parent.$parent.calculateStars(movie.Rate);
			});
			self.watchedMovies = data;
		}, function(){}); 

		promise = FilMovies.getMostFavoriteMovies();
		promise.then(function(data) { 
			data.forEach(function(movie) { 
				movie.Year = movie.ReleaseDate.substring(0,4);			
				movie.Stars =$scope.$parent.$parent.calculateStars(movie.Rate);
			});
			self.favoriteMovies = data;
		}, function(){}); 
	}
})();

