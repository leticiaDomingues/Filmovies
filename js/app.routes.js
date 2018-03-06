(function() {
	'use strict';
	angular
		.module('app')
		.config(config);

	config.$inject = ['$routeProvider'];

	function config($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl : 'view/home.html'
			})
			.when('/movies/:page', {
				templateUrl : 'view/movies.html'
			})
			.when('/movieinfo/:id', {
				templateUrl : 'view/movie-info.html'
			})
			.when('/myprofile', {
				templateUrl : 'view/my-profile.html'
			})
			.otherwise({redirectTo:'/'});
	}
})();