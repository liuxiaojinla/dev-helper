import Cookies from 'js-cookie';

export default {

	/**
	 * 设置本地存储
	 * @param {String} key
	 * @param {String,Object} value
	 */
	setStorage(key, value) {
		if (window.localStorage) {
			localStorage.setItem(key, value);
			return true;
		}
		return false;
	},

	/**
	 * 获取Cookie值
	 * @param {String} key
	 * @return {*}
	 */
	getStorage(key) {
		if (window.localStorage) {
			return localStorage.getItem(key);
		}
		return false;
	},

	/**
	 * 获取Cookie值
	 * @param {String} key
	 */
	removeStorage(key) {
		if (window.localStorage) {
			localStorage.removeItem(key);
			return true;
		}
		return false;
	},

	/**
	 * 清除本地存储
	 */
	clearStorage() {
		if (window.localStorage) {
			localStorage.clear();
			return true;
		}
		return false;
	},

	/**
	 * 设置Cookie值
	 * @param {String} key
	 * @param {String,Object} value
	 * @param options
	 */
	setCookie(key, value, options = {}) {
		Cookies.set(key, value, options);
	},

	/**
	 * 获取Cookie值
	 * @param {String} key
	 * @param {Boolean} isJsonParse
	 * @return {*}
	 */
	getCookie(key, isJsonParse = false) {
		return Cookies.get(key);
	},

	/**
	 * 删除Cookie
	 * @param {String} key
	 */
	removeCookie(key) {
		Cookies.remove(key);
	}
};