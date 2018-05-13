import Vue from 'vue'

import App from './App'
import router from './router'
import store from './store'

import VModal from 'vue-js-modal'
import VueLazyload from 'vue-lazyload'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false

Vue.use(VModal)
Vue.use(VueLazyload, {
    loading: '../static/loading_icon.gif'
})

/* eslint-disable no-new */
new Vue({
    components: { App },
    router,
    store,
    template: '<App/>'
}).$mount('#app')
