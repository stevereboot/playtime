// routes/api/auth/create.js

var Account = require('../../../models/account');
var passport = require('passport');

module.exports = function(req, res) {
	Account.register(
		new Account({
			username: req.body.username,
			type: req.body.type,
			parent: req.body.parent,
			time_rem: 0
		}),
		req.body.password,
		function(err, account) {
			if (err) {
				res.send({error: err});
			}

			if (req.body.loginAfter) {
				// Login after creating
				passport.authenticate('local')(req, res, function() {
					console.log(req.user.username + ' is registered and logged in');
					res.send(req.user.username);
				});
			} else {
				res.send(req.body.username);
			}
		}
	)
}