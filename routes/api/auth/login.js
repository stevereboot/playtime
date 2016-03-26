// routes/api/auth/login.js

var passport = require('passport');

module.exports = function(req, res) {
	passport.authenticate('local')(req, res, function() {
		res.send(req.user.username);
	});
}