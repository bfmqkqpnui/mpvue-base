import Vue from 'vue'
import App from './App'
import MpvueRouterPatch from 'mpvue-router-patch'
import config from '@/constant/config'

Vue.use(MpvueRouterPatch)
Vue.config.productionTip = false
App.mpType = 'app'
Vue.$APP_ID = Vue.prototype.$APP_ID = config.$APP_ID

const app = new Vue(App)
app.$mount()
