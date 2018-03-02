(function() {
	'use strict';

	angular
		.module('app')
		.controller('MovieInfoController', movieInfoController);

	movieInfoController.$inject = ['$routeParams', 'FilMovies'];

	function movieInfoController($routeParams, FilMovies) {
		var self = this;

		let movieID = $routeParams.id;

		//get movie info from API
		let promise = FilMovies.getMovie(movieID);
		promise.then(function(data) { 
			self.movie = data;
			self.movie.Year = self.movie.ReleaseDate.substring(0,4);
			console.log(self.movie);
		}, function(){}); 	
	}
})();