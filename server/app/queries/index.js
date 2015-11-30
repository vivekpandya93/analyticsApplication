var tpl = require('../tpl.js');
var path = require('path');
var queryAsString = '';
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
    queryAsString = this.get(name, formData);

    console.log('query:: getRightQueryString opts --> ', formData);
    console.log('query:: getRightQueryString queryAsString --> ', queryAsString);

		return queryAsString;
	}
};
