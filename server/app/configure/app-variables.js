var path = require('path');
var rootPath = path.join(__dirname, '../../../');
var indexPath = path.join(rootPath, './server/app/views/index.html');

module.exports = function(app) {
	app.setValue('projectRoot', rootPath);
	app.setValue('indexHTMLPath', indexPath);
};
