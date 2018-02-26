(function() {
	'use strict';

	angular
		.module('app')
		.controller('MovieInfoController', movieInfoController);

	movieInfoController.$inject = ['$routeParams'];

	function movieInfoController($routeParams) {
		var self = this;

		self.name = ($routeParams.id == 1) ? "The Godfather" :  "Fight Club";
	}
})();