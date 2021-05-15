import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
import ECharts from 'vue-echarts'
import VueFirestore from 'vue-firestore'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(ECharts)

// initialize vue firestore
Vue.use(VueFirestore)

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
