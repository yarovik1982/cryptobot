import { createWebHistory, createRouter } from "vue-router";

const routes = [
   {
      path: '/',
      component: () => import('@/views/Home.vue'),
   },
   {
      path: '/deposit',
      component: () => import('@/views/Deposit.vue'),
   },
   {
      path: '/withdraw',
      component: () => import('@/views/Withdraw.vue'),
   },
   {
      path: '/trade',
      component: () => import('@/views/Trade.vue'),
   },
   {
      path: '/exchange',
      component: () => import('@/views/Exchange.vue'),
   },
]

const router = createRouter({
   history: createWebHistory(),
   routes,
});

export default router;