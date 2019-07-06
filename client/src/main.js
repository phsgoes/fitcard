import Vue from 'vue'
import Vuetify from 'vuetify'
import '@/plugins/vuetify'
import App from '@/App'
import router from '@/router'
import store from '@/store/index'
import axios from 'axios'
import VueAxios from 'vue-axios'
import utils from '@/plugins/utils'
import tokenMixin from '@/plugins/tokenMixin'
import pt from 'vuetify/es5/locale/pt'
import en from 'vuetify/es5/locale/en'
import VueSweetalert2 from 'vue-sweetalert2'
import VueTheMask from 'vue-the-mask'
 

import '@fortawesome/fontawesome-free/css/all.css'
import '@/themes/global.scss'

Vue.use(Vuetify, {
  lang: {
    locales: { en, pt },
    current: 'pt',
  },
  iconfont: 'fa',
  theme: {
    primary: '#AC192F',
    secondary: '#616161',
    accent: '#575a67',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107',
    error: '#b71c1c'
  }
})

Vue.use(utils)
Vue.use(VueAxios, axios)
Vue.use(tokenMixin)
Vue.use(VueTheMask)
Vue.use(VueSweetalert2, {
  confirmButtonColor: '#41b882',
  cancelButtonColor: '#ff7674',
  allowEnterKey: true
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
