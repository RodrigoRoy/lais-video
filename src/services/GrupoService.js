/**
 * Servicio para hacer llamadas al API acerca de los grupos documentales
 */

import {http} from './HttpService'

/**
 * Obtener todos los grupos documentales
 * @returns objecto que enlista todos los grupos documentales
 */
export function getAllGroups(){
  return http().get('/grupo');
}

/**
 * Obtiene la información de un grupo documental específico
 * @param {string} id - Id del grupo documental
 * @returns objeto con todas las propiedades del grupo documental específico
 */
export function getGroupById(id){
  return http().get(`/grupo/${id}`);
}

/**
 * Crea o guarda un nuevo grupo documental
 * @param {Object} grupo - Objeto con propiedades que definen a un grupo documental
 * @returns objeto con mensaje de éxito o error al almacenar el grupo documental
 */
export function createGroup(grupo){
  return http().post('/grupo', grupo);
}

/**
 * Elimina o borra un grupo documental específico
 * @param {string} id - Id del grupo documental
 * @returns objeto con mensaje de éxito o error al borrar el grupo documental
 */
export function deleteGroup(id){
  return http().delete(`/grupo/${id}`);
}

/**
 * Actualiza un grupo documental
 * Sobreescribe el anterior grupo documental con el nuevo dado como parámetro
 * @param {Object} grupo - Objecto con nuevas y/o actualizadas propiedades del grupo documental
 * @returns objeto con mensaje de éxito o error al actualizar el grupo documental
 */
export function updateGroup(grupo){
  return http().put('/grupo', grupo);
}
