import Vue from 'vue';
import App from './App.vue';
import router from './router';

// plugins
import './plugins/iview';
import './plugins/sys-vue-iview-plugin';

// assets
import './app.less';
import './assets/css/animate.css';

const fs = require('fs');
const nodeUtil = require('util');
const writeFile = nodeUtil.promisify(fs.writeFile);

Vue.config.productionTip = false;

window.IS_DEV = process.env.NODE_ENV !== 'production';

window.router = sys.__ROUTER__ = router;
window.app = new Vue({
	router,
	render: h => h(App),
	mounted() {
		// Prevent blank screen in Electron builds
		this.$router.replace({name: 'home'})
	}
}).$mount('#app');

process.on('unhandledRejection', error => {
	console.error(error)

	writeFile('00.txt', JSON.stringify(error));
});
