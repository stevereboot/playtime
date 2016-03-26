// public/app/shared/py.service.js

var PythonShell = require("python-shell");

var py = angular.module('pyService', []);

py.service('pyService', ['$q',
	function($q) {
		this.getPyData = function(script, args) {
			return $q(function(resolve, reject) {
				PythonShell.run(
					script,
					{
						mode: 'text',
						pythonPath: '../../bin/python/python.exe',
						scriptPath: './python',
						args: [JSON.stringify(args)]
					},
					function(err, results) {
						if (err) {
							console.log(err);
						}

						resolve(results);
					}
				);
			});
		}
	}
]);
