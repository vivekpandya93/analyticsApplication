var tpl = require('../tpl.js');
var path = require('path');
var config = require('../../config');

module.exports = {
  get: function(fileName, options, customDirname) {
    options = options || {};
    options.env = config.get('env');
    options.bobDb = config.get('mysql.dbs.bob');
    options.namdexDb = config.get('mysql.dbs.namdex');
    return tpl(path.join(customDirname || __dirname, fileName), options);
  },

  getRightQueryString: function(formData, name) {
    var queryAsString = this.get(name, formData);

    console.log('query:: getRightQueryString queryAsString (' + name + ')--> ', queryAsString.replace('\n', ' '));

		return queryAsString;
	}
};
