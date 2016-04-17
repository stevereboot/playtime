// public/app/shared/tools.service.js

var tools = angular.module('toolsService', []);

tools.service('toolsService', [
	function() {
		this.defaultName = function(prefix) {
			var prefix = typeof prefix !== 'undefined' ?  prefix : '';

			var d = new Date();
			return prefix + [d.getFullYear(), ("0" + d.getMonth()+1).slice(-2), ("0" + d.getDate()).slice(-2),
				'-', ("0" + d.getHours()).slice(-2), ("0" + d.getMinutes()).slice(-2), ("0" + d.getSeconds()).slice(-2)].join('');
		}

		// Get datetime from mongo _id
		this.getMongoDateTime = function(objectID, returnType) {
			if (!objectID) return null;
			var returnType = typeof returnType !== 'undefined' ?  returnType : 'string';


			var timestamp = parseInt(objectID.substr(0, 8), 16) * 1000;
			var date = new Date(timestamp);

			var dateS = date.toLocaleTimeString("en-us", {
				year: "numeric", 
				month: "short",
				day: "numeric", 
				hour: "2-digit", 
				minute: "2-digit"
			});

			if (returnType == 'string') {
				return dateS;
			} else {
				return date;
			}
		};

		this.indexOfObject = function(arr, key, valueToFind) {
			for(var i = 0, len = arr.length; i < len; i++) {
				if (arr[i][key] === valueToFind) return i;
			}
			return -1;
		}

		this.ARRAY2CSV = function(header, body) {
			var str = '';

			// Header
			var line = '';

			for (var i in header) {
				var val = header[i] + "";
				line += '"' + val.replace(/"/g, '""') + '",';
			}
			// Remove trailing comma
			line = line.slice(0, -1);
			// Add line break
			str += line + '\r\n';

			// Body
			for (var i in body) {
				line = '';
				for (var j in body[i]) {
					val = body[i][j] + "";
					line = line += '"' + val.replace(/"/g, '""') + '",'
				}
				line = line.slice(0, -1);
				str += line + '\r\n';
			}

			// FIX THIS

			return str;
		}

		this.JSON2CSV = function(objArray, labels, quotes) {
			var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
			
			var labels = typeof labels !== 'undefined' ?  labels : true;
			var quotes = typeof quotes !== 'undefined' ?  quotes : true;

			var str = '';
			var line = '';

			if (labels) {
				var head = array[0];
				if (quotes) {
					for (var index in array[0]) {
						var value = index + "";
						line += '"' + value.replace(/"/g, '""') + '",';
					}
				} else {
					for (var index in array[0]) {
						line += index + ',';
					}
				}

				line = line.slice(0, -1);
				str += line + '\r\n';
			}

			for (var i = 0; i < array.length; i++) {
				var line = '';

				if (quotes) {
					for (var index in array[i]) {
						var value = array[i][index] + "";
						line += '"' + value.replace(/"/g, '""') + '",';
					}
				} else {
					for (var index in array[i]) {
						line += array[i][index] + ',';
					}
				}

				line = line.slice(0, -1);
				str += line + '\r\n';
			}
			return str;
		}

		this.CSVToArray = function(strData, strDelimiter) {
		    strDelimiter = (strDelimiter || ",");

		    var objPattern = new RegExp((
		    "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
		    "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
		    "([^\"\\" + strDelimiter + "\\r\\n]*))"), "gi");

		    var arrData = [[]];

		    var arrMatches = null;
		    while (arrMatches = objPattern.exec(strData)) {
		        var strMatchedDelimiter = arrMatches[1];

		        if (strMatchedDelimiter.length && (strMatchedDelimiter != strDelimiter)) {
		            arrData.push([]);
		        }

		        if (arrMatches[2]) {
		            var strMatchedValue = arrMatches[2].replace(
		            new RegExp("\"\"", "g"), "\"");
		        } else {
		            var strMatchedValue = arrMatches[3];
		        }

		        arrData[arrData.length - 1].push(strMatchedValue);
		    }
		    return (arrData);
		}		

		this.importExcelString = function(raw) {
			if (!raw) {
				return;
			}
			
			var data = [];

			var rows = raw.split('\n');

			for (var i in rows) {
				var r = [];
				var cells = rows[i].split('\t');

				for (var j in cells) {
					r.push(cells[j]);
				}

				data.push(r);
			}

			return data;
		}
	}
]);
