// routes/api/main/index.js

var router = require('express').Router();

router.get('/getchildren/:parent', require('./getchildren.js'));
router.get('/gettimes/:child', require('./gettimes.js'));
router.post('/update', require('./update.js'));

module.exports = router;