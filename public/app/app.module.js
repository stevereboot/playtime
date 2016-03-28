// public/app/app.module.js

var thirdPartyApps = [
    'ui.router',
    'angular-svg-round-progressbar'
]

var sharedApps = [
    'dropzoneDirective',
    'toolsService',
    'authService'
]

var componentApps = [
    'appStates',
    'error.controller',
    'nav.controller',
    'main.controller',
    'main.service',
    'register.controller'
]

// Define App Module
var app = angular.module('appModule', [].concat(thirdPartyApps, sharedApps, componentApps));

// Run on app startup
// app.run([function() {
// }]);
