import { createRouter, createWebHistory } from 'vue-router'
import DashView from '../views/DashView.vue'
import AboutView from '../views/AboutView.vue'
import SplashView from '../views/SplashView.vue'

const routes = [
  {
    path: '/',
    name: 'dash',
    component: DashView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/splash',
    name: 'splash',
    component: SplashView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
