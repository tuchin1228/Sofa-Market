import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Frontend/Index.vue';
import Dashboard from '@/views/Backend/Dashboard.vue';
import Product from '@/views/Backend/Product.vue';
import Login from '@/views/Frontend/Login.vue';
import Order from '@/views/Backend/Order.vue';
import Categorylist from '@/views/Frontend/Categorylist.vue';
import ProductInfo from '@/views/Frontend/ProductInfo.vue';
import Coupon from '@/views/Backend/Coupon.vue';
import Cart from '@/views/Frontend/Cart.vue';
import Checkout from '@/views/Frontend/Checkout.vue';
import Favorite from '@/views/Frontend/Favorite.vue';
import Error from '@/views/Frontend/Error.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    children: [{
      path: 'product',
      name: 'Product',
      component: Product,
      meta: { requiresAuth: true },
    },
    {
      path: 'order',
      name: 'Order',
      component: Order,
      meta: { requiresAuth: true },
    },
    {
      path: 'coupon',
      name: 'Coupon',
      component: Coupon,
      meta: { requiresAuth: true },
    },
    ],
  },
  {
    path: '/categorylist',
    name: 'Categorylist',
    component: Categorylist,
  },
  {
    path: '/categorylist/:productid',
    name: 'ProductInfo',
    component: ProductInfo,
  },
  {
    path: '/favorite',
    name: 'Favorite',
    component: Favorite,
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
  },
  {
    path: '/checkout/:id',
    name: 'Checkout',
    component: Checkout,
  },

  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/error',
    name: 'Error',
    component: Error,
  },
  {
    path: '*',
    redirect: '/',
  },
];

const router = new VueRouter({
  routes,
});

export default router;
