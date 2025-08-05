import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import Home from '@/views/Home.vue'
import NotFound from '@/views/NotFound.vue'
import Detail from '@/views/Detail.vue'
import HistoryAndSaves from '@/views/HistoryAndSaves.vue'

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'Home', component: Home },
  { path: '/detail/:id', name: 'Detail', component: Detail, props: true },
  { path: '/historyAndSaves', name: 'HistoryAndSaves', component: HistoryAndSaves },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
