import Vue from 'vue'
import App from './App'
import Common from './common/Common.js'
Vue.config.productionTip = false
App.mpType = 'app'

Vue.prototype.Common = Common.Common;

const app = new Vue({
	...App
})
app.$mount()
