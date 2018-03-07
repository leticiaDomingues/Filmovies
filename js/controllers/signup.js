(function() {
	'use strict';

	angular
		.module('app')
		.controller('SignupController', signupController);

	signupController.$inject = ['$scope', 'FilMovies', '$localStorage'];

	function signupController($scope, FilMovies, $localStorage) {
		var self = this;

		//redirect to home if user is already logged-in
		if($localStorage.user)
			$scope.$parent.$parent.redirectToHome();


		self.user = {
			Username: "",
			Password: ""
		}
		self.incorrectCredentials = false;
		self.incorrectFieldClasses = ['', ''];
	}
})();