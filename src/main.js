import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import moment from 'moment'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = process.env.NODE_ENV === 'production';

Vue.filter('date', (value) => {
  if(!value)
    return '';
  return moment(value).format('DD/MM/YYYY');
});

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
