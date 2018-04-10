import Vue from 'vue';
import Router from 'vue-router';

import Index from '@/pages/Index';
// import Hello from '@/components/Hello';
// import World from '@/components/World';

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
			path: '/hello',
			name: 'Hello',
			meta: {title: 'Hello',},
			component: () => import('@/components/Hello'),
		},
		{
			path: '/world',
			name: 'World',
			meta: {title: 'World',},
			component: () => import('@/components/World'),
		}
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

router.afterEach(function (route) {
	if (route.meta && route.meta.title) {
		document.title = route.meta.title;
	}
});

export default router;


