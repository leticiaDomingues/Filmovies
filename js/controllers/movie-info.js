(function() {
	'use strict';

	angular
		.module('app')
		.controller('MovieInfoController', movieInfoController);

	movieInfoController.$inject = ['$routeParams', 'FilMovies'];

	function movieInfoController($routeParams, FilMovies) {

		$(document).ready(function() {
		    $('#modalNewReview').modal();
		});
		var self = this;

		self.movieID = $routeParams.id;
		self.reviewPage = 0;
		self.nextReviewPage=0;
		self.reviews = [];
		self.howManyReviews = 0;
		self.displayNoReviewsDiv = 'display-none';

		//get movie info from API
		let promise = FilMovies.getMovie(self.movieID);
		promise.then(function(data) { 
			self.movie = data;
			self.movie.Year = self.movie.ReleaseDate.substring(0,4);
			
			self.getReviews("Refresh");

		}, function(){}); 

		self.getReviews = function(action) {
			if(action == 'afterNewReview') {
				self.reviewPage = 0;
				self.nextReviewPage=0;
				self.reviews = [];
			}
			if(self.nextReviewPage != -1) {
				self.reviewPage++;
				let promise = FilMovies.getMovieReviews(self.movieID, self.reviewPage);
				promise.then(function(data) { 
					data.reviews.forEach(function(review) { 
						review.Review.Content.replace(/\n/g, "<br />");			
						review.Stars = calculateStars(review.Rate);
						if(review.Rate == null)
							review.Rate = 0;
					});
					self.howManyReviews = data.count;

					self.reviews = self.reviews.concat(data.reviews);
					if(self.howManyReviews== 0) {
						self.displayNoReviewsDiv = 'inline-block';
					} else {
						self.displayNoReviewsDiv = 'display-none';
					}

					if(self.reviewPage * 3 < data.count){
						self.nextReviewPage = self.reviewPage+1;
					} else {
						self.nextReviewPage = -1;
					}
				}, function(){}); 
			}	
		}

		self.addReview = function() {
			var review =  {
				"Content": self.newReview,
				"Date": new Date(),
				"Username": "isa",
				"MovieID": self.movieID
			}
			

			let promise = FilMovies.addReview(review);
			promise.then(function(data) { 
				self.newReview = "";
				self.getReviews("afterNewReview");
			}, function(){}); 

			return false;
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