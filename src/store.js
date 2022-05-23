/**
 * Componente para definición de "variables globales", a.k.a. state management
 * El uso principal para el manejo de estados es obtener la información mínima
 * necesaria del usuario, especialmente los permisos
 */

import Vue from 'vue'
import Vuex from 'vuex' // Biblioteca para manejo de estados
import * as auth from './services/AuthService' // servicio de autentificación

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: false, // sesión iniciada?
    apiUrl: `${window.location.protocol}//${window.location.hostname}:8081/api`, // URL base del API, usualmente http://localhost:8081/api
    username: null, // nombre de usuario
    userId: null, // id de usuario
    operation: {      // permisos del usuario
      create: true,   // crear registros
      read: true,     // ver registros (default: true)
      update: true,   // actualizar registros
      delete: false,  // borrar registros
    },
    admin: false, // es administrador/a?
    active: true // es usuario activo?
  },
  mutations: {
    /**
     * Comprueba y asigna los estados principales del usuario.
     * Usualmente una única llamada al método actualiza los estados necesarios
     * @param {Object} state - estado que define "variables globales"
     */
    authenticate(state){
      state.isLoggedIn = auth.isLoggedIn();
      if(state.isLoggedIn){
        state.username = auth.getUsername();
        state.userId = auth.getUserId();
        state.operation = auth.getOperation();
        state.admin = auth.getAdmin();
        state.active = auth.getActive();
      }
      else{
        state.username = null;
        state.userId = null;
        state.operation = null;
        state.admin = null;
        state.active = null;
      }
    }
  },
  actions: {
    authenticate(context){
      context.commit('authenticate');
    }
  }
})
