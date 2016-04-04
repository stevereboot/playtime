// routes/api/main/update.js

var Event = require('../../../models/event');
var passport = require('passport');

module.exports = function(req, res) {
	console.log(req.body)
	return;

	Event.create({
		parent_id: req.body.parent_id,
		child_id: req.body.child_id,
		change: req.body.change,
		message: req.body.message,
		remaining: 90
	}, function(err, data) {
		if (err) {
			res.send(err);
		}
		res.json(data)
	});
}