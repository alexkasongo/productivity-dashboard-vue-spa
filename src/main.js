import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
 
// import { library } from '@fortawesome/fontawesome-svg-core'
// import { faCoffee } from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// import { faJs, faVuejs } from '@fortawesome/free-brands-svg-icons'


/**FONT AWESOME*/
// library.add(faCoffee, faJs, faVuejs)
// Vue.component('font-awesome-icon', FontAwesomeIcon)
//




 
var VueTruncate = require('vue-truncate-filter')
// import VueTruncate from "@vue-truncate-filter"
Vue.use(VueTruncate)

import VueNotification from "@kugatsu/vuenotification";
Vue.use(VueNotification, {
  timer: 20,
});

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
