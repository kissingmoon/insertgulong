import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'
import store from 'store'
import {getRequest} from 'common/js/api'
import {postRequest} from 'common/js/api'
import {deleteRequest} from 'common/js/api'
import {putRequest} from 'common/js/api'


Vue.config.productionTip = false;
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
  store,
  components: { App },
  template: '<App/>'
})
