import Vue from 'vue'
import VueRouter from 'vue-router'
import goTo from 'vuetify/es5/services/goto'
Vue.use(VueRouter)

const routes = [
  {
    path: '/:language',
    name: 'home',
    component: () => import('views/home.vue')
  },
  {
    path: '/:language/doc',
    name: 'doc',
    component: () => import('views/doc.vue')
  },
  {
    path: '/:language/demo',
    name: 'demo',
    component: () => import('views/demo.vue')
  },
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  scrollBehavior: (to, from, savedPosition) => {
    let scrollTo = 0

    if (to.hash) {
      scrollTo = to.hash
    } else if (savedPosition) {
      scrollTo = savedPosition.y
    }

    return goTo(scrollTo)
  },
  routes
})

export default router
