//网络状态更新监听器
let onNetworkStatusListener = null;

/**
 * 网络状态被改变
 * @param {{type:String}} res
 */
function callbackNetworkStatusListener(res) {
	onNetworkStatusListener && onNetworkStatusListener.call(null, res);
}

window.addEventListener('online', callbackNetworkStatusListener);
window.addEventListener('offline', callbackNetworkStatusListener);

export default {

	/**
	 * 获取当前系统信息
	 * @returns {{appName: string, appVersion: string, platform: string, mimeTypes: MimeTypeArray,
	 * language: string, languages: string[], width: number, height: number, colorDepth: number,
	 * deviceXDPI: number, fontSmoothingEnabled: boolean}}
	 */
	getSystemInfo() {
		const userAgents = navigator.userAgent.split(' ');
		const app = userAgents[userAgents.length - 1].split('/'),
			appName = app.length === 2 ? app[0] : navigator.appCodeName,
			appVersion = app.length === 2 ? app[1] : '0.0.0';

		return {
			appName: appName,
			appVersion: appVersion,
			platform: navigator.platform,
			mimeTypes: navigator.mimeTypes,
			language: navigator.language,
			languages: navigator.languages,
			width: window.screen.width,
			height: window.screen.height,
			colorDepth: window.screen.colorDepth,
			deviceXDPI: window.screen.deviceXDPI,
			fontSmoothingEnabled: window.screen.fontSmoothingEnabled,
		};
	},

	/**
	 * 获取网络类型
	 * @returns {string}
	 */
	getNetworkType() {
		return "unknown";
	},

	/**
	 * 获取网络状态
	 * @returns {string}
	 */
	getNetworkStatus() {
		return navigator.onLine ? "online" : "offline";
	},

	/**
	 * 当前网络状态是否在线
	 * @returns {boolean}
	 */
	isNetworkOnline() {
		return navigator.onLine;
	},

	/**
	 * 当前网络状态是否下线
	 * @returns {boolean}
	 */
	isNetworkOffline() {
		return !navigator.onLine;
	},


	/**
	 * 设置网络状态监听
	 * @param {Function<{type:String}>} callback
	 */
	setOnNetworkStatusListener(callback) {
		onNetworkStatusListener = callback;
	},


	/**
	 * 获取剪切板数据
	 * @param {{success?: Function, fail?: Function, complete?: Function}} options
	 */
	getClipboardData(options = {}) {
		let result = null;
		try {
			if (window.clipboardData && window.clipboardData.getData) {
				const data = window.clipboardData.getData('Text');
				result = {data: data};
				options.success && options.success.call(null, result);
			} else {
				result = {errMsg: '功能未实现'};
				options.fail && options.fail.call(null, result);
			}
		} catch (err) {
			console.error(err);
		}
		options.complete && options.complete(result);
	},

	/**
	 * 设置剪切板数据
	 * @param {{data:String,success?: Function, fail?: Function, complete?: Function}} options
	 */
	setClipboardData(options) {
		let result = null;
		try {
			if (window.clipboardData && window.clipboardData.setData) {
				if (window.clipboardData.setData('Text', options.data)) {
					result = {data: options.data};
					options.success && options.success.call(null, result);
				} else {
					result = {errMsg: '设置失败'};
					options.fail && options.fail.call(null, result);
				}
			} else {
				result = {errMsg: '功能未实现'};
				options.fail && options.fail.call(null, result);
			}
		} catch (err) {
			console.error(err);
		}
		options.complete && options.complete(result);
	},

	/**
	 * 清空剪切板
	 * @return {boolean}
	 */
	clearClipboardData() {
		if (window.clipboardData && window.clipboardData.clearData)
			return window.clipboardData.clearData('Text');
		return false;
	},

	/**
	 * 设置导航标题
	 * @param {String} title
	 */
	setNavigateTitle(title) {
		window.document.title = title;
	},

	/**
	 * 获取当前窗口
	 */
	getCurrentWindow() {
		const defaultWindow = {
			webContents: {
				isDevToolsOpened: () => false
			}
		};
		return window.require ? window.require('electron').remote.getCurrentWindow() : defaultWindow;
	},
}
