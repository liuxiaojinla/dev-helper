import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import iView from 'iview';

import './assets/less/app.less';

Vue.use(iView);
Vue.use(function(Vue, options) {
	window.sys = sys;
	sys.__ROUTER__ = router;
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
});

// 页面打开后的操作
router.afterEach(function(route) {
	iView.LoadingBar.finish();
	if (route.meta && route.meta.title) {
		document.title = route.meta.title;
	}
});

Vue.config.productionTip = false;

window.IS_DEV = process.env.NODE_ENV === 'development';
window.__ROUTER__ = router;
window.__VUE__ = new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app');
