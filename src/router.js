import Vue from 'vue';
import Router from 'vue-router';
import Webview from './components/Webview.vue';
import Setting from './views/index/Setting.vue';
import Action from "./components/Action";
import ActionGroup from "./components/ActionGroup";

import utilList from "./data/util-list";
import docList from "./data/doc-list";
import encryptList from "./data/encrypt-list";


Vue.use(Router);
const isDev = process.env.NODE_ENV !== 'production';
export default new Router({
	mode: isDev ? 'history' : 'hash',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/',
			name: 'home',
			component: Action,
			props: {
				actions: utilList
			},
			meta: {
				title: '常用工具'
			}
		},
		{
			path: '/util/hosts',
			name: 'util.hosts',
			component: () => import(/* webpackChunkName: "util" */ './views/util/Hosts.vue'),
			meta: {
				title: 'HOSTS文件'
			}
		},
		{
			path: '/util/time',
			name: 'util.time',
			component: () => import(/* webpackChunkName: "util" */ './views/util/Time.vue'),
			meta: {
				title: '时间戳'
			}
		},
		{
			path: '/util/weapp_transform',
			name: 'util.weapp_transform',
			component: () => import(/* webpackChunkName: "util" */ './views/weapp-transform/Index.vue'),
			meta: {
				title: '微信小程序转换助手'
			}
		},
		{
			path: '/util/weapp_transform/add',
			name: 'util.weapp_transform.add',
			component: () => import(/* webpackChunkName: "util" */ './views/weapp-transform/Add.vue'),
			meta: {
				title: '微信小程序转换助手'
			}
		},
		{
			path: '/util/logistics',
			name: 'util.logistics',
			component: () => import(/* webpackChunkName: "util" */ './views/util/Logistics.vue'),
			meta: {
				title: '物流查询'
			}
		},
		{
			path: '/util/IntelliJIDEA',
			name: 'util.IntelliJIDEA',
			component: () => import(/* webpackChunkName: "util" */ './views/util/IntelliJIDEA.vue'),
			meta: {
				title: 'IntelliJ IDEA注册码'
			}
		},
		{
			path: '/util/request',
			name: 'util.request',
			component: () => import(/* webpackChunkName: "util" */ './views/util/Request.vue'),
			meta: {
				title: '请求器'
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
			path: '/website-kit',
			name: 'website-kit',
			component: () => import(/* webpackChunkName: "website-kit" */ './views/website-kit/Index.vue'),
			meta: {
				title: '网站套件'
			}
		},
		{
			path: '/encrypt',
			name: 'encrypt',
			component: Action,
			props: {
				actions: encryptList
			},
			meta: {
				title: '加密/解密'
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
			path: '/docs',
			name: 'docs',
			component: ActionGroup,
			props: {
				actions: docList
			},
			meta: {
				title: '常用文档'
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
		{
			path: '/setting',
			name: 'setting',
			component: Setting,
			meta: {
				title: '设置'
			}
		},
	],
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
})
