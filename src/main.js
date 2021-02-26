import Vue from 'vue'
import App from './App.vue'
import router from './router/router.js'
import VueRouter from "vue-router"
import axios from "./axios/axios.js"

Vue.config.productionTip = false

Vue.use(VueRouter)

Vue.prototype.axios = axios

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
