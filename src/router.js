import Vue from 'vue';
import Router from 'vue-router';
import Webview from './components/Webview.vue';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [

		{
			path: '/uploader',
			name: 'uploader',
			component: () => import(/* webpackChunkName: "uploader" */ './views/file-watcher/Index.vue'),
			meta: {
				title: '目录监听器'
			}
		}, {
			path: '/uploader/add',
			name: 'uploader.add',
			component: () => import(/* webpackChunkName: "uploader" */ './views/file-watcher/Add.vue'),
			meta: {
				title: '添加监听目录'
			}
		}, {
			path: '/uploader/detail',
			name: 'uploader.detail',
			component: () => import(/* webpackChunkName: "uploader" */ './views/file-watcher/Detail.vue'),
			meta: {
				title: '文件变化详情'
			}
		}, {
			path: '/weapp_trsanform',
			name: 'weapp_trsanform',
			component: () => import(/* webpackChunkName: "weapp_trsanform" */ './views/WeappTransform.vue'),
			meta: {
				title: '开发小助手'
			}
		}, {
			path: '/webview',
			name: 'webview',
			component: Webview,
			meta: {
				title: ''
			},
			props: true
		}, {
			path: '/about',
			name: 'about',
			// route level code-splitting
			// this generates a separate chunk (about.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
		},
		{
			path: '*',
			name: 'home',
			component: Home,
			meta: {
				title: '开发小助手'
			}
		},
	]
})
