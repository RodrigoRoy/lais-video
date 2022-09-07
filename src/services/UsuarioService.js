/**
 * Servicio para hacer llamadas al API acerca de registros de usuarios
 */

 import {http} from './HttpService'

 /**
  * Obtiene la lista de todos los registros de usuarios
  * @returns objeto con la lista de todos los registros de usuarios
  */
 export function getAllUsers(){
   return http().get('/user');
 }

 /**
 * Obtiene la información de un registro de usuario específico
 * @param {string} id - Id del registro de usuario
 * @returns objeto con todas las propiedades del usuario especificado
 */
export function getUsuarioById(id){
  return http().get(`/user/${id}`);
}

/**
 * Actualiza un registro de usuario
 * Sobreescribe el anterior registro de usuario con el nuevo dado como parámetro
 * @param {Object} usuario - Objecto con nuevas y/o actualizadas propiedades del registro de usuario
 * @returns objeto con mensaje de éxito o error al actualizar el registro de usuario
 */
 export function updateUsuario(usuario){
  return http().put('/user', usuario);
}

/**
  * Obtiene la lista de las colecciones, grupos y videos de un usuario
  * @param {string} id - Id del registro de usuario
  * @returns objeto con la lista de las colecciones, grupos y videos de un usuario 
  */
 export function getAllItems(id){
  return http().get(`/user/relatedData/${id}`);
}