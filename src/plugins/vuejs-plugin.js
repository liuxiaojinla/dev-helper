import Vue from 'vue';
// import iView from 'iview';
import sys from 'vuejs-plugin';
import router from '../router';

window.sys = sys;
sys.request.addResponseInterceptor((res) => {
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

// 页面打开后的操作
router.afterEach(function(route) {
	// iView.LoadingBar.finish();
	if (route.meta && route.meta.title) {
		document.title = route.meta.title;
	}
});


const ipcRenderer = require('electron').ipcRenderer;

// 打开文件对话框
sys.define('openFileSelectDialog', function(options) {
	ipcRenderer.send('open-file-dialog', options);
	return new Promise(function(resolve, reject) {
		ipcRenderer.on('open-file-dialog-result', function(event, result) {
			if (result && result.length) {
				resolve(result);
			} else {
				reject('未选择文件或目录');
			}
		});
	});
});
