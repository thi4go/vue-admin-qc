import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueAuth from '@websanova/vue-auth'
import NProgress from 'vue-nprogress'
import { sync } from 'vuex-router-sync'
import App from './App.vue'
import router from './router'
import store from './store'
import * as filters from './filters'
import { TOGGLE_SIDEBAR } from 'vuex-store/mutation-types'
import VueResource from 'vue-resource'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import ElementUI from 'element-ui'

var firebase = require('firebase');

var config = {
    apiKey: "AIzaSyDDloEzbeu8AYjrG9_qhn9RMH0lHQJXmzA",
    authDomain: "qc-admin-315aa.firebaseapp.com",
    databaseURL: "https://qc-admin-315aa.firebaseio.com",
    projectId: "qc-admin-315aa",
    storageBucket: "qc-admin-315aa.appspot.com",
    messagingSenderId: "694941647214"
  };

firebase.initializeApp(config);

// Vue.http.options.emulateJSON = true;

Vue.router = router

Vue.use(ElementUI)
Vue.use(axios)
Vue.use(VueResource)
Vue.use(VueAwesomeSwiper)
// axios.defaults.headers.common['Access-Control-Allow-Origin']   = '*://*/*';
// axios.defaults.headers.common['Access-Control-Request-Method'] = 'GET, POST, PUT, DELETE, OPTIONS';

// Vue.use(VueAuth, {
//   auth: {
//     request: function (req, token) {
//     //   this.options.http._setHeaders.call(this, req, {Authorization: 'Bearer ' + token})
//     },
//     response: function (res) {
//       // Get Token from response body
//       return res.data
//     }
//   },
//   http: require('@websanova/vue-auth/drivers/http/axios.1.x.js'),
//   router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
//   loginData: { url: 'http://localhost:6789/login', fetchUser: false },
//   refreshData: { enabled: false }
// })

Vue.use(NProgress)

// Enable devtools
Vue.config.devtools = true

sync(store, router)

const nprogress = new NProgress({ parent: '.nprogress-container' })

const { state } = store

router.beforeEach((route, redirect, next) => {
  if (state.app.device.isMobile && state.app.sidebar.opened) {
    store.commit(TOGGLE_SIDEBAR, false)
  }
  next()
})

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

const app = new Vue({
  router,
  store,
  nprogress,
  ...App
})

export { app, router, store }
