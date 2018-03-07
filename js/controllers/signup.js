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
			Password: "",
			Name: ""
		}
		self.incorrectCredentials = false;
		self.incorrectFieldClasses = ['', '', ''];

		self.signup = function() {
			if(self.validateFields()) {
				let promise = FilMovies.signup(self.user);
				promise.then(function(data) {
					console.log(data);
					self.incorrectCredentials = (data.data.usernameTaken);
					if(!self.incorrectCredentials) {
						$localStorage.user = data.data.user;
						//atualiza a view
						$scope.$parent.$parent.currentUser = $localStorage.user;

						//redireciona para a home
						$scope.$parent.$parent.redirectToHome();
					}
				}, function(){}); 
			}
		}

		self.validateFields = function() {
			var correct = 1;

			if(self.user.Username=="" || self.user.Username==undefined) {
				// console.log('olar')
				self.incorrectFieldClasses[0] = 'ng-dirty';
				correct = 0;
			}	
			if(self.user.Password=="" || self.user.Password==undefined) {
				self.incorrectFieldClasses[1] = 'ng-dirty';
				correct = 0;
			}

			if(self.user.Name=="" || self.user.Name==undefined) {
				self.incorrectFieldClasses[2] = 'ng-dirty';
				correct = 0;
			}

			return correct;			
		}
	}
})();