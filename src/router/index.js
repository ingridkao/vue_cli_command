import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    meta: {
      color: '#fff'
    },
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/news',
    name: 'news',
    component: () => import('../views/NewsView.vue')
  },
  {
    path: '/product',
    name: 'product',
    component: () => import('../views/ProductView.vue')
  },
  { 
    path: '/shop/:id', 
    children: [
      {
        path: '',
        component: () => import('../views/ShopInfoView.vue'),
        meta: {
          color: '#fff'
        }
      
      }
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/profile/:type',
    name: 'profile',
    component: () => import('../views/ProfileView.vue')
  },
  {
    path: '/result/:type',
    name: 'result',
    component: () => import('../views/ResultView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
