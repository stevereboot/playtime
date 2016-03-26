// public/app/main/main.controller.js

var main = angular.module('main.controller', []);

main.controller('main', 
    [
        '$scope',
        'toolsService',
        'authService',
    function(
        $scope,
        toolsService,
        authService
    ) {
        $scope.main = {};

        authService.user(function(resp) {
                $scope.main.login = resp;
                console.log($scope.main.login)
        });


    }
]);
