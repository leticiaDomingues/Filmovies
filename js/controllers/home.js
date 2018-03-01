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
				movie.Stars = calculateStars(movie.Rate);
			});

			self.movies = data;
		}, function(){}); 


		function calculateStars(rate) {			
			let stars = ['star_border','star_border','star_border','star_border','star_border'];
			switch (true) {
				case (rate == 5):
				    stars = ['star','star','star','star','star'];
				    break;
			  	case (rate > 4.2):
				    stars = ['star','star','star','star','star_half'];
				    break;
				case (rate > 3.8):
				    stars = ['star','star','star','star','star_border'];
				    break;
				case (rate > 3.2):
			    	stars = ['star','star','star','star_half','star_border'];
			    	break;
			    case (rate > 2.8):
			    	stars = ['star','star','star','star_border','star_border'];
			    	break;
				case (rate > 2.2):
			    	stars = ['star','star','star_half','star_border','star_border'];
			    	break;		
			   	case (rate > 1.8):
			    	stars = ['star','star','star_border','star_border','star_border'];
			    	break;	
			   	case (rate > 1.2):
			    	stars = ['star','star_half','star_border','star_border','star_border'];
			    	break;		
			    case (rate > 0.8):
			    	stars = ['star','star_border','star_border','star_border','star_border'];
			    	break;
			    case (rate > 0.2):
			    	stars = ['star_half','star_border','star_border','star_border','star_border'];
			    	break;	
			}
			return stars;
		}
	}
})();