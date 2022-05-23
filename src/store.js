import Vue from 'vue'
import Vuex from 'vuex'
import * as auth from './services/AuthService'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    // apiUrl: 'http://localhost:3000/api',
    // apiUrl: `${window.location.protocol}//${window.location.hostname}:3000/api`,
    apiUrl: `${window.location.protocol}//${window.location.hostname}:8081/api`,
    username: null,
    userId: null,
    operation: {
      create: true,
      read: true,
      update: true,
      delete: false,
      _id: false
    },
    admin: false,
    active: true
    // TODO-DONE @EmmanuelCruz Incluir campos operation, admin, active (@ref user-model en db)
  },
  mutations: {
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
