import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import InvoiceDetail from '../views/InvoiceDetail.vue';
import Auth from '../views/Auth.vue';
import NotFound from '../components/NotFound.vue';
import Verify from '../views/Verify.vue';
import EditProfile from '../components/EditProfile.vue';
import { auth } from '../firebase/config';

const routes = [
  {
    path: '/',
    name: 'Auth',
    component: Auth,
    beforeEnter(to, from, next) {
      if (
        !auth.currentUser ||
        (auth.currentUser && !auth.currentUser.emailVerified)
      ) {
        next();
      } else {
        next({ name: 'Home' });
      }
    },
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    beforeEnter(to, from, next) {
      if (auth.currentUser && !auth.currentUser.emailVerified) {
        next({ name: 'Verify' });
      } else if (!auth.currentUser) {
        next({ name: 'Auth' });
      } else {
        next();
      }
    },
  },
  {
    path: '/invoices/detail/:id',
    name: 'invoiceDetail',
    component: InvoiceDetail,
    props: true,
    beforeEnter(to, from, next) {
      if (auth.currentUser) {
        next();
      } else {
        next({ name: 'Auth' });
      }
    },
  },
  {
    path: '/email/verify',
    name: 'Verify',
    component: Verify,
    props: true,
    beforeEnter(to, from, next) {
      if (auth.currentUser && !auth.currentUser.emailVerified) {
        next();
      } else {
        next({ name: 'Home' });
      }
    },
  },
  {
    path: '/user/profile/:id',
    name: 'EditProfile',
    component: EditProfile,
    props: true,
    beforeEnter(to, from, next) {
      if (auth.currentUser && auth.currentUser.emailVerified) {
        next();
      } else {
        next({ name: 'Auth' });
      }
    },
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
