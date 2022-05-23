/**
 * Servicio para hacer llamadas al API acerca de las colecciones documentales
 */

import {http} from './HttpService'

/**
 * Obtiene todas las colecciones documentales
 * @returns objecto que enlista todas las colecciones documentales
 */
export function getAllColections(){
  return http().get('/coleccion');
}

/**
 * Obtiene la información de una colección documental específica
 * @param {string} id - Id de la colección documental
 * @returns objeto con todas las propiedades de la colección documental específica
 */
export function getColectionById(id){
  return http().get(`/coleccion/${id}`);
}

/**
 * Crea o guarda una nueva colección documental
 * @param {Object} coleccion - Objeto con propiedades que definen a una colección documental
 * @returns objeto con mensaje de éxito o error al almacenar la colección documental
 */
export function createColection(coleccion){
  return http().post('/coleccion', coleccion);
}

/**
 * Elimina o borra una colección documental espefícica
 * @param {string} id - Id de la colección documental
 * @returns objeto con mensaje de éxito o error al borrar la colección documental
 */
export function deleteColection(id){
  return http().delete(`/coleccion/${id}`);
}

/**
 * Actualiza una colección documental
 * Sobreescribe la anterior colección documental con la nueva dada como parámetro
 * @param {Object} coleccion - Objecto con nuevas y/o actualizadas propiedades de la colección documental
 * @returns objeto con mensaje de éxito o error al actualizar la colección documental
 */
export function updateColection(coleccion){
  return http().put('/coleccion', coleccion);
}
