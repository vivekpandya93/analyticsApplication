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
  },

  getRightQueryString: function(formData, name) {
    var queryAsString = this.get(name, formData);
    var logLine = '\n\n---------\nquery:: getRightQueryString queryAsString (' + name + ') (formData: ' + JSON.stringify(formData) + ')--> \n' + queryAsString.replace('\n', ' ');
    fs.appendFileSync('../../queries.log', logLine);
		return queryAsString;
	}
};
