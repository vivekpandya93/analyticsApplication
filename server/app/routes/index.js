'use strict';
var router = require('express').Router();

router.use('/brands', require('./api/brands'));
router.use('/email', require('./api/email'));

router.get('/', function(req, res) {
	res.send(req.user);
});

router.use(function (req, res) {
    res.status(404).end();
});


module.exports = router;


