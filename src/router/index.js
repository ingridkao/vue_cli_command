import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    meta: {
      title: '首頁'
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "home" */ '@/views/HomeView.vue')
  },
  {
    path: '/about',
    name: 'about',
    meta: {
      title: '關於茶苑'
    },
    component: () => import('@/views/AboutView.vue')
  },
  {
    path: '/news',
    name: 'news',
    meta: {
      title: '最新消息'
    },
    component: () => import('@/views/news/Index.vue'),
    children: [
      {
        path: '',
        alias: ['list'],
        component: () => import('@/views/news/List.vue'),
      },
      {
        path: ':id(\\d+)',
        component: () => import('@/views/news/Info.vue')
      }
    ]
  },
  { 
    path: '/shop/:id', 
    meta: {
      title: '線上商城'
    },
    children: [
      {
        path: '',
        component: () => import('../views/ShopInfoView.vue')
      }
    ],
  },
  {
    path: '/carts',
    name: 'carts',
    meta: {
      title: '購物車'
    },
    component: () => import('../views/CartsView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    meta: {
      title: '會員資料'
    },
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
  routes,
  //切換不同頁面，滾軸永遠在最上面
  scrollBehavior (to, from, savedPosition) {
    if(to.name !== from.name)return { top: 0, left: 0, behavior: 'smooth' }
  }
})

export default router
