import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/Home.vue'),
  },
  {
    path: '/voucher/:type?',
    name: 'Voucher',
    component: () => import('@/pages/Voucher.vue'),
  },
  {
    path: '/daybook',
    name: 'Daybook',
    component: () => import('@/pages/Daybook.vue'),
  },
  {
    path: '/import',
    name: 'Import',
    component: () => import('@/pages/ImportWizard.vue'),
  },
  {
    path: '/employees',
    name: 'Employees',
    component: () => import('@/pages/Employees.vue'),
  },
]

let router = createRouter({
  history: createWebHistory('/frontend'),
  routes,
})

export default router
