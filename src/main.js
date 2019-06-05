import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './plugins/iview';
import './plugins/vuejs-plugin';

import './app.less';
import './animate.css';

Vue.config.productionTip = false;

window.IS_DEV = process.env.NODE_ENV !== 'production';

window.router = sys.__ROUTER__ = router;
window.app = new Vue({
	router,
	store,
	render: h => h(App),
	mounted() {
		// Prevent blank screen in Electron builds
		this.$router.replace({name: 'home'})
	}
}).$mount('#app');

process.on('unhandledRejection', error => {
	console.error(error)
});
