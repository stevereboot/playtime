// public/app/add/add.controller.js

var add = angular.module('add.controller', []);

add.controller('add', 
    [
        '$scope',
        '$state',
        'addService',
        'authService',
    function(
        $scope,
        $state,
        addService,
        authService
    ) {

        $scope.add = {};

        authService.user(function(resp) {
            $scope.add.login = resp.username || false;
            $scope.add.id = resp.id;
        });

        // Child account
        $scope.add.create = function() {
            // Simple validation
            if (!$scope.add.createForm) return;

            if (!$scope.add.createForm.password ||
                $scope.add.createForm.password.length < 1) return;

            if ($scope.add.createForm.password != 
                    $scope.add.createForm.passwordConfirm) {
                console.log('Passwords do not match');
                return;
            }

            $scope.add.createForm.type = 'child';
            $scope.add.createForm.parent = $scope.add.login;

            authService.create($scope.add.createForm, function(resp) {
                if (resp) {
                    if (resp.error) {
                        console.log(resp.error.message);
                    } else {
                        console.log(resp + ' has been created');
                        $state.reload();
                    }
                }
            });
        }




    }
]);
