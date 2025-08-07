import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import DetailView from '@/views/DetailView.vue'
import HistoryAndSavesView from '@/views/HistoryAndSavesView.vue'

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/detail/:id', name: 'Detail', component: DetailView },
  { path: '/historyAndSaves', name: 'HistoryAndSaves', component: HistoryAndSavesView },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundView },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
