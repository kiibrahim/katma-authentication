import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Registration from '@/components/Registration'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/registration',
      name: 'Registration',
      component: Registration
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
