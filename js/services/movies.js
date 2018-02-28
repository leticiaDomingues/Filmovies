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

		function getAllCategories() {
	        return $http.get(baseUrl + '/category').then(function(result){
			  	return result.data;
	        });
		};

		return {
			getRandomMovies : getRandomMovies,
			getAllCategories : getAllCategories
		};
	}
})();