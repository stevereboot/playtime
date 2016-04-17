// routes/api/main/gettimes.js

var Event = require('../../../models/event');
var Account = require('../../../models/account');

module.exports = function(req, res) {
	var response = {};

	// Get events
	Event.find({'child': req.params.child}, {
		change: 1,
		message: 1
	}, function(err, data) {
		if (err) {
			res.sendStatus(404);
		}

		response.events = data;

		// Get remaining time
		Account.findOne(
			{ username: req.params.child },
			{ time_rem: 1 },
			function(err, data) {
				if (err) {
					console.log(err);
				}
				response.remaining = data;

				res.json(response);
			}
		);

	});
};