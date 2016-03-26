// public/app/nav/register.controller.js

var register = angular.module('register.controller', []);

register.controller('register', 
	[
		'$scope',
		'$http',
		'$state',
		'authService',
	function(
		$scope,
		$http,
		$state,
		authService
	) {
		$scope.register = {}

		if ($scope.register.create) {
			authService.user($scope.register.create, function(resp) {
				if (resp) {
					console.log(resp + ' has been registered');
					$state.reload();
				}
			});
		}

	}
]);