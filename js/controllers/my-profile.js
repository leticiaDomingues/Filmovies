(function() {
	'use strict';

	angular
		.module('app')
		.controller('MyProfileController', myProfileController);

	myProfileController.$inject = ['$scope', 'FilMovies', '$localStorage', '$location', '$routeParams'];

	function myProfileController($scope, FilMovies, $localStorage, $location, $routeParams) {
		var self = this;

		self.tabClasses = ['active', '', ''];
		$scope.currentPage = 1;
		self.numPerPage = 18;
		self.title="Filmes assistidos";
		self.divNoMoviesToDisplay = 'display-none';

		//redirect to home if user is already logged-in
		if(!$localStorage.user)
			$scope.$parent.$parent.redirectToHome();

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
				FilMovies.getWatchedMovies(self.user.username, $scope.currentPage) :
				FilMovies.getFavoriteMovies(self.user.username, $scope.currentPage);
			promise.then(function(data) { 
				data.movies.forEach(function(m) { 
					m.Movie.Year = m.Movie.ReleaseDate.substring(0,4);		
					m.Movie.Stars = (m.Rate != null) ? $scope.$parent.$parent.calculateStars(m.Rate) : $scope.$parent.$parent.calculateStars(0);
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


		//display user info (logged user or friend)
		if($routeParams.friendUsername) {
			let friendUsername = $routeParams.friendUsername;
			let promise = FilMovies.getUserInfo(friendUsername);
			promise.then(function(data) { 
				self.user = {
					username : data.Username,
					name : data.Name
				};
				self.getMovies("watched");
			}, function(){});   
		} else {
			self.user = {
				username : $localStorage.user.Username,
				name : $localStorage.user.Name
			};	 
			self.getMovies("watched");
		}


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
})();