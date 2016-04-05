// routes/api/main/update.js

var Event = require('../../../models/event');
var passport = require('passport');

module.exports = function(req, res) {

	console.log(req.body)
	// Calc remaining time
	Event.aggregate([
		{
			$match: {
				child: req.body.child
			}
		},
		{
			$group: {
				_id: '$child',
				time_rem: {$sum: '$change'}
			}
		}
	], function(err, data) {
		if (err) {
			console.log(err);
		}
		console.log(data);
	});

	Event.create({
		parent: req.body.parent,
		child: req.body.child,
		change: req.body.change,
		message: req.body.message
	}, function(err, data) {
		if (err) {
			res.send(err);
		}
		res.json(data)
	});
}