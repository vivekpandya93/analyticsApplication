'use strict';

var path = require('path');
var JWS = require('jws');
var express = require('express');
var httpLogger = require('morgan');
var app = express();
var config = require('../config');
var _ = require('lodash');

app.use(httpLogger('combined', { skip: function(req) {
  return _.contains(req.url, config.get('routes.healthCheck'));
}}));

app.use('/rev.txt', express.static('./public/rev.txt'));

app.get(config.get('routes.healthCheck'), function(req, res) {
  res.end('OK');
});

require('./configure')(app);

function getUserByFrontier(req, res, next) {
  var jws = req.cookies['_nmid_secure'] || null;
  var token = (jws) ? JWS.decode(jws) : null;
  req.user = (token) ? token.payload : { email: null, roles: []};

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

