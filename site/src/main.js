import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import moment from 'moment'

import './styles.css'

(function() {
  Vue.config.debug = process.env.NODE_ENV !== 'production'
  Vue.prototype.moment = moment
  Vue.use(VueResource);

  new Vue({
    el: 'body',
    components: {
      App
    }
  })
})();