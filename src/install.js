import sys from 'f-xinran-lib';

window.sys = sys;

/**
 * Vue 安装
 * @param Vue
 */
export default function (Vue) {
	sys.addResponseInterceptor((res) => {
		if (res && res.data) {
			const data = res.data;
			if (data.data || data.result) return data;

			const err = new Error(data.msg);
			err.response = res;
			err.data = data;
			throw err;
		} else {
			const err = new Error('请求服务器失败，请联系管理员~');
			err.response = res;
			throw err;
		}
	}, (err) => {
		return Promise.reject(err);
	});

	//上传失败提示信息
	function showUploadError(msg) {
		sys.showNotification({
			title: '错误提示',
			type: 'error',
			desc: `上传失败：${msg}`,
		});
	}

	Vue.mixin({
		methods: {
			//上传格式错误
			onUploadFormatError: () => showUploadError('文件格式错误'),
			//上传大小错误
			onUploadSizeError: () => showUploadError('文件大小超出限制'),
		}
	});
};