/**
 * Servicio para hacer llamadas HTTP
 * Encapsula las llamadas para usar la sintaxis de axios (más simple y conveniente)
 */

import store from '../store' // "variables globales"
import axios from 'axios' // biblioteca para llamadas HTTP
import * as auth from './AuthService' // servicio para autentificación

export function http(){
  return axios.create({
    baseURL: store.state.apiUrl, // prefijo de todas las llamadas HTTP al API
    headers: {
      Authorization: auth.getToken() // encabezado con (json web) token
    }
  });
}
