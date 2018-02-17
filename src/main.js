// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

import store from './store'
import Datatable from 'vue2-datatable-component'
import {ServerTable, ClientTable, Event} from 'vue-tables-2';

import Chartkick from 'chartkick'
import VueChartkick from 'vue-chartkick'
import Chart from 'chart.js'

Vue.use(VueChartkick, { Chartkick })

Vue.use(ClientTable);
//Vue.use(Vuetify)
Vue.use(Vuetify, {
  theme: {
    primary: '#b71c1c',
    secondary: '#b0bec5',
    accent: '#8c9eff',
    error: '#b71c1c'
  }
});

//import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue';

import App from './App'

// Import the styles directly. (Or you could add them via script tags.)
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios' // for global access throughout the application

// index.js or main.js
// import('path/to/node_modules/vuetify/dist/vuetify.min.css') // Ensure you are using css-loader
//window.axios=axios


Vue.use(BootstrapVue);
Vue.use(Datatable);

Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  store,
  components: { App }
})
