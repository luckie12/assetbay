import Vue from 'vue'
//import ElementUI from 'element-ui'
//import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
import store from './store/store'

import VueCompositionApi from '@vue/composition-api'
import { firestorePlugin } from 'vuefire'

Vue.use(VueCompositionApi)
Vue.use(firestorePlugin)

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import VueToast from 'vue-toast-notification'

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.use(VueToast)

//Vue.use(ElementUI)

Vue.config.productionTip = false

Vue.prototype.$price = 'Global Scope!';

var filter = function(text, length, clamp){
  clamp = clamp || '...';
  var node = document.createElement('div');
  node.innerHTML = text;
  var content = node.textContent;
  return content.length > length ? content.slice(0, length) + clamp : content;
};

Vue.filter('truncate', filter);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')