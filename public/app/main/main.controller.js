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

        // Time update form
        $scope.main.timeform = {};
        $scope.main.timeform.message = [];

        $scope.main.timeform.delta = {
            selected: [],
            choices: ['Add 15', 'Add 30', 'Sub 15', 'Sub 30'],
            data: [15, 30, -15, -30]
        }

        // Get list of children
        function getChildren() {
            mainService.getChildren({
                parent: $scope.main.login
            }).then(function(resp) {
                console.log(resp);
                $scope.main.children = resp;

                // Populate selected
                for (i in resp) {
                    $scope.main.timeform.delta.selected.push('15');
                    $scope.main.timeform.message.push('');
                }

            });
        }

        // Update time
        $scope.main.timeform.update = function(child, index) {
            mainService.addEvent({
                parent: $scope.main.login,
                child: child,
                change: $scope.main.timeform.delta.selected[index],
                message: $scope.main.timeform.message[index]
            }).then(function(resp) {
                console.log(resp);


            });
        } 



    }
]);
