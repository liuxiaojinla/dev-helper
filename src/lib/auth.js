export default {
	/**
	 * 是否登录
	 * @return {Boolean}
	 */
	isLogin() {
	},

	/**
	 * 登录
	 * @param {{to,form,next:Function}} options
	 */
	login(options = {}) {
		next({
			path: '/login',
			query: {redirect: to.fullPath}
		})
	},

	/**
	 * 登出
	 */
	logout() {
	},

};