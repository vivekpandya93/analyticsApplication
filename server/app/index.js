'use strict';
var path = require('path');
var JWS = require('jws');
var express = require('express');
var app = express();
// Pass our express application pipeline into the configuration
// function located at server/app/configure/index.js

app.use('/rev.txt', express.static('./public/rev.txt'));
require('./configure')(app);

function getUserByFrontier(req, res, next) {
  var jws = req.cookies['_nmid_secure'] || null;
  var token = (jws) ? JWS.decode(jws) : null;
  req.user = (token) ? token.payload : { email: null, roles: []};
  // req.user = {
  //   email: "luciano.colosio@namshi.com",
  //     roles: [
  //      "user",
  //      "admin"
  //     ],
  //     stuff: "",
  //     other_data: {
  //      123: true
  //     },
  //     secure: "",
  //     new_stuff: "fafasdfasfd",
  //     hash: "",
  //     notes: "",
  //     bob: "admin",
  //     expiry: "",
  //     deploy: "zeus, qc",
  //     exp: 1447369713,
  //     iat: 1447326513
  //   };

  next();
}

app.use(getUserByFrontier);

// app.use('/', require)
// Routes that will be accessed via AJAX should be prepended with
// /api so they are isolated from our GET /* wildcard.
app.use('/api', require('./routes'));


app.use(function (req, res, next) {

    if (path.extname(req.path).length > 0) {
        res.status(404).end();
    } else {
        next(null);
    }

});

app.get('/*', function (req, res) {
    res.sendFile(app.get('indexHTMLPath'));
});

// Error catching endware.
app.use(function (err, req, res, next) {
    console.error(err, typeof next);
    res.status(err.status || 500).send(err.message || 'Internal server error.');
});

module.exports = app;

