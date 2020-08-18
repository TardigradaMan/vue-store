import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import firebase from 'firebase/app'

Vue.use(Router)

const routes = [
  {
    path: '',
    name: 'home',
    component: Home
  },
  {
    path: '/ad/:id',
    props: true,
    name: 'ad',
    component: () => import('../components/Ads/Ad')
  },
  {
    path: '/list',
    name: 'list',
    meta: {
      auth: true
    },
    component: () => import('../components/Ads/AdList')
  },
  {
    path: '/new',
    name: 'newAd',
    meta: {
      auth: true
    },
    component: () => import('../components/Ads/NewAd')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../components/Auth/Login')
  },
  {
    path: '/registration',
    name: 'reg',
    component: () => import('../components/Auth/Registration')
  },
  {
    path: '/orders',
    name: 'orders',
    meta: {
      auth: true
    },
    component: () => import('../components/User/Orders')
  }
]

const router = new Router({
  routes,
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser
  const requireAuth = to.matched.some(record => record.meta.auth)
  if (requireAuth && !currentUser) {
    next('/login?message=login')
  } else {
    next()
  }
})

export default router
