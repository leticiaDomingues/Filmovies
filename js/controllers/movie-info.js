(function() {
	'use strict';

	angular
		.module('app')
		.controller('MovieInfoController', movieInfoController);

	movieInfoController.$inject = ['$routeParams', 'FilMovies'];

	function movieInfoController($routeParams, FilMovies) {
		var self = this;

		let movieID = $routeParams.id;
		self.reviewPage = 0;
		self.nextReviewPage=0;
		self.reviews = [];
		self.howManyReviews = 0;
		self.displayNoReviewsDiv = 'display-none';

		//get movie info from API
		let promise = FilMovies.getMovie(movieID);
		promise.then(function(data) { 
			self.movie = data;
			self.movie.Year = self.movie.ReleaseDate.substring(0,4);
			
			self.getReviews();

		}, function(){}); 

		self.getReviews = function() {
			if(self.nextReviewPage != -1) {
				self.reviewPage++;
				let promise = FilMovies.getMovieReviews(movieID, self.reviewPage);
				promise.then(function(data) { 
					data.reviews.forEach(function(review) { 			
						review.Stars = calculateStars(review.Rate);
						if(review.Rate == null)
							review.Rate = 0;
					});
					self.howManyReviews = data.count;
					self.reviews = self.reviews.concat(data.reviews);

					if(self.howManyReviews== 0) {
						self.displayNoReviewsDiv = 'inline-block';
					}

					if(self.reviewPage * 3 < data.count){
						self.nextReviewPage = self.reviewPage+1;
					} else {
						self.nextReviewPage = -1;
					}
					console.log(self.reviews);
				}, function(){}); 
			}	
		}
	}

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
})();