'use strict'

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

module.exports = function (app) {

     app.use(cookieParser());

    // Parse our POST and PUT bodies.
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
};