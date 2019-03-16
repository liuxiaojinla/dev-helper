const fs = require('fs');
const path = require('path');

/**
 * 创建文件夹
 * @param {string} dirname
 * @return {boolean}
 */
function mkdirsSync(dirname) {
	if (fs.existsSync(dirname)) return true;

	if (mkdirsSync(path.dirname(dirname))) {
		fs.mkdirSync(dirname);
		return true;
	}
}

/**
 * 写入文件
 * @param {string} filepath
 * @param {*} data
 * @param {*} [options]
 */
function writeFileSync(filepath, data, options) {
	mkdirsSync(path.dirname(filepath));
	return fs.writeFileSync(filepath, data, options);
}

/**
 * 拷贝文件
 * @param {string} src
 * @param {string} dest
 * @param {number} [flags]
 */
function copyFileSync(src, dest, flags) {
	mkdirsSync(path.dirname(dest));
	return fs.copyFileSync(src, dest, flags);
}

/**
 * 格式化时间日期
 * @param {string} fmt
 * @param {Date} [date]
 * @return {*}
 */
function dateFormat(fmt, date) {
	if (!date) date = new Date();
	const o = {
		"M+": date.getMonth() + 1,                 //月份
		"d+": date.getDate(),                    //日
		"h+": date.getHours(),                   //小时
		"m+": date.getMinutes(),                 //分
		"s+": date.getSeconds(),                 //秒
		"q+": Math.floor((date.getMonth() + 3) / 3), //季度
		"S": date.getMilliseconds()             //毫秒
	};
	if (/(y+)/.test(fmt))
		fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (const k in o)
		if (new RegExp("(" + k + ")").test(fmt))
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}

export default {
	mkdirsSync: mkdirsSync,
	writeFileSync: writeFileSync,
	dateFormat: dateFormat,
	copyFileSync: copyFileSync,
};
