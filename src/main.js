// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import install from './install';
import router from './router';
import iView from 'iview';
import App from './App';
import VueCodemirror from 'vue-codemirror'

import 'vue2-animate/dist/vue2-animate.min.css';
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/dracula.css'
import './assets/less/app.less';

Vue.config.productionTip = false;
Vue.use(install);
Vue.use(iView);
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
