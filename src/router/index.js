import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BasketView from '../views/BasketView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/book/:id',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
    props: true
  },
  {
    path: '/shopping',
    name: 'basket',
    component: BasketView
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/ProfileView.vue')
  },
  {
    path: '/saved',
    name: 'saved',
    component: () => import('../views/SavedView.vue')
  },
  {
    path: '/me',
    name: 'me',
    component: () => import('../views/MeView.vue')
  },
  {
    path: '/category/:category',
    name: 'category',
    component: () => import('../views/CategoryView.vue')
  },
  {
    path: '/edit/:id',
    name: 'editor',
    component: () => import('../views/EditorView.vue')
  },
  {
    path: '/create',
    name: 'creator',
    component: () => import('../views/CreatorView.vue')
  },
  {
    path: '/orders',
    name: 'orders',
    component: () => import('../views/OrdersView.vue')
  },
  {
    path: '/pay/:price/:card',
    name: 'pay',
    component: () => import('../views/PayView.vue')
  },
  {
    path: '/pay/:price/',
    name: 'payWithoutCard',
    component: () => import('../views/PayView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
