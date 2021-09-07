import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import moment from 'moment' // manejo de fechas
import vuetify from './plugins/vuetify' // front-end material design
import 'leaflet/dist/leaflet.css' // correcta visualización de mapas

Vue.config.productionTip = process.env.NODE_ENV === 'production';

Vue.filter('date', (value) => {
  if(!value)
    return '';
  return moment(value).format('DD/MM/YYYY');
});

Vue.filter('truncate', (value, length, clamp) => {
    return value.slice(0, length) + (length < value.length ? clamp || '...' : '')
});

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
