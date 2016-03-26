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

		$scope.register.create = function() {
			if ($scope.register.createForm) {
					authService.create($scope.register.createForm, function(resp) {
							if (resp) {
                                                            if (resp.error) {
                                                                console.log(resp.error.message)
                                                            }
                                                            console.log(resp + ' has been registered');
                                                            $state.reload();
							}
					});
			}
		}



	}
]);
