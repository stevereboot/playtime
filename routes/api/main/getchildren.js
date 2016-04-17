// routes/api/main/getchildren.js

var Account = require('../../../models/account');

module.exports = function(req, res) {
	Account.find({'parent': req.params.parent}, {
		username: 1, 
		time_rem: 1
	}, function(err, data) {
		if (err) {
			res.sendStatus(404);
		}
		res.json(data);
	});
};