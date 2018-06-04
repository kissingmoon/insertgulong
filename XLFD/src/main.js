// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'
import axios from 'axios'
import {getRequest} from 'common/js/api'
import {postRequest} from 'common/js/api'
import {deleteRequest} from 'common/js/api'
import {putRequest} from 'common/js/api'
//import VueResource from 'vue-resource'
//import md5 from 'js-md5'


Vue.config.productionTip = false;
//Vue.use(VueResource);
//Vue.prototype.$md5 = md5;
Vue.prototype.$axios = axios;
Vue.prototype.getRequest = getRequest;
Vue.prototype.postRequest = postRequest;
Vue.prototype.deleteRequest = deleteRequest;
Vue.prototype.putRequest = putRequest;
fastclick.attach(document.body);
Vue.use(VueLazyload,{
    loading:require('common/img/home-on@3x.png')
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
