/**
 * Archivo de configuración principal del proyecto.
 * Definición de principales paquetes para el front-end:
 * vue, vuetify, router, store, moment, etc.
 */

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import moment from 'moment' // manejo de fechas
import vuetify from './plugins/vuetify' // front-end material design
import 'leaflet/dist/leaflet.css' // correcta visualización de mapas

Vue.config.productionTip = process.env.NODE_ENV === 'production';

// Definición de filtros personalizados.

/**
 * Convierte fechas a un formato amigable
 * @param {Object} value - Objeto tipo Date
 * @returns Fecha como texto en formato dia/mes/año
 * @example
 * <div>Hoy es {{ value | date }}</div>
 */
Vue.filter('date', (value) => {
  if(!value)
    return '';
  return moment(value).format('DD/MM/YYYY');
});

/**
 * Trunca o recorta el texto
 * @param {string} value - Texto original
 * @param {number} lenght - Longitud máxima
 * @param {string} clamp - Texto a concatenar después de truncar ('...' por default)
 */
Vue.filter('truncate', (value, length, clamp) => {
    return value.slice(0, length) + (length < value.length ? clamp || '...' : '')
});

// Inicialización de app Vue
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
