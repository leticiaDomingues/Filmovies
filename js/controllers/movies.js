(function() {
	'use strict';

	angular
		.module('app')
		.controller('MoviesController', moviesController);

	moviesController.$inject = ['$scope','$routeParams', 'FilMovies', '$location'];

	function moviesController($scope, $routeParams, FilMovies, $location) {
		var self = this;

		self.page = $routeParams.page;
		let query = "";

		if(self.page == "new")
			self.title = "Lançamentos";
		else if(self.page == "best")
			self.title = "Melhores Filmes";
		else {
			if(self.page.substring(0,1) == 'c') {
				query = self.page.substring(9);
				self.page = "category";
				self.title = "Filmes de " + query;
			} else {
				query = self.page.substring(7);
				if(query=='undefined')
					$location.path("#/");
				self.page = "search";
				self.title = "Buscando filmes relacionados a '" + query +"'...";
			}
			
		}

		self.getMovies = function()  {
			let promise = FilMovies.getMoviesTemplate(self.page, query, $scope.currentPage);
			promise.then(function(data) { 
				data.movies.forEach(function(movie) { 
					movie.Year = movie.ReleaseDate.substring(0,4);			
					movie.Stars =$scope.$parent.$parent.calculateStars(movie.Rate);
				});

				if(self.page == 'category') {
					self.title = "Filmes de " + data.category;
				}

				if(data.count == 0)
					self.divNoMoviesToDisplay = '';
				else 
					self.divNoMoviesToDisplay = 'display-none';

				self.movies = data.movies;
				self.numberOfPages = Math.ceil(data.count/self.numPerPage);
				self.calculatePages();
			}, function(){}); 
		}

		//pagination variables
		$scope.currentPage = 1;
		self.numberOfPages = 0;
		self.numPerPage = 18;
		self.pages = [];
		self.paginationClasses = [];
		self.divNoMoviesToDisplay = 'display-none';
		
		//get movies from API
		self.movies = [];
		self.getMovies();

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
			self.getMovies($scope.currentPage);		
		}
	}	
})();