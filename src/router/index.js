import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/index.vue';
import Dashboard from '../views/dashboard.vue';
import Product from '../views/product.vue';
import Login from '../views/login.vue';
import Order from '../views/order.vue';
import Categorylist from '../views/categorylist.vue';
import ProductInfo from '../views/productInfo.vue';
import Coupon from '../views/coupon.vue';
import Cart from '../views/cart.vue';
import Checkout from '../views/checkout.vue';
import Favorite from '../views/favorite.vue';
import Error from '../views/error.vue';

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
