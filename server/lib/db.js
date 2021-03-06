var mysql = require('mysql');
var config = require('../config');

function getConnection() {
	var conn = mysql.createConnection(config.get('mysql.server'));

	return conn;
}

module.exports = {
	query: function(query, args, cb){
		var connection = getConnection();
		return connection.query(query, args, cb);
	}
};
