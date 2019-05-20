import Vue from 'vue';
import Router from 'vue-router';
import Webview from './components/Webview.vue';
import Home from './views/index/Index.vue';
import Setting from './views/index/Setting.vue';

Vue.use(Router);
const isDev = process.env.NODE_ENV !== 'production';
export default new Router({
	mode: isDev ? 'history' : 'hash',
	base: process.env.BASE_URL,
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) {
			// savedPosition is only available for popstate navigations.
			return savedPosition
		} else {
			const position = {};
			// new navigation.
			// scroll to anchor by returning the selector
			if (to.hash) {
				position.selector = to.hash
			}

			// 如果meta中有scrollTop
			if (to.matched.some(m => m.meta.scrollToTop)) {
				// cords will be used if no selector is provided,
				// or if the selector didn't match any element.
				position.x = 0;
				position.y = 0;
			}

			// if the returned position is falsy or an empty object,
			// will retain current scroll position.
			return position
		}
	},
	exclude: [
		'AutoDeploymentDetail'
	],
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home,
			meta: {
				title: '开发小助手'
			}
		},
		{
			path: '/setting',
			name: 'setting',
			component: Setting,
			meta: {
				title: '设置'
			}
		},
		{
			path: '/auto-deployment',
			name: 'auto-deployment',
			component: () => import(/* webpackChunkName: "auto-deployment" */ './views/auto-deployment/Index.vue'),
			meta: {
				title: '目录监听器'
			}
		},
		{
			path: '/auto-deployment/add',
			name: 'auto-deployment.add',
			component: () => import(/* webpackChunkName: "auto-deployment" */ './views/auto-deployment/Add.vue'),
			meta: {
				title: '添加监听目录'
			}
		},
		{
			path: '/auto-deployment/detail',
			name: 'auto-deployment.detail',
			component: () => import(/* webpackChunkName: "auto-deployment" */ './views/auto-deployment/Detail.vue'),
			meta: {
				title: '文件变化详情'
			}
		},
		{
			path: '/hosts',
			name: 'hosts',
			component: () => import(/* webpackChunkName: "util" */ './views/index/Hosts.vue'),
			meta: {
				title: 'HOSTS文件'
			}
		},
		{
			path: '/time',
			name: 'time',
			component: () => import(/* webpackChunkName: "util" */ './views/index/Time.vue'),
			meta: {
				title: '时间戳'
			}
		},
		{
			path: '/weapp_transform',
			name: 'weapp_transform',
			component: () => import(/* webpackChunkName: "util" */ './views/weapp-transform/Index.vue'),
			meta: {
				title: '微信小程序转换助手'
			}
		},
		{
			path: '/weapp_transform/add',
			name: 'weapp_transform.add',
			component: () => import(/* webpackChunkName: "util" */ './views/weapp-transform/Add.vue'),
			meta: {
				title: '微信小程序转换助手'
			}
		},
		{
			path: '/logistics',
			name: 'logistics',
			component: () => import(/* webpackChunkName: "util" */ './views/index/Logistics.vue'),
			meta: {
				title: '物流查询'
			}
		},
		{
			path: '/IntelliJIDEA',
			name: 'IntelliJIDEA',
			component: () => import(/* webpackChunkName: "util" */ './views/index/IntelliJIDEA.vue'),
			meta: {
				title: 'IntelliJ IDEA注册码'
			}
		},
		{
			path: '/request',
			name: 'request',
			component: () => import(/* webpackChunkName: "util" */ './views/index/Request.vue'),
			meta: {
				title: '请求器'
			}
		},
		{
			path: '/encrypt/url',
			name: 'encrypt.url',
			component: () => import(/* webpackChunkName: "encrypt" */ './views/encrypt/Url.vue'),
			meta: {
				title: 'URL转码'
			}
		},
		{
			path: '/encrypt/base64',
			name: 'encrypt.base64',
			component: () => import(/* webpackChunkName: "encrypt" */ './views/encrypt/Base64.vue'),
			meta: {
				title: 'Base64转码'
			}
		},
		{
			path: '/encrypt/md5',
			name: 'encrypt.md5',
			component: () => import(/* webpackChunkName: "encrypt" */ './views/encrypt/Md5.vue'),
			meta: {
				title: 'MD5加密'
			}
		},
		{
			path: '/encrypt/sha1',
			name: 'encrypt.sha1',
			component: () => import(/* webpackChunkName: "encrypt" */ './views/encrypt/Sha1.vue'),
			meta: {
				title: 'SHA1加密'
			}
		},
		{
			path: '/webview',
			name: 'webview',
			// route level code-splitting
			// this generates a separate chunk (weapp_trsanform.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: Webview,
			meta: {
				title: ''
			},
			props: true
		},
	]
})
