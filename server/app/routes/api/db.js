var mysql = require('mysql');
var _ = require('lodash');	
// var conn = {};
	

function getConnection() {
	var conn = mysql.createConnection({
  	host     : 'mysql_1',
  	user     : 'root',
  	password : 'root'
	});

	// if (_.isEmpty(conn)) {
	// 	connection.connect();
	// 	conn = connection;
	// }

	return conn;
}

module.exports = {
	query: function(query, args, cb){
		connection = getConnection();

		return connection.query(query, args, cb)
	}
}; 