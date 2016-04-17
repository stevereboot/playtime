// public/app/shared/filters.js

var filters = angular.module('filters', []);

filters.filter('picker', ['$interpolate',
	function($interpolate) {
		return function() {
			if (arguments[1] == 'text') {
				return arguments[0];
			} else if (arguments[1].indexOf('percent') > -1) {
				var digits = arguments[1].split(':')[1];
				var result = $interpolate('{{value | ' + 'number: ' + digits + '}}');
				return result({value: arguments[0] * 100});
			} else if (arguments[1] == 'date') {
				var date = new Date(arguments[0]);
				return moment(date).format('MM/DD/YYYY hh:mm a');
			} else {
				var result = $interpolate('{{value | ' + arguments[1] + '}}');
				return result({value: arguments[0]});
			}
		};
	}
]);	

filters.filter('absValue', [
	function() {
		return function(num) {
			return Math.abs(num);
		}
	}
]);