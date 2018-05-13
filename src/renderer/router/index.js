import Vue from 'vue'
import Router from 'vue-router'

import MainPage from '../components/MainPage'

Vue.use(Router)

export default new Router({
    linkActiveClass: 'active',
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes: [
        {
            path: '/:game',
            component: MainPage
        }
    ]
})
