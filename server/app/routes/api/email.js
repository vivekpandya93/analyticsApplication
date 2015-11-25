var router = require('express').Router();
var request = require('superagent');
var config = require('../../../config');

router.post('/', function (req, res) {
	var from = req.user.email;
	var to = req.body.recepient;
	var message = req.body.message;
	var email = {recipient: to, message: message, subject: 'You have a new message from ' + from };

	request.post(config.get('apis.karl.emailAllert)'))
		.auth(config.get('apps.karl.user'), config.get('apps.karl.password'))
		.set('Content-Type','application/json')
		.accept('application/json')
		.send(email)
		.end(function(){
			res.sendStatus(200);
		});
});

module.exports = router;
