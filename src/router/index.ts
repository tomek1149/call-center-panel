import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'TicketList',
    component: () => import('@/views/TicketListView.vue')
  },
  {
    path: '/ticket/:id',
    name: 'TicketDetail',
    component: () => import('@/views/TicketDetailView.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router