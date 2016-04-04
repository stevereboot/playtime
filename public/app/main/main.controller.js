// public/app/main/main.controller.js

var main = angular.module('main.controller', []);

main.controller('main', 
    [
        '$scope',
        'mainService',
        'toolsService',
        'authService',
    function(
        $scope,
        mainService,
        toolsService,
        authService
    ) {
        $scope.main = {};

        // Check authentication
        authService.user(function(resp) {
            $scope.main.login = resp.username || false;

            if ($scope.main.login) {
                // do stuff if logged in
                getChildren();

                // Connect to socket if logged in
                var socket = io();

            }

        });

        // Get list of children
        function getChildren() {
            mainService.getChildren({
                parent: $scope.main.login
            }).then(function(resp) {
                console.log(resp);
                $scope.main.children = resp;

            });
        }






        // Time update form
        $scope.main.timeform = {};

        $scope.main.timeform.delta = {
            selected: '15',
            choices: ['Add 15', 'Add 30', 'Sub 15', 'Sub 30'],
            data: [15, 30, -15, -30]
        }


        $scope.main.timeform.update = function() {
            // Update server
            mainService.addEvent({
                parent_id: $scope.main.login,
                child_id: 'foo',
                change: $scope.main.timeform.delta.selected,
                message: $scope.main.timeform.message
            }).then(function(resp) {
                console.log(resp);


            });
            console.log($scope.main.id)
            console.log($scope.main.timeform.delta.selected)
            console.log($scope.main.timeform.message)
        } 



    }
]);
