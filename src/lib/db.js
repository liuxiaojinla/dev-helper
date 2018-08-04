const mysql = require('mysql');
let connection = null;

function initConnection() {
	if (!connection) {
		connection = mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: '123456',
			database: 'ftp'
		});
	}
	return connection;
}

export default {
	query: function(sql, callback) {
		initConnection().query(sql, callback);
	}
};