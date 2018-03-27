class DomQuery {
	/**
	 * 构造器
	 * @param {HTMLElement} el
	 */
	constructor(el) {
		if (el instanceof DomQuery) el = el.el;
		this.el = el;
	}

	/**
	 * 查询首个匹配的元素
	 * @param {string} selector
	 * @return {DomQuery}
	 */
	query(selector) {
		const el = this.el.querySelector(selector);
		if (!el) return null;
		return new DomQuery(el);
	}

	/**
	 * 查询所有匹配的元素
	 * @param {string} selector
	 * @return {Array<DomQuery>}
	 */
	queryAll(selector) {
		return this.el.querySelectorAll(selector).map(el => new DomQuery(el));
	}

	/**
	 * 获取元素位置
	 * @return {{offsetX: *, offsetY: *, pageX: *, pageY: *}}
	 */
	getLocation() {
		return {
			offsetX: this.offsetX,
			offsetY: this.offsetY,
			pageX: this.pageX,
			pageY: this.pageY,
		};
	}
}

let instance = null;

/**
 * 获取默认查询器实例
 * @return {DomQuery}
 */
function getDefaultInstance() {
	if (!instance) instance = new DomQuery(document);
	return instance;
}

export default {

	/**
	 * 创建DOM查询实例
	 * @param {HTMLElement} el
	 * @return {DomQuery}
	 */
	createDomQuery(el) {
		return new DomQuery(el);
	},

	/**
	 * 使用默认查询器查询首个匹配的元素
	 * @param {string} selector
	 * @return {DomQuery}
	 */
	domQuery(selector) {
		return getDefaultInstance().query(selector);
	},

	/**
	 * 使用默认查询器查询所有匹配的元素
	 * @param {string} selector
	 * @return {DomQuery}
	 */
	domQueryAll(selector) {
		return getDefaultInstance().queryAll(selector);
	},
}