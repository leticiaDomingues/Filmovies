(function() {
	'use strict';

	angular
		.module('app')
		.factory('FilMovies', filMovies);

	filMovies.$inject = ['$http'];

	function filMovies($http) {
		let baseUrl = 'http://localhost:62317/api';	

		function getRandomMovies() {
	        return $http.get(baseUrl + '/movie/random').then(function(result){
			  	return result.data;
	        });
		};

		function getAllMovies() {
	        return $http.get(baseUrl + '/movie').then(function(result){
			  	return result.data;
	        });
		};

		function getMovie(movieID) {
	        return $http.get(baseUrl + '/movie/' + movieID).then(function(result){
			  	return result.data;
	        });
		};

		function getBestRatedMovies(page) {
	        return $http.get(baseUrl + '/movie/best/rate?page=' + page).then(function(result){
			  	return result.data;
	        });
		};

		function getNewMovies(page) {
	        return $http.get(baseUrl + '/movie/new?page=' + page).then(function(result){
			  	return result.data;
	        });
		};

		function getMoviesByCategory(categoryId, page) {
	        return $http.get(baseUrl + '/movie/category?categoryId=' + categoryId + '&page=' + page).then(function(result){
			  	return result.data;
	        });
		};

		function getMoviesByQuery(query, page) {
	        return $http.get(baseUrl + '/movie/query?query=' + query + '&page=' + page).then(function(result){
			  	return result.data;
	        });
		};

		function getMoviesTemplate(pageName, query, page) {
			if(pageName == "new")
				return getNewMovies(page);
			else if (pageName=="best")
				return getBestRatedMovies(page);
			else if (pageName=="category")
	        	return getMoviesByCategory(query, page);
	        return getMoviesByQuery(query, page);
		};

		function getAllCategories() {
	        return $http.get(baseUrl + '/category').then(function(result){
			  	return result.data;
	        });
		};

		return {
			getRandomMovies : getRandomMovies,
			getAllCategories : getAllCategories,
			getMoviesTemplate : getMoviesTemplate,
			getMovie : getMovie
		};
	}
})();