import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import InvoiceDetail from '../views/InvoiceDetail.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/invoices/detail/:invoiceId',
    name: 'invoiceDetail',
    component: InvoiceDetail,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
