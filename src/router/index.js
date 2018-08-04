import Vue from 'vue';
import Router from 'vue-router';

import Index from '@/pages/Index';

Vue.use(Router);

const router = new Router({
	// mode: 'history',
	routes: [
		{
			path: '/',
			name: 'Index',
			meta: {title: '首页',},
			component: Index
		},
		{
			path: '/login',
			name: 'Login',
			meta: {title: '登录',},
			component: () => import('@/pages/Login')
		},
		{
			path: '/app_manager',
			name: 'AppManager',
			meta: {title: '应用管理',},
			component: () => import('@/pages/AppManager')
		},
		{
			path: '/codemirror',
			name: 'Codemirror',
			meta: {title: '编辑器',},
			component: () => import('@/pages/Codemirror')
		},
	],
	scrollBehavior(to, from, savedPosition) {
		if (to.hash) {
			return {
				selector: to.hash
			}
		} else {
			if (savedPosition) {
				return savedPosition
			} else {
				return {x: 0, y: 0}
			}
		}
	},
});

router.afterEach(function(route) {
	if (route.meta && route.meta.title) {
		document.title = route.meta.title;
	}
});

export default router;


