// routes/api/auth/get.js

module.exports = function(req, res) {
	if (req.user) {
		res.send(req.user.username);
	} else {
		res.send(false);
	}
}