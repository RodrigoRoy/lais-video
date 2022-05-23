/**
 * Servicio para autentificación de usuarios
 * Con base en el uso de un (json web) token asignado (o no) al localStorage
 * del navegador, se determinan las funciones princia
 */

import store from '../store' // "variables globales"
import {http} from './HttpService' // servicio para llamadas HTTP
import jwt from 'jsonwebtoken' // biblioteca para uso de (json web) token

/**
 * Verificación si el usuario está logeado
 * @returns true si hay token válido en local storage del navegador, false en otro caso
 */
export function isLoggedIn(){
  const token = localStorage.getItem('token');
  return token != null;
}

/**
 * Iniciar sesión con las credenciales del usuario
 * @param {Object} user - objeto con el nombre de usuario y contraseña del usuario
 * @returns asigna token válido (obtenido en llamada del API) a local storage del navegador
 */
export function login(user){
  return http().post('/auth', user)
  .then(res => {
    if(res){
      setToken(res.data.token);
    }
  });
}

/**
 * Cierra sesión del usuario
 * Es decir, elimina token del local storage del navegador
 */
export function logout(){
  localStorage.clear();
  store.dispatch('authenticate');
}

/**
 * Auxiliar que asigna un token al local storage del navegador
 * @param {string} token - (json web) token codificado con datos del usuario
 */
function setToken(token){
  localStorage.setItem('token', token);
  store.dispatch('authenticate');
}

/**
 * Lee el token almacenado en local storage del navegador
 * @returns cadena de texto con el token almacenado
 */
export function getToken(){
  return localStorage.getItem('token');
}

/**
 * Obtiene el nombre de usuario al decodificar información del token almacenado en local storage
 * @returns cadena de texto con el nombre de usuario
 */
export function getUsername(){
  const token = decodeToken();
  if(!token){
    return null;
  }
  return token.user.username;
}

/**
 * Obtiene el id de usuario al decodificar información del token almacenado en local storage
 * @returns cadena de texto con el id de usuario
 */
export function getUserId(){
  const token = decodeToken();
  if(!token){
    return null;
  }
  return token.user.id;
}

/**
 * Obtiene el objeto que define los permisos de operación de usuario 
 * al decodificar información del token almacenado en local storage
 * @returns objeto con propiedades booleana que definen los permisos de operación:
 * {create, read, update, delete}
 */
export function getOperation(){
  const token = decodeToken();
  if(!token){
    return null;
  }
  return token.user.operation;
}

/**
 * Determina si un usuario tiene permisos de administración 
 * al decodificar información del token almacenado en local storage
 * @returns true si el usario tiene permisos de administración, false en otro caso
 */
export function getAdmin(){
  const token = decodeToken();
  if(!token){
    return null;
  }
  return token.user.admin;
}

/**
 * Determina si un usuario está activo
 * al decodificar información del token almacenado en local storage
 * @returns true si el usario está activo, false en otro caso
 */
export function getActive(){
  const token = decodeToken();
  if(!token){
    return null;
  }
  return token.user.active;
}

/**
 * Registra a un nuevo usuario con la información dada
 * @param {object} user - objeto con la información necesaria para registrar usuario: 
 * {username, password, fullname, email, ...}
 * @returns envia información a la base de datos mediante llamada al API
 */
export function registerUser(user){
  return http().post('/register', user);
}

/**
 * Auxiliar que decodifica la cadena de texto del (json web) token
 * para representar la información como un objeto
 * @returns objeto con la información del usuario decodificada
 */
function decodeToken(){
  const token = getToken();
  if(!token){
    return null;
  }
  return jwt.decode(token);
}
