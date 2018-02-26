(function() {
	'use strict';

	angular
		.module('app')
		.controller('MoviesController', moviesController);

	moviesController.$inject = ['$routeParams'];

	function moviesController($routeParams) {
		var self = this;

		let category = $routeParams.category;
		if(category == "new")
			self.category = "Lançamentos";
		else if(category == "best")
			self.category = "Melhores Filmes";
		else
			self.category = "Filmes de " + category;
	}
})();