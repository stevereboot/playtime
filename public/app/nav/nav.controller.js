// public/app/nav/nav.controller.js

var nav = angular.module('nav.controller', []);

nav.controller('nav', 
	[
		'$scope',
		'$http',
		'$location',
		'$state',
		'authService',
	function(
		$scope,
		$http,
		$location,
		$state,
		authService
	) {
		$scope.nav = {}

		$scope.nav.isActive = function (viewLocation) {
			return viewLocation === $location.path();
		};

		authService.user(function(resp) {
			$scope.nav.login = resp;
			console.log($scope.nav.login)
		});

		$scope.nav.logout = function(resp) {
			authService.logout(function(resp) {
				console.log('logged out');
				$state.reload();
			});
		}

	}
]);