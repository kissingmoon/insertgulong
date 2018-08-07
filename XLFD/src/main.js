import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'
import store from 'store'
import Axios from 'common/js/axios'


Vue.config.productionTip = false;
Vue.prototype.$axios = Axios;
fastclick.attach(document.body);
Vue.use(VueLazyload,{
    loading:require('common/img/icon-loading-img.png')
});
Vue.prototype.TencentCaptcha = TencentCaptcha;
Vue.prototype.returnCitySN = returnCitySN;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})