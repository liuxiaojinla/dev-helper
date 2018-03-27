import router from '../router';

export default {
	/**
	 * 保留当前页面，跳转到应用内的某个页面
	 * @param {{url:String,success?:Function,fail?:Function,complete?:Function}} options
	 */
	navigateTo(options) {
		router.push(options.url, res => {
			try {
				options.success && options.success.call(null, res);
			} catch (err) {
				console.log(err);
			}
			options.complete && options.complete.call(null, res);
		}, err => {
			try {
				options.success && options.success.call(null, err);
			} catch (err) {
				console.log(err);
			}
			options.complete && options.complete.call(null, err);
		});
	},

	/**
	 * 关闭当前页面，跳转到应用内的某个页面
	 * @param {{url:String,success?:Function,fail?:Function,complete?:Function}} options
	 */
	redirectTo(options) {
		router.replace(options.url, res => {
			try {
				options.success && options.success.call(null, res);
			} catch (err) {
				console.log(err);
			}
			options.complete && options.complete.call(null, res);
		}, err => {
			try {
				options.success && options.success.call(null, err);
			} catch (err) {
				console.log(err);
			}
			options.complete && options.complete.call(null, err);
		});
	},

	/**
	 * 关闭所有页面，跳转到应用内的某个页面
	 * @param {{url:String,success?:Function,fail?:Function,complete?:Function}} options
	 */
	reLaunch(options) {
		this.navigateBack(router.getMatchedComponents().length);
		this.redirectTo(options);
	},

	/**
	 * 关闭当前页面，返回上一页面或多级页面
	 * @param {Number} delta
	 */
	navigateBack(delta = 1) {
		router.go(-delta);
	},

	/**
	 * 向前上一页面或多级页面
	 * @param {Number} delta
	 */
	navigateForward(delta = 1) {
		router.go(delta);
	},
}