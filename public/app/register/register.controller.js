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

        $scope.register.registerFlag = false;
        $scope.register.toggleRegister = function() {
            $scope.register.registerFlag = !$scope.register.registerFlag;
        }

        $scope.register.login = function() {      
            // Simple validation
            if (!$scope.register.loginForm) return;

            if (!$scope.register.loginForm.password ||
                $scope.register.loginForm.password.length < 1) return;

            authService.login($scope.register.loginForm, function(resp) {
                if (resp) {
                    console.log(resp + ' has been logged in');
                    $state.reload();
                } else {
                    console.log('Invalid username or password');
                    $scope.register.message = 'Invalid username or password';
                }
            });    
        }

        $scope.register.create = function() {
            // Simple validation
            if (!$scope.register.createForm) return;

            if (!$scope.register.createForm.password ||
                $scope.register.createForm.password.length < 1) return;

            if ($scope.register.createForm.password != 
                    $scope.register.createForm.passwordConfirm) {
                console.log('Passwords do not match');
                return;
            }

            $scope.register.createForm.type = 'parent';
            $scope.register.createForm.loginAfter = true;

            authService.create($scope.register.createForm, function(resp) {
                if (resp) {
                    if (resp.error) {
                        console.log(resp.error.message);
                    } else {
                        console.log(resp + ' has been registered');
                        $state.reload();
                    }
                }
            });
        }


    }
]);
