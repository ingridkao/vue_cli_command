import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    meta: {
      title: '首頁'
    },
    component: () => import('@/views/HomeView.vue'),
  },
  {
    path: '/about',
    name: 'about',
    meta: {
      title: '關於茶苑'
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/news/:id',
    name: 'news',
    component: () => import('@/views/NewsView.vue'),
    // children: [
    //   {
    //     path: 'info',
    //     component: () => import('@/views/NewsInfo.vue')
    //   }
    // ]
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
  //切換分頁滾軸永遠在最上面
  scrollBehavior (to, from, savedPosition) {
    return { top: 0 }
  }
})

export default router
