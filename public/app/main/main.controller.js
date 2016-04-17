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

        $scope.main.times = {};

        var socket = null;

        // Check authentication
        authService.user(function(resp) {
            $scope.main.login = resp.username || false;

            if ($scope.main.login) {
                // do stuff if logged in
                getChildren();

                // Connect to socket if logged in
                socket = io();

                // Refresh time on msg recieve
                socket.on('timeUpdate', function(msg) {
                    getTimes(msg.child);
                });

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
                $scope.main.children = resp;

                for (i in resp) {
                    // Populate selection controls
                    $scope.main.timeform.delta.selected.push('15');
                    $scope.main.timeform.message.push('');

                    // Get latest time and history
                    getTimes(resp[i]['username']);

                }
            });
        }

        // Get remaining time and change history
        function getTimes(child) {
            mainService.getTimes({
                child: child
            }).then(function(resp) {
                // Add datetime
                resp.events = resp.events.map(function(d) {
                    d.datetime = toolsService.getMongoDateTime(d['_id']);
                    return d;
                });

                $scope.main.times[child] = resp.events;
                
                var childIndex = toolsService.indexOfObject($scope.main.children, 'username', child)
                $scope.main.children[childIndex]['time_rem'] = resp.remaining['time_rem'];

            });
        }
   

        // Update time
        $scope.main.timeform.update = function(child, index) {
            var event = {
                parent: $scope.main.login,
                child: child,
                change: $scope.main.timeform.delta.selected[index],
                message: $scope.main.timeform.message[index]
            }
            mainService.addEvent(event).then(function(resp) {
                // Broadcast message to refresh
                socket.emit('timeUpdate', event);
            });
        }

    }
]);
