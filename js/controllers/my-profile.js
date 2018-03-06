	(function() {
		'use strict';

		angular
			.module('app')
			.controller('MyProfileController', myProfileController);

		myProfileController.$inject = ['$scope', 'FilMovies'];

		function myProfileController($scope, FilMovies) {
			var self = this;

			self.tabClasses = ['active', '', ''];
			self.username = 'isa';
			$scope.currentPage = 1;
			self.numPerPage = 18;
			self.title="Filmes assistidos";
			self.divNoMoviesToDisplay = 'display-none';



			self.changeTab = function(index) {
				self.tabClasses = ['', '', ''];
				self.tabClasses[index] = 'active';
				$scope.currentPage = 1;

				switch(index) {
					case 0: self.title="Filmes assistidos";
							self.getMovies("watched");
							break;
					case 1: self.title="Filmes favoritos";
							self.getMovies("favorite");
							break;
					case 2: self.title="Estatísticas";
							break;
				}
			}

			self.getMovies = function(pageName)  {
				let promise = (pageName=="watched") ?
					FilMovies.getWatchedMovies(self.username, $scope.currentPage) :
					FilMovies.getFavoriteMovies(self.username, $scope.currentPage);
				promise.then(function(data) { 
					data.movies.forEach(function(m) { 
						m.Movie.Year = m.Movie.ReleaseDate.substring(0,4);		
						m.Movie.Stars = (m.Rate != null) ? calculateStars(m.Rate) : calculateStars(0);
					});

					if(data.count == 0)
						self.divNoMoviesToDisplay = '';
					else 
						self.divNoMoviesToDisplay = 'display-none';

					self.movies = data.movies;
					self.numberOfPages = Math.ceil(data.count/self.numPerPage);
					self.calculatePages();
				}, function(){}); 
			}

			//get movies from API
			self.movies = [];
			self.getMovies("watched");


			//control pagination
	 		self.calculatePages = function() {
	 			self.pages = [];
			    for(let i=0; i<self.numberOfPages; i++)
			    	self.pages[i] = (i==$scope.currentPage-1) ? 'active' : '';

			    if(self.numberOfPages==0) self.paginationClasses=['display-none','display-none'];
			    else if(self.numberOfPages==1) self.paginationClasses=['disabled','disabled'];
			    else {
					if($scope.currentPage == self.pages.length) self.paginationClasses=['','disabled'];
					if($scope.currentPage == 1) self.paginationClasses=['disabled',''];
				}
	 		}
			self.changePage = function(index) {
				switch(index) {
					case -1: $scope.currentPage--;
							 break;
					case 0:  $scope.currentPage++;
							 break;
					default: $scope.currentPage = index;
				}

				self.calculatePages();	
				self.getMovies("watched");		
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