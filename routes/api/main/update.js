// routes/api/main/update.js

var Event = require('../../../models/event');
var Account = require('../../../models/account');
var passport = require('passport');

module.exports = function(req, res) {
	Event.create({
		parent: req.body.parent,
		child: req.body.child,
		change: req.body.change,
		message: req.body.message
	}, function(err, data) {
		if (err) {
			res.send(err);
		}

		// Update remaining time
		Account.update(
			{ username: req.body.child },
			{ $inc: { time_rem: req.body.change } },
			function(err, data) {
				if (err) {
					console.log(err);
				}
			}
		);
		// Floor time remaining at zero
		Account.update(
			{ username: req.body.child, time_rem: { $lt: 0 } },
			{ $set: { time_rem: 0 } },
			function(err, data) {
				if (err) {
					console.log(err);
				}
			}			
		);

		res.json(true);
		
		// // Calc remaining time
		// Event.aggregate([
		// 	{
		// 		$match: {
		// 			child: req.body.child
		// 		}
		// 	},
		// 	{
		// 		$group: {
		// 			_id: '$child',
		// 			time_rem: {$sum: '$change'}
		// 		}
		// 	}
		// ], function(err, data) {
		// 	if (err) {
		// 		console.log(err);
		// 	}
		// 	res.json(data);
		// });
	});
}