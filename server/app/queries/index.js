var tpl = require('../tpl.js');
var path = require('path');
var queryAsString = ''

module.exports = {
  get: function(fileName, options, customDirname) {
    return tpl(path.join(customDirname || __dirname, fileName), options || {});
  },

  getRightQueryString: function(formData, name) {

	  if(formData.category) department = true 
		else department = false

		if(formData.gender) gender = true 
		else gender = false 

		if(formData.specificCat) category = true 
		else category = false

		var opts = {
			category, 
			gender,
			department
		}
		
		queryAsString = this.get(name, opts)
		return queryAsString

 //  if(formData.category && !formData.gender) {
	// 	queryAsString = this.get(name, 
	// 	{
	// 		department: true,
	// 		gender: false
	// 	})
	// }
	// else if(!formData.category && formData.gender) {
	// 	queryAsString = this.get(name, 
	// 	{
	// 		department: false,
	// 		gender: true 
	// 	})
	// }
	// else if(formData.category && formData.gender) {
	// 	queryAsString = this.get(name, 
	// 	{
	// 		department: true,
	// 		genderProvided: true 
	// 	})
	// }
	// else if (!formData.category && !formData.gender) {
	// 	queryAsString = this.get(name, 
	// 	{
	// 		categoryProvided: false,
	// 		genderProvided: false 
	// 	})
	// }
	// return queryAsString

}
};
