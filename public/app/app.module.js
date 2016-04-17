// public/app/app.module.js

var thirdPartyApps = [
    'ui.router',
    'angular-svg-round-progressbar'
]

var sharedApps = [
    'dropzoneDirective',
    'toolsService',
    'authService',
    'filters'
]

var componentApps = [
    'appStates',
    'error.controller',
    'nav.controller',
    'main.controller',
    'main.service',
    'add.controller',
    'add.service',
    'register.controller'
]

// Define App Module
var app = angular.module('appModule', [].concat(thirdPartyApps, sharedApps, componentApps));

// Run on app startup
// app.run([function() {

// }]);
