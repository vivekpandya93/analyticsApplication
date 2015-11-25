var router = require('express').Router();
var request = require('superagent')
var nodemailer = require('nodemailer')

router.post('/', function (req, res, next) {
	var from = req.user.email;
	var to = req.body.recepient;
	var message = req.body.message;

	console.log("req.user:", req.user.email)
	console.log("email body:", req.body)
	request
				.post('https://api.namstg.com:443/karl/email/ops_alerts')
				.auth('tech_user', 'tech1234')
				.set('Content-Type','application/json')
				.accept('application/json')
				.send({recipient:to,message:message,subject:"You have a new message from "+from})
				.end(function(){
					res.sendStatus(200)
				})
});

module.exports = router;

// /* 
// curl -v --user tech_user:tech1234 
// 'https://api.namstg.com:443/karl/email/ops_alerts' 
//  -H 'Content-Type: application/json' 
//  -H 'HTTP_ACCEPT: application/json' 
//  --data-binary 
//  '{"recipient":"shidhin.cr@namshi.com", 
//  "message":"this is awesome","subject":"yeaaa"}' 
//  --compressed


// */