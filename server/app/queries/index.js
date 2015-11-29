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
		var opts = [
			!!formData.category,
			!!formData.gender,
			!!formData.specificCat
		];

		queryAsString = this.get(name, opts);
		return queryAsString;
		else {
			console.log("gender", formData.gender)
			gender = false 
		}
		if(formData.category) category = true 


		console.log("opts", opts)
		console.log("FORMDATA:", formData)
	}
};
