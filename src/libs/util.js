export default {

	/**
	 * 唯一生成器
	 * @param {string} [prefix]
	 * @return {Function}
	 */
	uniqueIdor(prefix) {
		let index = 0;
		return function() {
			index++;
			return prefix + (new Date().getTime()).toString() + index.toString();
		};
	}
};
