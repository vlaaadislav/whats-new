import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    linkActiveClass: 'active',
    scrollBehavior: () => ({ y: 0 }),
    routes: [
        {
            path: '*',
            name: 'main-page',
            component: require('@/components/MainPage').default
        }
    ]
})
