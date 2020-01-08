import db from '../db';

const TABLE_NAME = 'file_watch';

let initTable = false;

function init() {
	return new Promise((resolve, reject) => {
		if (initTable) return resolve();

		if (db.existTable(TABLE_NAME)) {
			initTable = true;
			return resolve();
		} else {
			db.createTable(`CREATE TABLE ${TABLE_NAME}(
				ID INT PRIMARY KEY NOT NULL,
				NAME TEXT NOT NULL,
				AGE INT NOT NULL,
				ADDRESS CHAR(50),
				SALARY REAL
			);`).then(function() {
				initTable = true;
				resolve();
			}, reject);
		}
	});
}

export default {
	add() {
	},
};
