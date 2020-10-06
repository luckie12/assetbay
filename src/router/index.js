import Vue from 'vue'

import store from '../store/store'

import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Dashboard from '../views/Dashboard'
import NewListing from '../views/NewListing'
import NotFound from '../views/404'
import Statistics from '../views/Statistics'
import MyAssets from '../views/MyAssets'
import Asset from '../views/Asset'

import Pending from '../views/admin/Pending'
import AdminManage from '../views/admin/Manage'
import { db } from '../firebase'


Vue.use(VueRouter)

  const routes = [
  { path: '*', component: NotFound, name: 'NotFound' },
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta:{
      requiresAuth: false
    }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta:{
      requiresAuth: true
    },
    props: true
  },
  {
    path: '/new',
    name: 'newlisting',
    component: NewListing,
    meta:{
      requiresAuth: true
    },
    props: true
  },
  {
    path: '/stats',
    name: 'statistics',
    component: Statistics,
    meta:{
      requiresAuth: true
    },
    props: true
  },
  {
    path: '/admin/pending',
    name: 'pending',
    component: Pending,
    meta: {
      requiresAuth: true,
      requiresAdmin: true
    }
  },
  {
    path: '/admin/manage',
    name: 'manage',
    component: AdminManage,
    meta: {
      requiresAuth: true,
      requiresAdmin: true
    }
  },
  {
    path: '/myassets',
    name: 'myassets',
    component: MyAssets,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/asset/:id',
    name: 'asset',
    component: Asset,
    meta: {
      requiresAuth: false
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

/*
router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)){
    //If user is not logged in redirect to main page
    if(!store.getters.user){
      next({
        path: '/'
      })
    }else{
      next();
    }
  }else {
    next()
  }
})
*/

router.beforeEach(async(to, from, next) => {
  if(to.meta.requiresAuth){
    if(!store.getters.user){
      next({
        path: '/'
      })
    }else if (to.meta.requiresAdmin){
      //WE WANT TO CHECK STUFFERS HERE!
      const userRef = db.collection('users');
      const snapshot = await userRef.where('user_id', '==', store.getters.user.user_id).get()
      let isAdmin = false;
      snapshot.forEach(doc => {
        isAdmin = doc.data().admin
      })
      if(isAdmin){
        next()
      }else{
        next({
          path: '/dashboard'
        })
      }
    }else{
      next()
    }
  }else{
    next()
  }
})

/*

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.user) {
      next({
        path: '/'
      })
    } else {
      if(to.matched.some(record => record.meta.requiresAdmin)) {
        // Do a DB call to check if the user is an admin! !!IMPORTANT
        if(store.getters.user.admin){
          next()
        } else{
          next({ path: '/dashboard'})
        }
      }else {
        next()
      }
    }
  }
  next()
})
*/


export default router
