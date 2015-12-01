var router = require('express').Router();
var request = require('superagent');
var config = require('../../../config');
var url = config.get('apis.karl.emailAlert');
var account = config.get('apps.karl');

console.log('apis: ', config.get('apis'));
console.log('url: ', url);
console.log('account: ', account);

router.post('/', function (req, res) {
	console.log('creds: ', req.body);
	var from = req.user.email;
	var to = req.body.recepient;
	var message = req.body.message;
	var email = {recipient: to, message: message, subject: 'You have a new message from ' + from };
  console.log('seding email to karl ' + url + ' with account: ', JSON.stringify(account));

	request.post(url)
		.auth(account.user, account.password)
		.set('Content-Type','application/json')
		.accept('application/json')
		.send(email)
		.end(function(){
			res.sendStatus(200);
		});
});

module.exports = router;
