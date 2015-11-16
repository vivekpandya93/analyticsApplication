var tpl = require('../tpl.js');
var path = require('path');
var queryAsString = ''

module.exports = {
  get: function(fileName, options, customDirname) {
    return tpl(path.join(customDirname || __dirname, fileName), options || {});
  },

  getRightQueryString: function(formData, name) {

  if(formData.category && !formData.gender) {
		queryAsString = this.get(name, 
		{
			categoryProvided: true,
			genderProvided: false 
		})
	}
	else if(!formData.category && formData.gender) {
		queryAsString = this.get(name, 
		{
			categoryProvided: false,
			genderProvided: true 
		})
	}
	else if(formData.category && formData.gender) {
		queryAsString = this.get(name, 
		{
			categoryProvided: true,
			genderProvided: true 
		})
	}
	else if (!formData.category && !formData.gender) {
		queryAsString = this.get(name, 
		{
			categoryProvided: false,
			genderProvided: false 
		})
	}
	return queryAsString

}
};