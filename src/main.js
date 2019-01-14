import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

import VueResource from 'vue-resource';
Vue.use(VueResource);

/**/
import PosCalculator from './components/PosCalculator.vue';
import PosOrders from './components/PosOrders.vue';
import PosOrder from './components/PosOrder.vue';

// Init router
import VueRouter from 'vue-router';
Vue.use(VueRouter);

// Set up possible routes
const routes = [
  { path: '/', exact: true, name: 'pos', component: App },
  { path: '/calculator', name: 'calculator', component: PosCalculator },
  { path: '/orders', name: 'orders', component: PosOrders },
  { path: '/orders/:id', name: 'order', component: PosOrder }
];

const router = new VueRouter({
  routes,
  mode: 'history',
  linkActiveClass: 'active',
  transitionOnLoad: true,
  root: '/'
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
