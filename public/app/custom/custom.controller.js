// public/app/custom/custom.controller.js

var custom = angular.module('custom.controller', []);

custom.controller('custom', 
	[
		'$scope',
		'$http',
		'customService',
		'toolsService',
	function(
		$scope,
		$http,
		customService,
		toolsService
	) {
		$scope.custom = {};

		$scope.custom.refreshing = false;

		// Dropzone
		var clearDropzone = function() {
			$scope.custom.dropzone = {
				fileName: '',
				fileSize: '',
				fileCsv: '',
				fileList: '',
				fileJson: ''
			}
		}

		clearDropzone();

		// Watch for changes to dropzone
		$scope.$watch('custom.dropzone.fileCsv', function(newValue, oldValue) {
			if ($scope.custom.dropzone.fileCsv) {
				$scope.custom.data = $scope.custom.dropzone.fileList;
			}
		});

		$scope.custom.paste = function() {
			var raw = $scope.custom.pasted;
			var data = toolsService.importExcelString(raw);
			$scope.custom.data = data;
		}

		$scope.custom.delete = function(index) {
			$scope.custom.data.splice(index, 1);
		}

		$scope.custom.run = function() {
			if (!$scope.custom.data) return;

			// Unwind list of list
			var nested = $scope.custom.data;
			var deals = [];
			for (var i=0; i<nested.length; ++i) {
			    var current = nested[i];
			    for (var j=0; j<current.length; ++j)
			        deals.push(current[j]);
			}
			console.log('running...');
			$scope.custom.refreshing = !$scope.custom.refreshing;

			customService.getData(deals).then(function(resp) {
				$scope.custom.liqLoans = JSON.parse(resp);
				
				$scope.custom.refreshing = !$scope.custom.refreshing;
			});
		}

		$scope.custom.export = function() {
			if (!$scope.custom.liqLoans) return;

			$scope.custom.csv = toolsService.ARRAY2CSV(
				$scope.custom.liqLoans.fields.map(function(i) {
					return i.label;
				}),
				$scope.custom.liqLoans.loans
			);
		}
		

	}
]);
