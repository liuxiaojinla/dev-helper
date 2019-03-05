import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Webview from './components/Webview.vue';

Vue.use(Router);

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [{
		path: '/',
		name: 'home',
		component: Home,
		meta: {
			title: '开发小助手'
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
	}]
})
