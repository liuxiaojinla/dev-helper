import axios from 'axios';
import Qs from 'qs';
import view from './view';

/**
 * 执行完成操作
 * @param options
 * @param res
 */
function execCompleteFunc(options, res) {
	try {
		options.complete && options.complete.call(options.thisArg, res);
	} catch (err) {
		console.error(err);
	}
	if (options.isShowLoading) view.hideLoading();
}

/**
 * 执行错误操作
 * @param options
 * @param error
 * @param msg
 */
function responseFailFunc(options, error, msg) {
	try {
		console.error(`{url:${options.url}}请求失败`, error);
		const flag = options.error ? options.error.call(options.thisArg, error) : true;
		if (flag !== false) {
			if (error.message) {
				view.showToast({icon: 'error', content: error.message || '请求服务器失败，稍后再试~', duration: 3});
			} else {
				view.showToast({icon: 'error', content: '请求服务器失败，稍后再试~', duration: 3});
			}
		}
	} catch (err) {
		console.error(err);
	}
	execCompleteFunc(options, error);
}

/**
 * 执行成功操作
 * @param options
 * @param response
 */
function execSuccessFunc(options, response) {
	try {
		options.success && options.success.call(options.thisArg, response.data || response.result, response);
	} catch (err) {
		console.error(err);
	}
	execCompleteFunc(options, response.data);
}

let requestInstance = null;

/**
 * 获取默认实例
 * @return {AxiosInstance}
 */
function getRequestInstance() {
	if (requestInstance == null)
		requestInstance = init();
	return requestInstance;
}

/**
 * 初始化默认配置
 * @param {Object} options
 * @return {AxiosInstance}
 */
function init(options = {}) {
	return axios.create(Object.assign({
		responseType: 'json',
		withCredentials: true,
		timeout: 30000,
		paramsSerializer: function (params) {
			return Qs.stringify(params, {arrayFormat: 'brackets'});
		},
	}, options));
}

/**
 * ajax 请求
 * @param {{url:String,method?:String,data?:String|Object,
 * dataType?:String,isShowLoading?:Boolean,
 * success?:Function,fail?:Function,complete?:Function}} options
 */
function request(options) {
	options = Object.assign({
		isShowLoading: true,
		thisArg: undefined,
		dataType: 'json',
		method: 'get',
	}, options);

	if (options.isShowLoading) view.showLoading();

	options.method = options.method ? options.method.toLowerCase() : 'get';
	if (['get', 'delete', 'options'].indexOf(options.method) !== -1) {
		options.params = options.data;
		delete options.data;
	} else {
		if (options.dataType === 'json') {
			options.headers = Object.assign(options.headers || {}, {
				'Content-Type': 'application/json'
			});
			// options.headers = Object.assign(options.headers || {}, {
			// 	'Content-Type': 'text/plain'
			// });
		} else {
			options.headers = Object.assign(options.headers || {}, {
				'Content-Type': 'application/x-www-form-urlencoded'
			});
			if (options.data) options.data = Qs.stringify(options.data, {
				encodeValuesOnly: true
			});
		}
	}

	return getRequestInstance().request(options).then(response => {
		execSuccessFunc(options, response);
	}).catch((error) => {
		responseFailFunc(options, error);
	});
}

/**
 *
 * @param {{requests:Array,isShowLoading?:Boolean,
 * success?:Function,fail?:Function,complete?:Function}} options
 */
function requestAll(options) {

}

/**
 * 添加请求拦截器
 * @param {*} [onFulfilled]
 * @param {*} [onRejected]
 * @return {number}
 */
function addRequestInterceptor(onFulfilled, onRejected) {
	return getRequestInstance().interceptors.request.use(onFulfilled, onRejected);
}

/**
 * 移除请求拦截器
 * @param {number} interceptor
 */
function removeRequestInterceptor(interceptor) {
	getRequestInstance().interceptors.request.eject(interceptor);
}


/**
 * 添加响应拦截器
 * @param {*} [onFulfilled]
 * @param {*} [onRejected]
 * @return {number}
 */
function addResponseInterceptor(onFulfilled, onRejected) {
	return getRequestInstance().interceptors.response.use(onFulfilled, onRejected);
}

/**
 * 移除响应拦截器
 * @param {number} interceptor
 */
function removeResponseInterceptor(interceptor) {
	getRequestInstance().interceptors.response.eject(interceptor);
}

/**
 * Get 请求
 * @param {String} url
 * @param {*} data
 * @param {Function} success
 * @param {*} options
 */
request.get = function (url, data, success, options = {}) {
	return this(Object.assign({url, data, success, method: 'GET'}, options));
};

/**
 * Post 请求
 * @param {String} url
 * @param {*} data
 * @param {Function} success
 * @param {*} options
 */
request.post = function (url, data, success, options = {}) {
	return this(Object.assign({url, data, success, method: 'POST'}, options));
};

/**
 * Put 请求
 * @param {String} url
 * @param {*} data
 * @param {Function} success
 * @param {*} options
 */
request.put = function (url, data, success, options = {}) {
	return this(Object.assign({url, data, success, method: 'PUT'}, options));
};

/**
 * Delete 请求
 * @param {String} url
 * @param {*} data
 * @param {Function} success
 * @param {*} options
 */
request.delete = function (url, data, success, options = {}) {
	return this(Object.assign({url, data, success, method: 'DELETE'}, options));
};

const upload = function (options = {}) {

};

const download = function (options = {}) {

};

export default {
	init,
	request,
	requestAll,
	upload,
	download,
	addRequestInterceptor,
	removeRequestInterceptor,
	addResponseInterceptor,
	removeResponseInterceptor
};