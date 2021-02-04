import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      alias: '/things',
      name: 'things',
      component: () => import('./components/ThingsList')
    },
    {
      path: '/things/:id',
      name: 'thing-details',
      component: () => import('./components/Thing')
    },
    {
      path: '/add',
      name: 'add',
      component: () => import('./components/AddThing')
    }
  ]
});
