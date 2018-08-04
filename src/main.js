// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import sys from 'f-xinran-lib';
import router from './router';
import iView from 'iview';
import App from './App';
import VueCodemirror from 'vue-codemirror'

import 'vue2-animate/dist/vue2-animate.min.css';
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/dracula.css'
import './assets/less/app.less';

Vue.config.productionTip = false;
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
Vue.use(VueCodemirror, /* {
  options: { theme: 'base16-dark', ... },
  events: ['scroll', ...]
} */);


router.afterEach(() => {
	iView.LoadingBar.finish();
});

window.IS_DEV = process.env.NODE_ENV === 'development';
window.__ROUTER__ = router;
window.__VUE__ = new Vue({
	el: '#app',
	router,
	components: {App},
	template: '<App/>'
});
