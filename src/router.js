import Vue from 'vue';
import Router from 'vue-router';
import Webview from './components/Webview.vue';
import Home from './views/index/Index.vue';

Vue.use(Router);
const isDev = process.env.NODE_ENV !== 'production';
export default new Router({
	mode: isDev ? 'history' : 'hash',
	base: process.env.BASE_URL,
	exclude: [],
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
			component: () => import(/* webpackChunkName: "setting" */ './views/index/Setting.vue'),
			meta: {
				title: '设置'
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
			path: '/filewatcher',
			name: 'filewatcher',
			component: () => import(/* webpackChunkName: "file-watcher" */ './views/file-watcher/Index.vue'),
			meta: {
				title: '目录监听器'
			}
		},
		{
			path: '/filewatcher/add',
			name: 'filewatcher.add',
			component: () => import(/* webpackChunkName: "file-watcher" */ './views/file-watcher/Add.vue'),
			meta: {
				title: '添加监听目录'
			}
		},
		{
			path: '/filewatcher/detail',
			name: 'filewatcher.detail',
			component: () => import(/* webpackChunkName: "file-watcher" */ './views/file-watcher/Detail.vue'),
			meta: {
				title: '文件变化详情'
			}
		},
		{
			path: '/hosts',
			name: 'hosts',
			component: () => import(/* webpackChunkName: "hosts" */ './views/hosts/Index.vue'),
			meta: {
				title: '微信小程序转换助手'
			}
		},
		{
			path: '/weapp_transform',
			name: 'weapp_transform',
			component: () => import(/* webpackChunkName: "weapp_trsanform" */ './views/weapp-transform/Index.vue'),
			meta: {
				title: '微信小程序转换助手'
			}
		},
		{
			path: '/weapp_transform/add',
			name: 'weapp_transform.add',
			component: () => import(/* webpackChunkName: "weapp_trsanform" */ './views/weapp-transform/Add.vue'),
			meta: {
				title: '微信小程序转换助手'
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
