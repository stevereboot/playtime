// routes/api/main/index.js

var router = require('express').Router();

router.get('/get/:parent', require('./get.js'));
router.post('/update', require('./update.js'));

module.exports = router;