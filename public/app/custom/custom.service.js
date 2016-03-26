// public/app/custom/custom.service.js

var customSvc = angular.module('custom.service', []);

customSvc.service('customService', ['$http', 'pyService', 'toolsService',
	function($http, pyService, toolsService) {
		this.getData = function(deals) {
			return pyService.getPyData('get_liq_loans_btm_sev.py', deals);
		}


	}
]);

// Formatting filter for ng-repeats
var customFilter = angular.module('custom.filter', []);

customFilter.filter('picker', ['$interpolate',
	function($interpolate) {
		return function() {
			if (arguments[1] == 'text') {
				return arguments[0];
			} else {
				var result = $interpolate('{{value | ' + arguments[1] + '}}');
				return result({value: arguments[0]});
			}
		};
	}
]);