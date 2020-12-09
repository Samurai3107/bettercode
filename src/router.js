import Vue from 'vue'
import Router from 'vue-router';
import mainpage from './components/mainpage.vue'
import register from './components/register.vue'
import logout from './components/logout.vue'
import login from './components/login.vue'

Vue.use(Router);

export const router = new Router({
    mode: 'history',
    routes: [
    {
        path: '/',
        name: 'home',
        component: mainpage
    },
    {
        path: '/login',
        component: login
    },
    {
        path: '/register',
        component: register
    },
    {
        path: '/logout',
        component: logout
    },
    {
        path: '/dashboard',
        component: () => import('./components/dashboard.vue')
    }
]
});

router.beforeEach((to, from, next) => {
    const publicPages = ['/login', '/register', '/'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('user');
  
    if (authRequired && !loggedIn) {
      next('/login');
    } else {
      next();
    }
});