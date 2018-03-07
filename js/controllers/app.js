(function() {
	'use strict';

	angular
		.module('app')
		.controller('AppController', appController);

	appController.$inject = ['$scope','FilMovies', '$location', '$localStorage'];

	function appController($scope, FilMovies, $location, $localStorage) {
		var self = this;

		$scope.currentUser = $localStorage.user;

		$scope.activePageClasses = ['active', '', '', '', '', '', '', '', '', '', '', '','', '', '', '', ''];

		//get categories from API
		$scope.categories = [];
		FilMovies.getAllCategories().then(function(data) { 
			$scope.categories = data;
		}, function(){}); 

		$scope.changeActivePageClass = function(item) {
			$scope.activePageClasses = ['', '', '', '', '', '', '', '', '', '', '', '','', '', '', '', ''];
			$scope.activePageClasses[item] = 'active';
		}

		$scope.$watch('search', function() {
			$scope.activePageClasses = ['active', '', '', '', '', '', '', '', '', '', '', '','', '', '', '', ''];
			if($scope.search != "")
	        	$location.path("movies/search-" + $scope.search);
	        else {
	        	$scope.redirectToHome();
	        }
	    });

	    $scope.redirectToHome = function() {
	    	$scope.activePageClasses = ['active', '', '', '', '', '', '', '', '', '', '', '','', '', '', '', ''];
	    	$location.path("#/");
	    }

		$scope.redirectToLogin = function() {
	    	$scope.activePageClasses = ['active', '', '', '', '', '', '', '', '', '', '', '','', '', '', '', ''];
	    	console.log('vai logar ow 2');
	    	$location.path("/login/");
	    }

	    $scope.logout = function() {
			//remove as variaveis de sessao
			$scope.currentUser = null;
			$localStorage.user = null;

			//retorna para a home page
			$scope.redirectToHome();
		}

		$scope.calculateStars = function(rate) {
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
	}
})();