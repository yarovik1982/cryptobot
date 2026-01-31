import { createWebHistory, createRouter, createWebHashHistory } from "vue-router";

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
      path:'/deposit/:id',
      component: () => import('@/views/DepositCoin.vue'),
      props: { operationType: 'deposit' }
   },
   {
      path: '/withdraw',
      component: () => import('@/views/Withdraw.vue'),
   },
   {
      path: '/withdraw/:id',
      component: () => import('@/views/WithdrawCoin.vue'),
      props: { operationType: 'withdraw' }
   },
   {
      path: '/trade',
      // component: () => import('@/views/Trade.vue'),
      component: () => import('@/views/NewTrade.vue'),
   },
   {
      path: '/exchange',
      component: () => import('@/views/Exchange.vue'),
   },
]

const router = createRouter({
   history: createWebHashHistory(),
   routes,
});

export default router;