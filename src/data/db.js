const os = require('os');
const sqlite3 = require('sqlite3').verbose();

const dbFile = os.homedir() + "\\desktop\\main.db";
const DB = new sqlite3.Database(dbFile);
DB.exist = fs.existsSync(dbFile);
if (!DB.exist) {
	console.log("Creating db file!");
	fs.openSync(dbFile, 'w');
}

DB.printErrorInfo = function(err) {
	console.log("Error Message:" + err.message + " ErrorNumber:" + err.code);
};

// 是否序列化完成
function serialize() {
	return new Promise((resolve, reject) => {
		DB.serialize(function(err, res) {

			if (null != err) {
				DB.printErrorInfo(err);
				return reject(err);
			}

			resolve(res);

		});
	});
}

//创建表
function createTable(sql) {
	return serialize().then(function() {
		return new Promise((resolve, reject) => {

			DB.run(sql, function(err, res) {
				if (null != err) {
					DB.printErrorInfo(err);
					return reject(err);
				}

				resolve(res);
			});

		});
	});
}

// 表是否存在
function existTable(table) {
	return new Promise((resolve, reject) => {

		DB.run(`.schema ${table}`, function(err, res) {
			if (null != err) {
				DB.printErrorInfo(err);
				return reject(false);
			}

			resolve(res);
		});

	});
}

// 插入数据
function insertData(sql, objects) {
	return serialize().then(function() {
		const stmt = DB.prepare(sql);
		for (let i = 0; i < objects.length; ++i) {
			stmt.run(objects[i]);
		}
		stmt.finalize();
	});
}

// 查询数据
function queryData(sql) {
	return new Promise((resolve, reject) => {
		DB.all(sql, function(err, rows) {
			if (null != err) {
				DB.printErrorInfo(err);
				return reject(err);
			}

			/// deal query data.
			resolve(rows);
		});
	});
}

// 执行SQL
function executeSql(sql) {
	return new Promise((resolve, reject) => {
		DB.run(sql, function(err, res) {
			if (null != err) {
				DB.printErrorInfo(err);
				return reject(err);
			}

			resolve(res);
		});
	});
}

// 关闭数据库
function close() {
	DB.close();
}

export default {
	serialize: serialize,
	createTable: createTable,
	existTable: existTable,
	insertData: insertData,
	queryData: queryData,
	executeSql: executeSql,
	close: close,
};
