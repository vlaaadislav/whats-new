import Vue from 'vue';

import App from './App';
import router from './router';
import store from './store';

import KeenUI from 'keen-ui';
import 'keen-ui/dist/keen-ui.css';

if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
Vue.config.productionTip = false;

Vue.use(KeenUI);

/* eslint-disable no-new */
new Vue({
    components: { App },
    router,
    store,
    template: '<App/>'
}).$mount('#app');
