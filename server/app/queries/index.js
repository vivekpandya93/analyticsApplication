var tpl = require('../tpl.js');
var path = require('path');
var config = require('../../config');
var fs = require('fs');

module.exports = {
  getLocales: function(options) {
    options = options || {};
    options.env = config.get('env');
    options.bobDb = config.get('mysql.dbs.bob');
    options.namdexDb = config.get('mysql.dbs.namdex');
    options.cerberus = config.get('mysql.dbs.cerberus')
    return options
  }
};
