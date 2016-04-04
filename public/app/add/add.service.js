// public/app/add/add.service.js

var addSvc = angular.module('add.service', []);

addSvc.service('addService', ['$http',
	function($http) {
		this.updateTime = function(input, callback) {
			$http.post('/api/main/update', input).then(function(data) {
				callback(data.data);
			});
		}
	}
]);
